/* ================================================================
   DUFAN TICKET GENERATOR — script.js
   Logic: generate, validate, store, and manage e-tickets.

   BUSINESS RULES:
   • Setiap tiket berlaku 1 hari penuh sesuai tanggal kunjungan
   • Setiap tiket hanya bisa digunakan 1x untuk 1 wahana
   • Tiket Fast Track mendapat prioritas antrian di scanner
   • Data disimpan ke Firebase Realtime Database (multi-device)
================================================================ */

import { fbSet, fbGet } from './firebase.js';

'use strict';

/* ────────────────────────────────────────────────────────────
   STORAGE KEYS
──────────────────────────────────────────────────────────── */
const STORAGE_KEY_TICKETS = 'dufan_tickets_store';

/* ────────────────────────────────────────────────────────────
   STATE
──────────────────────────────────────────────────────────── */
let tickets      = [];   // master list of all generated tickets
let batchNumber  = 1;    // current batch counter
let previewTicket = null; // ticket currently shown in preview

/* ────────────────────────────────────────────────────────────
   RANDOM DATA POOLS (for batch generate)
──────────────────────────────────────────────────────────── */
const NAMES_POOL = [
  'Budi Santoso','Siti Rahayu','Ahmad Fauzi','Dewi Lestari','Rizky Pratama',
  'Nurul Hidayah','Agus Setiawan','Fitri Handayani','Doni Kurniawan','Rina Wahyuni',
  'Hendra Gunawan','Yuni Astuti','Fajar Ramadhan','Maya Kusuma','Andre Wijaya',
  'Putri Anggraini','Wahyu Saputra','Laila Fitriani','Bagas Purnomo','Nadia Safitri',
  'Kevin Hartanto','Ayu Permatasari','Reza Firmansyah','Indah Suryani','Gilang Pratama',
  'Citra Ramadhani','Eko Susanto','Dina Oktaviani','Feri Irawan','Sari Dewi',
  'Hanna Putri','Renaldo K.','Sheila Aulia','Dimas Prayoga','Tiara Wulandari',
  'Arif Hidayat','Bella Safira','Chandra Lim','Devi Oktarina','Edi Prasetya',
];

const DOMAINS = ['gmail.com','yahoo.co.id','outlook.com','hotmail.com','icloud.com'];

const PHONE_PREFIXES = [
  '811','812','813','821','822','823','851','852','853',
  '855','856','857','858','859','877','878','881','882',
];

