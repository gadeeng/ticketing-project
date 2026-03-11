
/* ============================================================
   DATA
============================================================ */
const WAHANA = [
  {id:'halilintar',       name:'Halilintar',           zone:'Fantasi',   cap:24,  open:'10.00', close:'18.45', durasi:1.5,  fastTrack:true },
  {id:'tornado',          name:'Tornado',              zone:'Fantasi',   cap:40,  open:'10.00', close:'18.45', durasi:3,    fastTrack:true },
  {id:'niagara',          name:'Niagara-Gara',         zone:'Fantasi',   cap:4,   open:'10.00', close:'20.00', durasi:4.5,  fastTrack:true },
  {id:'arung-jeram',      name:'Arung Jeram',          zone:'Pacific',   cap:8,   open:'10.00', close:'18.45', durasi:2,    fastTrack:true },
  {id:'bom-bom-boat',     name:'Gajah Beledug',        zone:'Pacific',   cap:48,  open:'10.00', close:'18.45', durasi:4,    fastTrack:false},
  {id:'kora-kora',        name:'Kora-Kora',            zone:'Pacific',   cap:36,  open:'10.00', close:'18.45', durasi:3,    fastTrack:true },
  {id:'hysteria',         name:'Hysteria',             zone:'Tengah',    cap:12,  open:'10.00', close:'18.45', durasi:1,    fastTrack:true },
  {id:'ontang-anting',    name:'Ontang-Anting',        zone:'Tengah',    cap:56,  open:'10.00', close:'18.45', durasi:2,    fastTrack:true },
  {id:'rumah-hantu',      name:'Rumah Riana',          zone:'Timur',     cap:6,   open:'11.00', close:'16.30', durasi:15,   fastTrack:false, walkthrough:true},
  {id:'sky-warrior',      name:'Alap-Alap',            zone:'Adventure', cap:28,  open:'10.00', close:'18.45', durasi:1.5,  fastTrack:true },
  {id:'kiddy-rides',      name:'Poci-Poci',            zone:'Adventure', cap:36,  open:'10.00', close:'18.45', durasi:3,    fastTrack:false},
  {id:'kereta-misteri',   name:'Kereta Misteri',       zone:'Selatan',   cap:16,  open:'10.00', close:'18.45', durasi:4,    fastTrack:false},
  {id:'turangga-rangga',  name:'Turangga Rangga',      zone:'Selatan',   cap:40,  open:'10.00', close:'18.45', durasi:5,    fastTrack:true },
  {id:'pontang-pontang',  name:'Pontang-Pontang',      zone:'Utara',     cap:24,  open:'10.00', close:'18.45', durasi:7,    fastTrack:false},
  {id:'paralayang',       name:'Paralayang',           zone:'Barat',     cap:16,  open:'10.00', close:'18.45', durasi:5,    fastTrack:false},
  {id:'karavel',          name:'Karavel',              zone:'Barat',     cap:24,  open:'10.00', close:'18.45', durasi:5,    fastTrack:false},
  {id:'kolibri',          name:'Kolibri',              zone:'Barat',     cap:28,  open:'10.00', close:'18.45', durasi:4.5,  fastTrack:false},
  {id:'ice-age',          name:'Ice Age Arctic Adv.',  zone:'Tengah',    cap:20,  open:'12.00', close:'18.45', durasi:15,   fastTrack:true },
  {id:'turbo-drop',       name:'Turbo Drop',           zone:'Barat',     cap:8,   open:'10.00', close:'18.45', durasi:2,    fastTrack:false},
  {id:'baling-baling',    name:'Baling-Baling',        zone:'Barat',     cap:30,  open:'10.00', close:'18.45', durasi:3,    fastTrack:true },
  {id:'kontiki',          name:'Kontiki',              zone:'Tengah',    cap:18,  open:'10.00', close:'18.45', durasi:1.5,  fastTrack:false},
  {id:'zig-zag',          name:'Zig Zag',              zone:'Barat',     cap:32,  open:'10.00', close:'18.45', durasi:2,    fastTrack:true },
  {id:'dream-playground', name:'Dream Playground',     zone:'Tengah',    cap:250, open:'10.00', close:'18.45', durasi:60,   fastTrack:false, walkthrough:true},
  {id:'galactica',        name:'Galactica',            zone:'Tengah',    cap:8,   open:'10.00', close:'18.45', durasi:6,    fastTrack:false},
  {id:'mowgli-jungle',    name:"Mowgli's Jungle 4D",   zone:'Utara',     cap:40,  open:'12.00', close:'20.00', durasi:3,    fastTrack:false},
  {id:'burung-tempur',    name:'Burung Tempur',        zone:'Utara',     cap:28,  open:'10.00', close:'18.45', durasi:4,    fastTrack:false},
  {id:'ombang-ombang',    name:'Ombang-Ombang',        zone:'Utara',     cap:40,  open:'10.00', close:'18.45', durasi:4.5,  fastTrack:false},
  {id:'baku-toki',        name:'Baku Toki',            zone:'Timur',     cap:16,  open:'10.00', close:'18.45', durasi:3,    fastTrack:false},
  {id:'happy-family',     name:'Happy Family The Ride',zone:'Selatan',   cap:40,  open:'11.00', close:'18.45', durasi:4,    fastTrack:false},
  {id:'bianglala',        name:'Bianglala',            zone:'Timur',     cap:4,   open:'10.00', close:'18.45', durasi:20,   fastTrack:true },
  {id:'rumah-miring',     name:'Rumah Miring',         zone:'Timur',     cap:4,   open:'10.00', close:'18.45', durasi:2,    fastTrack:false, walkthrough:true},
  {id:'istana-boneka',    name:'Istana Boneka',        zone:'Timur',     cap:12,  open:'10.00', close:'18.45', durasi:20,   fastTrack:true },
];

