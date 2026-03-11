
/* ============================================================
   WAHANA DATA (hanya walk-through)
============================================================ */
const WAHANA_WT = [
  { id:'rumah-hantu',      name:'Rumah Riana',      zone:'Timur',   cap:6,   open:'11.00', close:'16.30' },
  { id:'rumah-miring',     name:'Rumah Miring',     zone:'Timur',   cap:4,   open:'10.00', close:'18.45' },
  { id:'dream-playground', name:'Dream Playground', zone:'Tengah',  cap:250, open:'10.00', close:'18.45' },
];

/* ============================================================
   STATE
============================================================ */
let curWahana = null;
let wtData    = {};   // { wahanaId: { in: N, out: N } }
let exitCooldown = false;

/* ============================================================
   HELPERS
============================================================ */
const isOpen = w => {
  const toNum = s => { if(!s||s==='-') return null; const[h,m]=s.split('.').map(Number); return h*100+(m||0); };
  const now = new Date(); const hhmm = now.getHours()*100 + now.getMinutes();
  const o=toNum(w.open), c=toNum(w.close);
  if(o!==null && hhmm<o) return false;
  if(c!==null && hhmm>=c) return false;
  return true;
};

const getInside = id => {
  const wt = wtData[id] || { in:0, out:0 };
  return Math.max(0, (wt.in||0) - (wt.out||0));
};

const getStatus = (inside, cap) => {
  const r = inside / cap;
  return r < 0.5 ? 'low' : r < 0.85 ? 'medium' : 'high';
};

const STATUS_LABEL = { low:'TERSEDIA', medium:'HAMPIR PENUH', high:'PENUH' };
const STATUS_COL   = { low:'#22c55e', medium:'#fbbf24', high:'#ef4444' };

/* ============================================================
   FIREBASE
============================================================ */
async function loadAndListen() {
  try {
    const data = await window._fbGet('walkthrough');
    if (data) {
      Object.keys(data).forEach(k => {
        wtData[k] = { in: data[k].in||0, out: data[k].out||0 };
      });
    }

    // Live listener
    window._fbListen('walkthrough', val => {
      if (!val) return;
      Object.keys(val).forEach(k => {
        wtData[k] = { in: val[k].in||0, out: val[k].out||0 };
      });
      buildPicker();
      if (curWahana) updateDisplay();
    });
  } catch(e) {
    console.warn('loadAndListen:', e);
  }

  // Build picker setelah data ready (kecuali sudah auto-select via param)
  const params = new URLSearchParams(window.location.search);
  if (!params.get('wahana')) buildPicker();
}

async function saveExit(id) {
  try {
    await window._fbSet(`walkthrough/${id}`, wtData[id]);
  } catch(e) { console.warn('saveExit:', e.message); }
}

/* ============================================================
   PICKER
============================================================ */
function buildPicker() {
  const container = document.getElementById('pick-cards');
  container.innerHTML = '';

  WAHANA_WT.forEach(w => {
    const inside = getInside(w.id);
    const s      = getStatus(inside, w.cap);
    const col    = STATUS_COL[s];
    const open   = isOpen(w);
    const pct    = Math.round(inside / w.cap * 100);

    const card = document.createElement('div');
    card.className = 'pick-card';
    card.style.animation = 'fadeUp .4s ease both';
    card.innerHTML = `
      <div class="pc-left">
        <div class="pc-name">${w.name}</div>
        <div class="pc-meta" style="margin-top:6px">
          <span class="pc-tag ${open?'open':'closed'}">${open?'🟢 BUKA':'🔴 TUTUP'}</span>
          <span class="pc-tag wt">🚶 WALK-THROUGH</span>
          <span class="pc-tag cap">Cap: ${w.cap}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:2px">
        <div>
          <div class="pc-inside" style="color:${col};text-shadow:0 0 20px ${col}66">${inside}</div>
          <div class="pc-inside-lbl">${pct}% TERISI</div>
        </div>
        <div class="pc-arrow">›</div>
      </div>`;
    card.onclick = () => enterExit(w.id);
    container.appendChild(card);
  });
}

/* ============================================================
   ENTER EXIT SCREEN
============================================================ */
function enterExit(id) {
  curWahana = WAHANA_WT.find(w => w.id === id);
  if (!curWahana) return;

  document.getElementById('ew-name').textContent = curWahana.name;
  document.getElementById('ew-sub').textContent  = `ZONA ${curWahana.zone.toUpperCase()} · PINTU KELUAR`;
  document.getElementById('occ-cap').textContent = curWahana.cap;

  document.getElementById('screen-pick').style.display = 'none';
  document.getElementById('screen-exit').style.display = 'block';

  updateDisplay();
  showToast('success','🚪',`Pintu keluar ${curWahana.name} aktif`);
}