/* ────────────────────────────────────────────────────────────
   TICKET ID GENERATOR
   Format: [FT/RG]-YYMMDD-XXXXXX
──────────────────────────────────────────────────────────── */
function generateTicketId(isFastTrack, date) {
  const prefix = isFastTrack ? 'FT' : 'RG';
  const d      = (date || new Date().toISOString().slice(0, 10))
                    .replace(/-/g, '')
                    .slice(2); // YYMMDD
  const rand   = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${d}-${rand}`;
}

/* ────────────────────────────────────────────────────────────
   TICKET FACTORY
──────────────────────────────────────────────────────────── */
function createTicket(opts = {}) {
  const today       = new Date().toISOString().slice(0, 10);
  const isFastTrack = opts.fastTrack === true || opts.fastTrack === 'true';
  const date        = opts.date || today;

  return {
    /* identity */
    id:         generateTicketId(isFastTrack, date),
    name:       opts.name    || NAMES_POOL[Math.floor(Math.random() * NAMES_POOL.length)],
    phone:      opts.phone   || randomPhone(),
    email:      opts.email   || randomEmail(opts.name),

    /* visit */
    date,
    fastTrack:  isFastTrack,

    /* lifecycle */
    status:     'VALID',       // VALID | USED | EXPIRED
    usedAt:     null,          // ISO timestamp when scanned
    usedWahana: null,          // wahana ID where used
    batchNo:    opts.batchNo   || batchNumber,
    createdAt:  new Date().toISOString(),
  };
}

/* ────────────────────────────────────────────────────────────
   RANDOM HELPERS
──────────────────────────────────────────────────────────── */
function randomPhone() {
  const prefix = PHONE_PREFIXES[Math.floor(Math.random() * PHONE_PREFIXES.length)];
  const mid    = String(Math.floor(Math.random() * 9000) + 1000);
  const end    = String(Math.floor(Math.random() * 9000) + 1000);
  return `0${prefix}-${mid}-${end}`;
}

function randomEmail(name) {
  const base   = (name || 'visitor')
                    .toLowerCase()
                    .replace(/[^a-z]/g, '')
                    .slice(0, 10);
  const num    = Math.floor(Math.random() * 999);
  const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
  return `${base}${num}@${domain}`;
}

/* ────────────────────────────────────────────────────────────
   PHONE INPUT FORMATTER
──────────────────────────────────────────────────────────── */
function formatPhone(input) {
  let v = input.value.replace(/[^\d]/g, '').slice(0, 12);
  // Format: 8xx-xxxx-xxxx
  if (v.length > 3 && v.length <= 7) {
    v = v.slice(0, 3) + '-' + v.slice(3);
  } else if (v.length > 7) {
    v = v.slice(0, 3) + '-' + v.slice(3, 7) + '-' + v.slice(7);
  }
  input.value = v;
}

/* ────────────────────────────────────────────────────────────
   FAST TRACK TOGGLE
──────────────────────────────────────────────────────────── */
function setFastTrack(value) {
  document.getElementById('inp-fasttrack').value = String(value);

  const cardReg = document.getElementById('type-regular');
  const cardFT  = document.getElementById('type-fasttrack');

  if (value) {
    cardReg.classList.remove('active');
    cardFT.classList.add('active-amber');
    cardFT.classList.remove('active');
  } else {
    cardFT.classList.remove('active-amber');
    cardReg.classList.add('active');
  }

  // Live-update preview if one exists
  if (previewTicket) rerollPreview();
}

/* ────────────────────────────────────────────────────────────
   FORM VALIDATION
──────────────────────────────────────────────────────────── */
function validateForm() {
  let valid = true;

  const name  = document.getElementById('inp-name').value.trim();
  const phone = document.getElementById('inp-phone').value.trim();
  const email = document.getElementById('inp-email').value.trim();

  // Name
  setFieldError('err-name', 'inp-name',
    !name ? 'Nama tidak boleh kosong' : '');
  if (!name) valid = false;

  // Phone — minimal 9 digit setelah strip strip
  const digits = phone.replace(/[^\d]/g, '');
  setFieldError('err-phone', 'inp-phone',
    !phone ? 'No. HP tidak boleh kosong'
    : digits.length < 9 ? 'No. HP minimal 9 digit' : '');
  if (!phone || digits.length < 9) valid = false;

  // Email
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  setFieldError('err-email', 'inp-email',
    !email ? 'Email tidak boleh kosong'
    : !emailRe.test(email) ? 'Format email tidak valid' : '');
  if (!email || !emailRe.test(email)) valid = false;

  return valid;
}

function setFieldError(errId, inputId, msg) {
  const errEl   = document.getElementById(errId);
  const inputEl = document.getElementById(inputId);
  if (msg) {
    errEl.textContent = msg;
    errEl.classList.add('show');
    inputEl.classList.add('error');
  } else {
    errEl.textContent = '';
    errEl.classList.remove('show');
    inputEl.classList.remove('error');
  }
}

/* ────────────────────────────────────────────────────────────
   GENERATE SINGLE
──────────────────────────────────────────────────────────── */
function generateSingle() {
  if (!validateForm()) {
    showToast('error', '⚠️', 'Lengkapi form terlebih dahulu!');
    return;
  }

  const t = createTicket({
    name:      document.getElementById('inp-name').value.trim(),
    phone:     '+62 ' + document.getElementById('inp-phone').value.trim(),
    email:     document.getElementById('inp-email').value.trim(),
    date:      document.getElementById('inp-date').value,
    fastTrack: document.getElementById('inp-fasttrack').value === 'true',
  });

  tickets.push(t);
  updatePreview(t);
  renderTable();
  updateStats();
  showToast('success', '🎟️', `Tiket ${t.id} berhasil digenerate!`);
}

/* ────────────────────────────────────────────────────────────
   BATCH GENERATE (random data)
──────────────────────────────────────────────────────────── */
function generateBatch() {
  const n       = parseInt(document.getElementById('inp-batch').value) || 1;
  const date    = document.getElementById('inp-date').value || new Date().toISOString().slice(0, 10);

  batchNumber++;

  for (let i = 0; i < n; i++) {
    const isFT = Math.random() < 0.25;
    const name = NAMES_POOL[Math.floor(Math.random() * NAMES_POOL.length)];
    tickets.push(createTicket({
      name,
      phone:     '+62 ' + randomPhone().slice(1),
      email:     randomEmail(name),
      date,
      fastTrack: isFT,
      batchNo:   batchNumber,
    }));
  }

  const last = tickets[tickets.length - 1];
  updatePreview(last);
  renderTable();
  updateStats();
  showToast('success', '⚡', `${n} tiket digenerate — Batch #${batchNumber}`);
}