/* ============================================================
   STATE
============================================================ */
let qData       = {};
let wtData      = {};   // walkthrough: { wahanaId: { in: N, out: N } }
let ticketStore = [];
let scanned     = new Set();
let curWahana   = null;
let totalScan=0, validScan=0, invalidScan=0;

// Camera
let camStream   = null;
let camFacing   = 'environment';
let camInterval = null;
let cooldown    = false;
let camScanned  = 0;

// Wahana Mulai cooldown
let mulaiTimer    = null;
let mulaiSecsLeft = 0;
let mulaiTotalSecs= 0;

/* ============================================================
   HELPERS
============================================================ */
const getStatus  = (n,c) => { const r=n/c; return r<.3?'low':r<.7?'medium':'high'; };
const getColor   = s => ({low:'#22c55e',medium:'#fbbf24',high:'#ef4444'}[s]||'#22c55e');
const getLabel   = s => ({low:'ANTRIAN NORMAL',medium:'ANTRIAN RAMAI',high:'ANTRIAN SANGAT PADAT'}[s]||'—');
const getWait    = n => { const m=Math.round(n*.8); return m<5?'Langsung masuk':`~${m} menit`; };
const nowStr     = () => [new Date().getHours(),new Date().getMinutes(),new Date().getSeconds()].map(x=>String(x).padStart(2,'0')).join(':');
const isOpen     = w => {
  const toNum = s => { if(!s||s==='-') return null; const [h,m]=s.split('.').map(Number); return h*100+(m||0); };
  const now = new Date(); const hhmm = now.getHours()*100+now.getMinutes();
  const o=toNum(w.open), c=toNum(w.close);
  if(o!==null && hhmm<o) return false;
  if(c!==null && hhmm>=c) return false;
  return true;
};

/* ============================================================
   FIREBASE
============================================================ */
async function loadQueue() {
  const d={}; WAHANA.forEach(w=>d[w.id]=0);
  try {
    const data = await window._fbGet('queue');
    window._fbListen('queue', val => {
      if (!val) return;
      qData = {...d,...val};
      updateQueueDisplay();
    });
    return data ? {...d,...data} : d;
  } catch { return d; }
}

async function saveQueue() {
  try { await window._fbSet('queue', qData); } catch {}
}