function changePicker() {
  curWahana = null;
  document.getElementById('screen-exit').style.display = 'none';
  document.getElementById('screen-pick').style.display = 'block';
  document.getElementById('full-banner').classList.remove('show');
}

/* ============================================================
   DISPLAY UPDATE
============================================================ */
function updateDisplay() {
  if (!curWahana) return;

  const wt     = wtData[curWahana.id] || { in:0, out:0 };
  const inside = Math.max(0, (wt.in||0) - (wt.out||0));
  const cap    = curWahana.cap;
  const s      = getStatus(inside, cap);
  const col    = STATUS_COL[s];
  const pct    = Math.min(Math.round(inside / cap * 100), 100);

  // Big number
  const el = document.getElementById('occ-inside');
  el.textContent   = inside;
  el.style.color   = col;
  el.style.textShadow = `0 0 40px ${col}66`;

  // Bar
  document.getElementById('occ-bar').style.width      = pct + '%';
  document.getElementById('occ-bar').style.background  = col;

  // Meta
  document.getElementById('occ-slot').textContent = inside >= cap
    ? '⛔ KAPASITAS PENUH' : `Slot tersedia: ${cap - inside}`;
  document.getElementById('occ-pct').textContent  = `${pct}% terisi`;

  // Status badge
  const stEl = document.getElementById('occ-status');
  stEl.textContent       = inside >= cap ? 'PENUH — AKSES DITUTUP' : (STATUS_LABEL[s] || 'TERSEDIA');
  stEl.style.borderColor = col;
  stEl.style.color       = col;

  // Counter cards
  document.getElementById('c-in').textContent  = wt.in  || 0;
  document.getElementById('c-out').textContent = wt.out || 0;

  // Full banner
  const banner = document.getElementById('full-banner');
  if (inside >= cap) banner.classList.add('show');
  else banner.classList.remove('show');

  // Button state
  const btn = document.getElementById('btn-exit');
  if (inside <= 0) {
    btn.classList.add('disabled');
  } else {
    btn.classList.remove('disabled');
  }
}

/* ============================================================
   DO EXIT
============================================================ */
async function doExit() {
  if (!curWahana || exitCooldown) return;

  const wt     = wtData[curWahana.id] || { in:0, out:0 };
  const inside = Math.max(0, (wt.in||0) - (wt.out||0));

  if (inside <= 0) {
    showToast('warning','⚠️','Tidak ada pengunjung di dalam');
    return;
  }

  // Flash feedback
  const flash = document.getElementById('btn-flash');
  flash.classList.add('lit');
  setTimeout(() => flash.classList.remove('lit'), 400);

  // Cooldown singkat (anti double-tap)
  exitCooldown = true;
  const ring = document.getElementById('cooldown-ring');
  ring.classList.add('show');
  setTimeout(() => {
    exitCooldown = false;
    ring.classList.remove('show');
  }, 600);

  // Update data
  wtData[curWahana.id] = { in: wt.in||0, out: (wt.out||0) + 1 };
  const remaining = Math.max(0, wtData[curWahana.id].in - wtData[curWahana.id].out);

  // Update UI immediately (optimistic)
  updateDisplay();

  // Save to Firebase
  await saveExit(curWahana.id);

  showToast('success', '🚪', `Keluar — di dalam: ${remaining}/${curWahana.cap}`);
}

/* ============================================================
   TOAST
============================================================ */
let toastTmr;
function showToast(type, icon, msg) {
  const el = document.getElementById('toast');
  document.getElementById('t-icon').textContent = icon;
  document.getElementById('t-msg').textContent  = msg;
  el.className = `toast ${type} show`;
  clearTimeout(toastTmr);
  toastTmr = setTimeout(() => el.classList.remove('show'), 3000);
}

/* ============================================================
   CLOCK
============================================================ */
setInterval(() => {
  document.getElementById('topbar-time').textContent =
    new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
}, 1000);

/* ============================================================
   INIT
============================================================ */
function initApp() {
  // Cek URL param ?wahana=<id>
  const params   = new URLSearchParams(window.location.search);
  const paramId  = params.get('wahana');

  loadAndListen().then(() => {
    if (paramId) {
      const found = WAHANA_WT.find(w => w.id === paramId);
      if (found) {
        // Auto-enter, sembunyikan picker sama sekali
        enterExit(paramId);
        // Sembunyikan tombol "Ganti" supaya layar ini terkunci ke wahana ini
        // (bisa di-uncomment jika tidak ingin staf ganti wahana dari halaman ini)
        // document.querySelector('.change-btn').style.display = 'none';
      } else {
        showToast('warning','⚠️',`Wahana "${paramId}" tidak ditemukan`);
      }
    }
  });
}

if (window._fbReady) initApp();
else document.addEventListener('firebase-ready', initApp, { once:true });