/* ────────────────────────────────────────────────────────────
   PREVIEW
──────────────────────────────────────────────────────────── */
function rerollPreview() {
  // Build a preview ticket from current form values (no validation required)
  const today = new Date().toISOString().slice(0, 10);
  const isFT  = document.getElementById('inp-fasttrack').value === 'true';
  const name  = document.getElementById('inp-name').value.trim()
                || NAMES_POOL[Math.floor(Math.random() * NAMES_POOL.length)];

  const t = createTicket({
    name,
    phone:     '+62 ' + (document.getElementById('inp-phone').value.trim() || randomPhone().slice(1)),
    email:     document.getElementById('inp-email').value.trim() || randomEmail(name),
    date:      document.getElementById('inp-date').value || today,
    fastTrack: isFT,
  });
  updatePreview(t);
  showToast('success', '🔄', 'Preview diperbarui!');
}

function updatePreview(t) {
  previewTicket = t;
  document.getElementById('ticket-preview').innerHTML = renderTicketHTML(t);
  document.getElementById('preview-id').value = t.id;

  // Show chips
  const chips = document.getElementById('ticket-chips');
  chips.style.display = 'flex';
  document.getElementById('chip-fasttrack').textContent = t.fastTrack ? '⚡ FAST TRACK' : '🎟️ REGULAR';
  document.getElementById('chip-fasttrack').className   = 'chip ' + (t.fastTrack ? 'chip-amber' : '');
}

/* ────────────────────────────────────────────────────────────
   TICKET HTML RENDERER
──────────────────────────────────────────────────────────── */
function renderTicketHTML(t) {
  const ftClass    = t.fastTrack ? ' fast-track' : '';
  const badgeCls   = t.fastTrack ? 'badge-fasttrack' : 'badge-regular';
  const badgeTxt   = t.fastTrack ? '⚡ FAST TRACK' : '🎟️ REGULAR';
  const hlClass    = t.fastTrack ? 'hl-amber' : 'hl';
  const dateFormatted = formatDate(t.date);

  return `
    ${t.fastTrack ? '<div class="ft-ribbon">FAST TRACK</div>' : ''}

    <div class="ticket-header">
      <div class="ticket-logo">
        <div class="ticket-logo-icon">🎢</div>
        <div>
          <div class="ticket-brand">DUFAN</div>
          <div class="ticket-brand-sub">ANCOL · JAKARTA</div>
        </div>
      </div>
      <span class="tkt-type-badge ${badgeCls}">${badgeTxt}</span>
    </div>

    <div class="ticket-visitor">
      <div class="ticket-visitor-name">${escHtml(t.name)}</div>
      <div class="ticket-visitor-contact">
        ${escHtml(t.phone)} &nbsp;·&nbsp; ${escHtml(t.email)}
      </div>
    </div>

    <div class="ticket-body">
      <div>
        <div class="ticket-field-label">Tanggal</div>
        <div class="ticket-field-value">${dateFormatted}</div>
      </div>
      <div>
        <div class="ticket-field-label">Berlaku</div>
        <div class="ticket-field-value ${hlClass}">1 HARI PENUH</div>
      </div>
      <div>
        <div class="ticket-field-label">Batch</div>
        <div class="ticket-field-value">#${t.batchNo}</div>
      </div>
      <div>
        <div class="ticket-field-label">Status</div>
        <div class="ticket-field-value">
          <span class="ticket-valid-badge">
            <span class="ticket-valid-dot"></span> ${t.status}
          </span>
        </div>
      </div>
    </div>

    <div class="ticket-rules-row">
      <span class="rule-badge rb-green">📅 1 HARI</span>
      <span class="rule-badge rb-blue">🎢 1 WAHANA</span>
      ${t.fastTrack ? '<span class="rule-badge rb-amber">⚡ PRIORITAS</span>' : ''}
    </div>

    <div class="ticket-divider"></div>

    <div class="ticket-barcode-section">
      <div class="barcode-wrap">
        ${buildBarcodeSVG(t.id)}
        <div class="ticket-id-text">${t.id}</div>
      </div>
      <div class="ticket-qr">${buildQRPatternSVG(t.id)}</div>
    </div>

    <div class="ticket-footer">
      <div class="ticket-footer-l">DUFAN ANCOL · TIKET ELEKTRONIK</div>
      <div class="ticket-footer-r">© 2025 VALID</div>
    </div>
  `;
}