async function loadTickets() {
  try {
    const data = await window._fbGet('tickets');
    if (data && typeof data === 'object') {
      ticketStore = Object.values(data);
      document.getElementById('s-loaded').textContent = ticketStore.length;
      showToast('success','🔥',`${ticketStore.length} tiket dimuat dari Firebase`);
      window._fbListen('tickets', val => {
        if (!val) return;
        ticketStore = Object.values(val);
        document.getElementById('s-loaded').textContent = ticketStore.length;
      });
    } else {
      showToast('warning','⚠️','Belum ada tiket di Firebase — buka Ticket Generator');
    }
  } catch(e) {
    showToast('warning','⚠️','Gagal memuat tiket dari Firebase: '+e.message);
  }
}

async function saveTicketStore() {
  try {
    const payload={};
    ticketStore.forEach(t=>{payload[t.id]=t;});
    await window._fbSet('tickets', payload);
  } catch(e){ console.warn('saveTicketStore:',e.message); }
}

/* ============================================================
   WALKTHROUGH FIREBASE
============================================================ */
async function loadWalkthrough() {
  const d = {};
  WAHANA.filter(w => w.walkthrough).forEach(w => d[w.id] = { in:0, out:0 });
  try {
    const data = await window._fbGet('walkthrough');
    window._fbListen('walkthrough', val => {
      if (!val) return;
      wtData = { ...d, ...val };
      // Normalisasi: pastikan semua entry punya field in & out
      Object.keys(wtData).forEach(k => {
        wtData[k] = { in: wtData[k].in||0, out: wtData[k].out||0 };
      });
      updateQueueDisplay();
    });
    if (data) {
      const merged = { ...d, ...data };
      Object.keys(merged).forEach(k => {
        merged[k] = { in: merged[k].in||0, out: merged[k].out||0 };
      });
      return merged;
    }
    return d;
  } catch { return d; }
}

async function saveWalkthrough(id) {
  try { await window._fbSet(`walkthrough/${id}`, wtData[id]); } catch(e) { console.warn('saveWalkthrough:', e.message); }
}

/* ============================================================
   WAHANA PICKER
============================================================ */
function buildPicker() {
  const grid = document.getElementById('pick-grid');
  grid.innerHTML = '';
  const query = (document.getElementById('pick-search').value||'').toLowerCase();
  const list  = query ? WAHANA.filter(w=>w.name.toLowerCase().includes(query)||w.zone.toLowerCase().includes(query)) : WAHANA;
  list.forEach(w => {
    const open = isOpen(w);
    const card = document.createElement('div');
    card.className = 'pick-card';
    card.innerHTML = `
      <div class="pick-card-name">${w.name}</div>
      <div class="pick-card-zone">ZONA ${w.zone.toUpperCase()}</div>
      <div class="pick-card-meta">
        <span class="pick-tag ${open?'open':'closed'}">${open?'🟢 BUKA':'🔴 TUTUP'}</span>
        <span class="pick-tag cap">Cap: ${w.cap}</span>
        ${w.fastTrack?'<span class="pick-tag" style="border-color:rgba(251,191,36,.4);color:#fbbf24;background:rgba(251,191,36,.08)">⚡ FT</span>':''}
        ${w.walkthrough?'<span class="pick-tag" style="border-color:rgba(129,140,248,.4);color:#818cf8;background:rgba(129,140,248,.08)">🚶 WALK-THROUGH</span>':''}
      </div>`;
    card.onclick = () => enterPortal(w.id);
    grid.appendChild(card);
  });
}

function filterPick(q) { buildPicker(); }

function enterPortal(id) {
  curWahana = WAHANA.find(w=>w.id===id);
  if (!curWahana) return;

  // Update topbar
  document.getElementById('tb-wahana').textContent = curWahana.name.toUpperCase();

  // Update wahana header
  document.getElementById('wh-name').textContent = curWahana.name;
  document.getElementById('wh-zone').textContent = `ZONA ${curWahana.zone.toUpperCase()} · ${curWahana.open.replace('.',':')} – ${curWahana.close.replace('.',':')}`;
  const meta = document.getElementById('wh-meta');
  meta.innerHTML = `
    <span class="wh-tag">⏱ Durasi: ${curWahana.durasi} menit</span>
    <span class="wh-tag">👥 Kapasitas: ${curWahana.cap}</span>
    ${curWahana.fastTrack   ? '<span class="wh-tag ft">⚡ Fast Track</span>' : ''}
    ${curWahana.walkthrough ? '<span class="wh-tag" style="border-color:rgba(129,140,248,.4);color:#818cf8;background:rgba(129,140,248,.08)">🚶 Walk-Through</span>' : ''}
  `;

  // Switch screens
  document.getElementById('screen-pick').style.display   = 'none';
  document.getElementById('screen-portal').style.display = 'block';

  // Update link ke exit.html jika walk-through
  if (curWahana.walkthrough) {
    document.getElementById('btn-open-exit').href = `exit.html?wahana=${curWahana.id}`;
  }

  updateQueueDisplay();
  showToast('success','🎢',`Selamat bertugas di ${curWahana.name}!`);
}

function changeWahana() {
  stopCamera();
  resetMulai();
  document.getElementById('screen-portal').style.display = 'none';
  document.getElementById('screen-pick').style.display   = '';
  curWahana = null;
  document.getElementById('tb-wahana').textContent = '— PILIH WAHANA —';
  buildPicker();
}

/* ============================================================
   QUEUE DISPLAY
============================================================ */
function updateQueueDisplay() {
  if (!curWahana) return;

  const mulaiWrap = document.getElementById('mulai-wrap');
  const wtWrap    = document.getElementById('wt-exit-wrap');

  if (curWahana.walkthrough) {
    /* ── WALK-THROUGH MODE ── */
    mulaiWrap.style.display = 'none';
    wtWrap.style.display    = 'block';

    const wt     = wtData[curWahana.id] || { in:0, out:0 };
    const inside = Math.max(0, wt.in - wt.out);
    const s      = getStatus(inside, curWahana.cap);
    const col    = getColor(s);
    const pct    = Math.min(inside / curWahana.cap * 100, 100);

    document.getElementById('qh-label').textContent  = 'DI DALAM WAHANA';
    document.getElementById('qh-sublbl').textContent = `DARI ${curWahana.cap} KAPASITAS`;
    document.getElementById('qh-wait').textContent   = inside >= curWahana.cap
      ? '⛔ KAPASITAS PENUH' : `Slot tersedia: ${curWahana.cap - inside}`;
    document.getElementById('qh-cap').textContent    = `Kapasitas: ${curWahana.cap}`;

    const cnt = document.getElementById('qh-count');
    cnt.textContent      = inside;
    cnt.style.color      = col;
    cnt.style.textShadow = `0 0 40px ${col}66`;

    document.getElementById('qh-bar').style.width      = pct + '%';
    document.getElementById('qh-bar').style.background = col;

    const wtLabels = { low:'TERSEDIA', medium:'HAMPIR PENUH', high:'PENUH — DITUTUP SEMENTARA' };
    const st = document.getElementById('qh-status');
    st.textContent       = inside >= curWahana.cap ? 'PENUH — AKSES DITUTUP' : (wtLabels[s] || 'TERSEDIA');
    st.style.borderColor = col;
    st.style.color       = col;

    // Update counter cards
    document.getElementById('wt-in').textContent  = wt.in;
    document.getElementById('wt-out').textContent = wt.out;

  } else {
    /* ── REGULAR QUEUE MODE ── */
    mulaiWrap.style.display = '';
    wtWrap.style.display    = 'none';

    document.getElementById('qh-label').textContent  = 'ANTRIAN SAAT INI';
    document.getElementById('qh-sublbl').textContent = 'ORANG DALAM ANTRIAN';

    const n   = qData[curWahana.id] || 0;
    const s   = getStatus(n, curWahana.cap);
    const col = getColor(s);
    const pct = Math.min(n / curWahana.cap * 100, 100);

    const cnt = document.getElementById('qh-count');
    cnt.textContent      = n;
    cnt.style.color      = col;
    cnt.style.textShadow = `0 0 40px ${col}66`;

    document.getElementById('qh-bar').style.width      = pct + '%';
    document.getElementById('qh-bar').style.background = col;
    document.getElementById('qh-wait').textContent     = `Estimasi tunggu: ${getWait(n)}`;
    document.getElementById('qh-cap').textContent      = `Kapasitas: ${curWahana.cap}`;

    const st = document.getElementById('qh-status');
    st.textContent         = getLabel(s);
    st.style.borderColor   = col;
    st.style.color         = col;
  }
}