/* ────────────────────────────────────────────────────────────
   BARCODE SVG BUILDER
──────────────────────────────────────────────────────────── */
function buildBarcodeSVG(id) {
  const seed = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const W = 200, H = 44;
  let bars = '';
  let x = 0, idx = 0;
  const heights = [38, 44, 32, 40, 28, 44, 36, 32, 40, 44, 36, 32, 40, 36, 44];

  while (x < W) {
    const thick = ((seed * (idx + 1) * 13) % 3) + 1;
    const gap   = ((seed * (idx + 3) * 7)  % 3) + 1;
    const h     = heights[idx % heights.length];
    const col   = idx % 4 === 0
      ? 'rgba(56,189,248,0.95)'
      : 'rgba(56,189,248,0.45)';
    bars += `<rect x="${x}" y="${(H - h) / 2}" width="${thick}" height="${h}" fill="${col}"/>`;
    x += thick + gap;
    idx++;
  }

  return `<svg class="barcode-svg" viewBox="0 0 ${W} ${H}"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg">${bars}</svg>`;
}

/* ────────────────────────────────────────────────────────────
   QR CODE PATTERN SVG (visual only)
──────────────────────────────────────────────────────────── */
function buildQRPatternSVG(id) {
  const seed = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const S = 7;   // cell size px
  const N = 9;   // grid size
  let cells = '';

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const fill = ((seed * (r * N + c + 1) * 31) % 3 === 0) ? '#000' : '#fff';
      cells += `<rect x="${c * S + 1}" y="${r * S + 1}" width="${S - 1}" height="${S - 1}" fill="${fill}"/>`;
    }
  }

  // Corner finder patterns (3 corners)
  const marker = (ox, oy) =>
    `<rect x="${ox}" y="${oy}" width="${3 * S}" height="${3 * S}" fill="#000"/>` +
    `<rect x="${ox + S}" y="${oy + S}" width="${S}" height="${S}" fill="#fff"/>`;

  cells += marker(1, 1) + marker(N * S - 3 * S + 1, 1) + marker(1, N * S - 3 * S + 1);

  const dim = N * S + 2;
  return `<svg width="${dim}" height="${dim}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${dim}" height="${dim}" fill="#fff" rx="2"/>
    ${cells}
  </svg>`;
}