/* ============================================================
   WAHANA MULAI
============================================================ */
async function wahanaStart() {
  if (!curWahana) return;
  if (mulaiTimer) return;

  const q = qData[curWahana.id] || 0;
  const batch = Math.min(q, curWahana.cap);
  qData[curWahana.id] = Math.max(0, q - batch);
  await saveQueue();
  updateQueueDisplay();

  if (batch > 0) {
    addLog('success', curWahana.name, '—', `Wahana mulai — ${batch} orang masuk (sisa antrian: ${qData[curWahana.id]})`);
    showToast('success','🎢',`Wahana mulai! ${batch} orang masuk wahana`);
  } else {
    addLog('warning', curWahana.name, '—', 'Wahana mulai dengan antrian kosong');
    showToast('warning','🎢','Wahana mulai — antrian kosong');
  }

  // Tulis status running ke Firebase
  const durasiSecs = Math.round(curWahana.durasi * 60);
  const until = Date.now() + durasiSecs * 1000;
  try { await window._fbSet(`running/${curWahana.id}`, { until, durasi: curWahana.durasi }); } catch {}

  startMulaiCooldown(durasiSecs);
}

function startMulaiCooldown(totalSecs) {
  mulaiSecsLeft  = totalSecs;
  mulaiTotalSecs = totalSecs;

  const btn      = document.getElementById('btn-mulai');
  const timerEl  = document.getElementById('mulai-timer');
  const cdEl     = document.getElementById('mulai-cd');
  const progWrap = document.getElementById('mulai-progress');
  const progFill = document.getElementById('mulai-progress-fill');

  btn.className      = 'btn-mulai cooldown';
  timerEl.className  = 'mulai-timer show';
  progWrap.className = 'mulai-progress show';

  const tick = () => {
    mulaiSecsLeft--;
    const m = Math.floor(mulaiSecsLeft/60);
    const s = mulaiSecsLeft % 60;
    cdEl.textContent = m > 0 ? `${m}m ${String(s).padStart(2,'0')}s` : `${mulaiSecsLeft}s`;
    btn.textContent  = `⏱  WAHANA BERJALAN — ${m>0?m+'m ':''}${String(s).padStart(2,'0')}s`;
    progFill.style.width = (mulaiSecsLeft / mulaiTotalSecs * 100) + '%';

    if (mulaiSecsLeft <= 0) { resetMulai(); return; }
    mulaiTimer = setTimeout(tick, 1000);
  };

  mulaiTimer = setTimeout(tick, 1000);
}

function resetMulai() {
  clearTimeout(mulaiTimer);
  mulaiTimer = null;
  const btn      = document.getElementById('btn-mulai');
  const timerEl  = document.getElementById('mulai-timer');
  const progWrap = document.getElementById('mulai-progress');
  if (!btn) return;
  btn.className      = 'btn-mulai ready';
  btn.textContent    = '🎢 \u00a0 WAHANA MULAI';
  timerEl.className  = 'mulai-timer';
  progWrap.className = 'mulai-progress';

  // Hapus status running dari Firebase
  if (curWahana) {
    try { window._fbSet(`running/${curWahana.id}`, null); } catch {}
  }
}

/* ============================================================
   VALIDATE TICKET
============================================================ */
function validateTicket(raw) {
  const id = raw.trim().toUpperCase();

  if (ticketStore.length === 0)
    return { ok:false, msg:'Belum ada tiket dimuat — muat dari Ticket Generator', id };

  let ticket = ticketStore.find(t=>t.id===id);
  if (!ticket) ticket = ticketStore.find(t=>id.includes(t.id)||t.id.includes(id));
  if (!ticket) return { ok:false, msg:'Tiket tidak ditemukan dalam sistem', id };

  if (scanned.has(ticket.id))
    return { ok:false, msg:'Tiket sudah digunakan hari ini', ticket };

  if (ticket.status === 'USED')
    return { ok:false, msg:`Tiket sudah dipakai di: ${ticket.usedWahana||'—'}`, ticket };
  if (ticket.status === 'EXPIRED')
    return { ok:false, msg:'Tiket sudah kadaluarsa', ticket };

  const today = new Date().toISOString().slice(0,10);
  if (ticket.date && ticket.date !== today)
    return { ok:false, msg:`Tiket hanya berlaku ${ticket.date}`, ticket };

  // Jam operasional
  if (curWahana && !isOpen(curWahana)) {
    const now = new Date(); const hhmm = now.getHours()*100+now.getMinutes();
    const toNum = s => { const [h,m]=s.split('.').map(Number); return h*100+(m||0); };
    if (hhmm < toNum(curWahana.open))
      return { ok:false, msg:`Wahana belum buka — buka pukul ${curWahana.open.replace('.',':')}`, ticket };
    else
      return { ok:false, msg:`Wahana sudah tutup sejak pukul ${curWahana.close.replace('.',':')}`, ticket };
  }

  return { ok:true, ticket };
}

/* ============================================================
   PROCESS SCAN
============================================================ */
async function processScan(raw) {
  if (!raw) return false;
  if (!curWahana) { showToast('error','⚠️','Pilih wahana terlebih dahulu!'); return false; }

  totalScan++;
  updateStats();

  const result = validateTicket(raw);

  if (result.ok) {
    const t    = result.ticket;
    const isFT = t.fastTrack === true;

    // ── WALK-THROUGH: cek kapasitas ruang dulu ──
    if (curWahana.walkthrough) {
      const wt     = wtData[curWahana.id] || { in:0, out:0 };
      const inside = Math.max(0, wt.in - wt.out);
      if (inside >= curWahana.cap) {
        invalidScan++;
        updateStats();
        flashPulse(false);
        showResult('invalid', t, t.id, `WAHANA PENUH — ${inside}/${curWahana.cap} orang di dalam. Tunggu hingga ada yang keluar.`);
        addLog('error', curWahana.name, t.id, `Ditolak — wahana penuh (${inside}/${curWahana.cap})`);
        showToast('error','🚫',`PENUH! ${inside}/${curWahana.cap} — tidak bisa masuk`);
        return false;
      }
    }

    t.status     = 'USED';
    t.usedAt     = new Date().toISOString();
    t.usedWahana = curWahana.name;
    scanned.add(t.id);
    await saveTicketStore();

    if (curWahana.walkthrough) {
      // Walk-through: increment counter masuk
      const wt = wtData[curWahana.id] || { in:0, out:0 };
      wtData[curWahana.id] = { in: wt.in + 1, out: wt.out };
      await saveWalkthrough(curWahana.id);
      const inside = wtData[curWahana.id].in - wtData[curWahana.id].out;
      validScan++;
      updateStats();
      updateQueueDisplay();
      flashPulse(true);
      showResult('valid', t);
      addLog('success', curWahana.name, t.id, `${t.name} masuk — di dalam: ${inside}/${curWahana.cap}`);
      showToast('success','✅',`${t.name} masuk (${inside}/${curWahana.cap})`);
    } else {
      // Regular ride: tambah antrian
      qData[curWahana.id] = (qData[curWahana.id]||0) + 1;
      await saveQueue();
      validScan++;
      updateStats();
      updateQueueDisplay();
      flashPulse(true);
      showResult('valid', t);
      addLog(
        isFT ? 'fasttrack' : 'success',
        curWahana.name, t.id,
        isFT ? `⚡ FAST TRACK — ${t.name} masuk antrian prioritas` : `${t.name} masuk antrian`
      );
      showToast('success', isFT?'⚡':'✅',
        isFT ? `FAST TRACK: ${t.name} → ${curWahana.name}` : `${t.name} → ${curWahana.name} (+1)`
      );
    }
    return true;

  } else {
    invalidScan++;
    updateStats();
    flashPulse(false);
    showResult('invalid', result.ticket, result.id, result.msg);
    addLog('error', curWahana?.name||'—', result.id||raw, result.msg);
    showToast('error','🚫', result.msg);
    return false;
  }
}

/* ============================================================
   MANUAL
============================================================ */
async function processManual() {
  const inp = document.getElementById('ticket-inp');
  const v   = inp.value.trim();
  if (!v) { showToast('error','⚠️','Masukkan nomor tiket!'); return; }
  await processScan(v.toUpperCase());
  inp.value=''; inp.focus();
}