/* ────────────────────────────────────────────────────────────
   TABLE RENDER
──────────────────────────────────────────────────────────── */
function renderTable() {
  const tbody  = document.getElementById('ticket-tbody');
  const query  = (document.getElementById('table-search')?.value || '').toLowerCase();

  const filtered = tickets.filter(t => {
    if (!query) return true;
    return (
      t.id.toLowerCase().includes(query) ||
      t.name.toLowerCase().includes(query) ||
      t.email.toLowerCase().includes(query) ||
      t.phone.toLowerCase().includes(query)
    );
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="table-empty">
      ${query ? '— Tidak ada hasil untuk pencarian ini —' : '— Belum ada tiket digenerate —'}
    </td></tr>`;
    return;
  }

  tbody.innerHTML = '';

  // Show newest first
  [...filtered].reverse().forEach((t) => {
    const origIdx = tickets.indexOf(t);
    const ftStyle   = t.fastTrack
      ? 'background:rgba(251,191,36,0.12);color:#fbbf24;border:1px solid rgba(251,191,36,0.35)'
      : 'background:rgba(56,189,248,0.1);color:#38bdf8;border:1px solid rgba(56,189,248,0.3)';
    const statusStyle = t.status === 'VALID'
      ? 'background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.3)'
      : t.status === 'USED'
        ? 'background:rgba(251,191,36,0.1);color:#fbbf24;border:1px solid rgba(251,191,36,0.3)'
        : 'background:rgba(239,68,68,0.1);color:#ef4444;border:1px solid rgba(239,68,68,0.3)';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="color:var(--muted);font-family:var(--mono)">${tickets.length - origIdx}</td>
      <td class="td-mono" title="Klik untuk copy" onclick="copyId('${t.id}')">${t.id}</td>
      <td class="td-name">${escHtml(t.name)}</td>
      <td style="font-family:var(--mono);font-size:11px">${escHtml(t.phone)}</td>
      <td class="td-email">${escHtml(t.email)}</td>
      <td><span class="tbl-badge" style="${ftStyle}">${t.fastTrack ? '⚡ FAST TRACK' : '🎟️ REGULAR'}</span></td>
      <td style="font-family:var(--mono)">${t.date}</td>
      <td><span class="tbl-badge" style="${statusStyle}">${t.status}</span></td>
      <td>
        <button class="tbl-action-btn view" onclick="previewRow(${origIdx})">👁</button>
        <button class="tbl-action-btn del"  onclick="deleteRow(${origIdx})">✕</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function previewRow(i) {
  updatePreview(tickets[i]);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteRow(i) {
  const removed = tickets.splice(i, 1)[0];
  renderTable();
  updateStats();
  showToast('error', '🗑️', `Tiket ${removed.id} dihapus`);
}

/* ────────────────────────────────────────────────────────────
   STATS UPDATE
──────────────────────────────────────────────────────────── */
function updateStats() {
  const valid     = tickets.filter(t => t.status === 'VALID').length;
  const fastTrack = tickets.filter(t => t.fastTrack).length;

  document.getElementById('s-total').textContent     = tickets.length;
  document.getElementById('s-valid').textContent     = valid;
  document.getElementById('s-fasttrack').textContent = fastTrack;
  document.getElementById('s-batch').textContent     = batchNumber;
  document.getElementById('topbar-count').textContent = tickets.length + ' TIKET';
}

/* ────────────────────────────────────────────────────────────
   CLIPBOARD
──────────────────────────────────────────────────────────── */
function copyId(id) {
  navigator.clipboard.writeText(id)
    .then(() => showToast('success', '📋', `ID ${id} disalin!`))
    .catch(() => showToast('error', '⚠️', 'Gagal menyalin ke clipboard'));
}

function copyTicketId() {
  const val = document.getElementById('preview-id').value;
  if (val === '—') return;
  copyId(val);
}

/* ────────────────────────────────────────────────────────────
   EXPORT CSV
──────────────────────────────────────────────────────────── */
function exportCSV() {
  if (tickets.length === 0) {
    showToast('error', '⚠️', 'Belum ada tiket untuk diekspor!');
    return;
  }

  const header = ['No','TicketID','Nama','NoHP','Email','FastTrack','Tanggal','Status','Batch'];
  const rows   = tickets.map((t, i) => [
    i + 1,
    t.id,
    `"${t.name}"`,
    `"${t.phone}"`,
    `"${t.email}"`,
    t.fastTrack ? 'Ya' : 'Tidak',
    t.date,
    t.status,
    t.batchNo,
  ].join(','));

  const csv  = [header.join(','), ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href     = URL.createObjectURL(blob);
  link.download = `dufan_tickets_${Date.now()}.csv`;
  link.click();

  showToast('success', '📥', `${tickets.length} tiket diekspor ke CSV!`);
}

/* ────────────────────────────────────────────────────────────
   SAVE TO FIREBASE (untuk scanner petugas di device lain)
──────────────────────────────────────────────────────────── */
async function saveToStorage() {
  if (tickets.length === 0) {
    showToast('error', '⚠️', 'Belum ada tiket untuk disimpan!');
    return;
  }

  try {
    showToast('success', '⏳', 'Menyimpan ke Firebase...');

    // Simpan sebagai object { ticketId: ticketObject } agar Firebase-friendly
    const payload = {};
    tickets.forEach(t => { payload[t.id] = t; });

    await fbSet('tickets', payload);
    showToast('success', '🔥', `${tickets.length} tiket tersimpan di Firebase! Petugas bisa langsung scan.`);
  } catch (e) {
    showToast('error', '⚠️', 'Gagal menyimpan ke Firebase: ' + e.message);
    console.error(e);
  }
}

/* ────────────────────────────────────────────────────────────
   LOAD FROM FIREBASE (sinkronisasi dari cloud)
──────────────────────────────────────────────────────────── */
async function loadFromStorage() {
  try {
    const data = await fbGet('tickets');
    if (data && typeof data === 'object') {
      const saved = Object.values(data);
      if (saved.length > 0) {
        tickets     = saved;
        batchNumber = Math.max(...tickets.map(t => t.batchNo || 1));
        renderTable();
        updateStats();
        updatePreview(tickets[tickets.length - 1]);
        showToast('success', '🔥', `${tickets.length} tiket dimuat dari Firebase`);
      }
    }
  } catch (e) {
    // Belum ada data atau offline — silent
    console.warn('loadFromStorage:', e.message);
  }
}

/* ────────────────────────────────────────────────────────────
   PRINT
──────────────────────────────────────────────────────────── */
function printTicket() {
  if (!previewTicket) {
    showToast('error', '⚠️', 'Generate atau pilih tiket terlebih dahulu!');
    return;
  }
  window.print();
}

/* ────────────────────────────────────────────────────────────
   CLEAR ALL
──────────────────────────────────────────────────────────── */
function clearAll() {
  if (tickets.length === 0) return;
  if (!confirm(`Hapus semua ${tickets.length} tiket? Tindakan ini tidak bisa dibatalkan.`)) return;

  tickets       = [];
  batchNumber   = 1;
  previewTicket = null;

  const prev = document.getElementById('ticket-preview');
  prev.innerHTML = `<div class="ticket-empty-state">
    <div class="ticket-empty-icon">🎟️</div>
    <div>Isi form & generate tiket<br>untuk melihat preview</div>
  </div>`;

  document.getElementById('preview-id').value    = '—';
  document.getElementById('ticket-chips').style.display = 'none';

  renderTable();
  updateStats();
  showToast('error', '🗑️', 'Semua tiket dihapus');
}

/* ────────────────────────────────────────────────────────────
   TOAST
──────────────────────────────────────────────────────────── */
let toastTimer;
function showToast(type, icon, msg) {
  const el  = document.getElementById('toast');
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-msg').textContent  = msg;
  el.className = `toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3400);
}

/* ────────────────────────────────────────────────────────────
   UTILITY HELPERS
──────────────────────────────────────────────────────────── */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

/* ────────────────────────────────────────────────────────────
   INIT
──────────────────────────────────────────────────────────── */
(async function init() {
  // Set default date to today
  document.getElementById('inp-date').value = new Date().toISOString().slice(0, 10);

  // Set regular as default selected type
  document.getElementById('type-regular').classList.add('active');

  // Load any previously saved tickets
  await loadFromStorage();

  // Show empty preview if nothing loaded
  if (!previewTicket) {
    const demoTicket = createTicket({ fastTrack: false });
    updatePreview(demoTicket);
  }

  updateStats();
})();