/* ============================================================
   CAMERA
============================================================ */
async function startCamera() {
  if (!curWahana) { showToast('error','⚠️','Pilih wahana sebelum mengaktifkan kamera!'); return; }
  try {
    if (camStream) stopCamera();
    camStream = await navigator.mediaDevices.getUserMedia({
      video:{ facingMode:camFacing, width:{ideal:1280}, height:{ideal:720} }
    });
    const v = document.getElementById('cam-video');
    v.srcObject = camStream; await v.play();
    document.getElementById('cam-dot').classList.remove('off');
    document.getElementById('cam-txt').textContent = 'AKTIF — MENDETEKSI QR / BARCODE...';
    document.getElementById('btn-start').style.display = 'none';
    document.getElementById('btn-stop').style.display  = '';
    document.getElementById('btn-flip').style.display  = '';
    document.getElementById('scan-line').style.animationPlayState = 'running';
    camInterval = setInterval(scanFrame, 180);
    showToast('success','📷','Kamera aktif');
  } catch(e) {
    let m = 'Gagal mengakses kamera';
    if (e.name==='NotAllowedError') m='Izin kamera ditolak — aktifkan di pengaturan browser';
    if (e.name==='NotFoundError')   m='Kamera tidak ditemukan';
    showToast('error','🚫',m);
  }
}

function stopCamera() {
  if (camStream) { camStream.getTracks().forEach(t=>t.stop()); camStream=null; }
  clearInterval(camInterval);
  const v=document.getElementById('cam-video'); if(v) v.srcObject=null;
  document.getElementById('cam-dot').classList.add('off');
  document.getElementById('cam-txt').textContent='KAMERA TIDAK AKTIF';
  document.getElementById('btn-start').style.display='';
  document.getElementById('btn-stop').style.display='none';
  document.getElementById('btn-flip').style.display='none';
  document.getElementById('scan-line').style.animationPlayState='paused';
}

async function flipCamera() {
  camFacing = camFacing==='environment'?'user':'environment';
  if (camStream) { stopCamera(); await startCamera(); }
}

function scanFrame() {
  if (cooldown) return;
  const vid=document.getElementById('cam-video');
  const cvs=document.getElementById('cam-canvas');
  if (!vid.videoWidth) return;
  cvs.width=vid.videoWidth; cvs.height=vid.videoHeight;
  const ctx=cvs.getContext('2d');
  ctx.drawImage(vid,0,0,cvs.width,cvs.height);
  const img=ctx.getImageData(0,0,cvs.width,cvs.height);
  const qr=jsQR(img.data,img.width,img.height,{inversionAttempts:'dontInvert'});
  if (qr?.data) { onScanDetect(qr.data); return; }
  const qr2=jsQR(img.data,img.width,img.height,{inversionAttempts:'onlyInvert'});
  if (qr2?.data) onScanDetect(qr2.data);
}

async function onScanDetect(raw) {
  if (cooldown) return;
  cooldown = true;
  const f=document.getElementById('scan-flash');
  f.classList.add('lit'); setTimeout(()=>f.classList.remove('lit'),280);
  camScanned++;
  document.getElementById('cam-count').textContent=camScanned+' SCAN';
  let id=raw.trim();
  try { const p=JSON.parse(raw); if(p.id) id=p.id; } catch{}
  id=id.toUpperCase();
  await processScan(id);
  setTimeout(()=>{ cooldown=false; },2400);
}

/* ============================================================
   SHOW RESULT
============================================================ */
function showResult(type, ticket, rawId, errMsg) {
  const box=document.getElementById('v-result');
  const emp=document.getElementById('v-empty');
  emp.style.display='none';
  const isFT = ticket?.fastTrack===true;

  if (type==='valid') {
    box.className = isFT?'v-result show fasttrack':'v-result show valid';
    document.getElementById('v-icon').textContent  = isFT?'⚡':'✅';
    document.getElementById('v-title').textContent = isFT?'FAST TRACK — PRIORITAS':'TIKET VALID — MASUK ANTRIAN';
    document.getElementById('v-title').className   = isFT?'v-title fasttrack':'v-title valid';
  } else {
    box.className='v-result show invalid';
    document.getElementById('v-icon').textContent  = '🚫';
    document.getElementById('v-title').textContent = 'TIKET DITOLAK';
    document.getElementById('v-title').className   = 'v-title invalid';
  }

  if (ticket) {
    document.getElementById('v-id').textContent   = ticket.id||rawId||'—';
    document.getElementById('v-name').textContent = type!=='valid'&&errMsg ? errMsg : (ticket.name||'—');
    document.getElementById('v-type').textContent = ticket.fastTrack?'⚡ FAST TRACK':'🎟️ REGULAR';
    document.getElementById('v-date').textContent = ticket.date||'—';
    document.getElementById('v-used').textContent = ticket.usedWahana||(type==='valid'?curWahana?.name:'—');
  } else {
    document.getElementById('v-id').textContent   = rawId||'—';
    document.getElementById('v-name').textContent = errMsg||'—';
    ['v-type','v-date','v-used'].forEach(i=>document.getElementById(i).textContent='—');
  }
}

/* ============================================================
   STATS
============================================================ */
function updateStats() {
  document.getElementById('s-total').textContent   = totalScan;
  document.getElementById('s-valid').textContent   = validScan;
  document.getElementById('s-invalid').textContent = invalidScan;
  document.getElementById('tb-scan').textContent   = validScan+' SCAN VALID';
}

/* ============================================================
   LOG
============================================================ */
function addLog(type, wahana, id, msg) {
  const list=document.getElementById('log-list');
  if (list.querySelector('div[style]')) list.innerHTML='';
  const icons={success:'✅',fasttrack:'⚡',error:'🚫',warning:'⚠️'};
  const item=document.createElement('div');
  item.className=`log-item ${type==='fasttrack'?'success log-ft':type}`;
  item.innerHTML=`
    <span class="log-icon">${icons[type]||'•'}</span>
    <div class="log-body">
      <div class="log-main">${wahana} — ${msg}</div>
      <div class="log-sub">${id}</div>
    </div>
    <div class="log-time">${nowStr()}</div>`;
  list.insertBefore(item, list.firstChild);
  while (list.children.length>60) list.removeChild(list.lastChild);
}

function clearLog() {
  document.getElementById('log-list').innerHTML='<div style="padding:24px;text-align:center;color:var(--muted);font-family:var(--mono);font-size:10px;letter-spacing:1px">— Log dibersihkan —</div>';
}

/* ============================================================
   FLASH / TOAST
============================================================ */
function flashPulse(ok) {
  const p=document.getElementById('scan-pulse');
  p.style.background=ok?'rgba(34,197,94,0.1)':'rgba(239,68,68,0.1)';
  p.classList.add('flash'); setTimeout(()=>p.classList.remove('flash'),500);
}

let toastTmr;
function showToast(type,icon,msg) {
  const el=document.getElementById('toast');
  document.getElementById('t-icon').textContent=icon;
  document.getElementById('t-msg').textContent=msg;
  el.className=`toast ${type} show`;
  clearTimeout(toastTmr); toastTmr=setTimeout(()=>el.classList.remove('show'),3500);
}

/* ============================================================
   TAB
============================================================ */
function switchTab(t) {
  document.getElementById('tab-cam').classList.toggle('active',t==='cam');
  document.getElementById('tab-man').classList.toggle('active',t==='man');
  document.getElementById('pane-cam').classList.toggle('active',t==='cam');
  document.getElementById('pane-man').classList.toggle('active',t==='man');
  if (t!=='cam') stopCamera();
}

/* ============================================================
   INIT
============================================================ */
document.getElementById('ticket-inp').addEventListener('keydown',e=>{ if(e.key==='Enter') processManual(); });

async function initApp() {
  qData  = await loadQueue();
  wtData = await loadWalkthrough();
  buildPicker();
  updateStats();
  await loadTickets();
}

if (window._fbReady) {
  initApp();
} else {
  document.addEventListener('firebase-ready', initApp, { once:true });
  setTimeout(()=>{ if(ticketStore.length===0&&window._fbReady) initApp(); },1500);
}
