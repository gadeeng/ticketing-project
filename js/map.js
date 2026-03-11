
/* =================================================================
   NODE DATA — positions from main.js createMap()
   Format: { x, y, type, name, queueId, cap }
   queueId = key di Firebase 'queue' path (from staff.html WAHANA)
   null = node ini belum terhubung ke scanner
================================================================= */
const MAP_W = 1280, MAP_H = 640;

const NODES = [
  { x:0.134, y:0.894, type:'entrance', name:'Entrance',              queueId:null,             cap:9999, open:'09.00', close:'21.00', fastTrack:false, minHeight:'-',      jenis:'Umum',       durasi:'-'        }, // 0
  { x:0.366, y:0.899, type:'ride',     name:'Kereta Misteri',        queueId:'kereta-misteri', cap:16,   open:'10.00', close:'18.45', fastTrack:false, minHeight:'125 cm', jenis:'Dewasa',     durasi:'4 menit'  }, // 1
  { x:0.351, y:0.826, type:'ride',     name:'Turangga Rangga',       queueId:'turangga-rangga',cap:40,   open:'10.00', close:'18.45', fastTrack:true,  minHeight:'-',      jenis:'Umum',       durasi:'5 menit'  }, // 2
  { x:0.619, y:0.224, type:'ride',     name:'Pontang-Pontang',       queueId:'pontang-pontang',cap:24,   open:'10.00', close:'18.45', fastTrack:false, minHeight:'125 cm', jenis:'Anak-Anak',  durasi:'7 menit'  }, // 3
  { x:0.050, y:0.458, type:'ride',     name:'Paralayang',            queueId:'paralayang',     cap:16,   open:'10.00', close:'18.45', fastTrack:false, minHeight:'100 cm', jenis:'Dewasa',     durasi:'5 menit'  }, // 4
  { x:0.060, y:0.428, type:'ride',     name:'Karavel',               queueId:'karavel',        cap:24,   open:'10.00', close:'18.45', fastTrack:false, minHeight:'100 cm', jenis:'Anak-Anak',  durasi:'5 menit'  }, // 5
  { x:0.134, y:0.331, type:'ride',     name:'Kolibri',               queueId:'kolibri',        cap:28,   open:'10.00', close:'18.45', fastTrack:false, minHeight:'100 cm', jenis:'Anak-Anak',  durasi:'4.5 menit'}, // 6
  { x:0.384, y:0.561, type:'ride',     name:'Ice Age Arctic Adv.',   queueId:'ice-age',        cap:20,   open:'12.00', close:'18.45', fastTrack:true,  minHeight:'110 cm', jenis:'Dewasa',     durasi:'15 menit' }, // 7
  { x:0.116, y:0.334, type:'ride',     name:'Turbo Drop',            queueId:'turbo-drop',     cap:8,    open:'10.00', close:'18.45', fastTrack:false, minHeight:'100 cm', jenis:'Anak-Anak',  durasi:'2 menit'  }, // 8
  { x:0.183, y:0.272, type:'ride',     name:'Baling-Baling',         queueId:'baling-baling',  cap:30,   open:'10.00', close:'18.45', fastTrack:true,  minHeight:'145 cm', jenis:'Dewasa',     durasi:'3 menit'  }, // 9
  { x:0.387, y:0.588, type:'ride',     name:'Kontiki',               queueId:'kontiki',        cap:18,   open:'10.00', close:'18.45', fastTrack:false, minHeight:'100 cm', jenis:'Dewasa',     durasi:'1.5 menit'}, // 10
  { x:0.172, y:0.355, type:'ride',     name:'Zig Zag',               queueId:'zig-zag',        cap:32,   open:'10.00', close:'18.45', fastTrack:true,  minHeight:'125 cm', jenis:'Dewasa',     durasi:'2 menit'  }, // 11
  { x:0.373, y:0.564, type:'ride',     name:'Dream Playground',      queueId:'dream-playground',cap:250, open:'10.00', close:'18.45', fastTrack:false, minHeight:'125 cm', jenis:'Anak-Anak',  durasi:'60 menit', walkthrough:true }, // 12
  { x:0.369, y:0.430, type:'ride',     name:'Galactica',             queueId:'galactica',      cap:8,    open:'10.00', close:'18.45', fastTrack:false, minHeight:'100 cm', jenis:'Dewasa',     durasi:'6 menit'  }, // 13
  { x:0.109, y:0.593, type:'ride',     name:'Ontang-Anting',         queueId:'ontang-anting',  cap:56,   open:'10.00', close:'18.45', fastTrack:true,  minHeight:'100 cm', jenis:'Dewasa',     durasi:'2 menit'  }, // 14
  { x:0.406, y:0.571, type:'junc',     name:'Junction',              queueId:null,             cap:0,    open:'-',     close:'-',     fastTrack:false, minHeight:'-',      jenis:'-',          durasi:'-'        }, // 15
  { x:0.578, y:0.264, type:'ride',     name:"Mowgli's Jungle 4D",    queueId:'mowgli-jungle',  cap:40,   open:'12.00', close:'20.00', fastTrack:false, minHeight:'100 cm', jenis:'Umum',       durasi:'3 menit'  }, // 16
  { x:0.383, y:0.208, type:'ride',     name:'Arung Jeram',           queueId:'arung-jeram',    cap:8,    open:'10.00', close:'18.45', fastTrack:true,  minHeight:'110 cm', jenis:'Dewasa',     durasi:'2 menit'  }, // 17
  { x:0.507, y:0.143, type:'ride',     name:'Burung Tempur',         queueId:'burung-tempur',  cap:28,   open:'10.00', close:'18.45', fastTrack:false, minHeight:'100 cm', jenis:'Anak-Anak',  durasi:'4 menit'  }, // 18
  { x:0.609, y:0.050, type:'ride',     name:'Halilintar',            queueId:'halilintar',     cap:24,   open:'10.00', close:'18.45', fastTrack:true,  minHeight:'125 cm', jenis:'Dewasa',     durasi:'1.5 menit'}, // 19
  { x:0.619, y:0.278, type:'ride',     name:'Ombang-Ombang',         queueId:'ombang-ombang',  cap:40,   open:'10.00', close:'18.45', fastTrack:false, minHeight:'100 cm', jenis:'Dewasa',     durasi:'4.5 menit'}, // 20
  { x:0.775, y:0.199, type:'ride',     name:'Baku Toki',             queueId:'baku-toki',      cap:16,   open:'10.00', close:'18.45', fastTrack:false, minHeight:'100 cm', jenis:'Anak-Anak',  durasi:'3 menit'  }, // 21
  { x:0.742, y:0.308, type:'ride',     name:'Gajah Beledug',         queueId:'bom-bom-boat',   cap:48,   open:'10.00', close:'18.45', fastTrack:false, minHeight:'-',      jenis:'Anak-Anak',  durasi:'4 menit'  }, // 22
  { x:0.777, y:0.368, type:'ride',     name:'Kora-Kora',             queueId:'kora-kora',      cap:36,   open:'10.00', close:'18.45', fastTrack:true,  minHeight:'125 cm', jenis:'Dewasa',     durasi:'3 menit'  }, // 23
  { x:0.766, y:0.451, type:'ride',     name:'Hysteria',              queueId:'hysteria',       cap:12,   open:'10.00', close:'18.45', fastTrack:true,  minHeight:'145 cm', jenis:'Dewasa',     durasi:'1 menit'  }, // 24
  { x:0.424, y:0.691, type:'ride',     name:'Happy Family The Ride', queueId:'happy-family',   cap:40,   open:'11.00', close:'18.45', fastTrack:false, minHeight:'100 cm', jenis:'Umum',       durasi:'4 menit'  }, // 25
  { x:0.774, y:0.522, type:'ride',     name:'Bianglala',             queueId:'bianglala',      cap:4,    open:'10.00', close:'18.45', fastTrack:true,  minHeight:'-',      jenis:'Dewasa',     durasi:'20 menit' }, // 26
  { x:0.751, y:0.756, type:'ride',     name:'Alap-Alap',             queueId:'sky-warrior',    cap:28,   open:'10.00', close:'18.45', fastTrack:true,  minHeight:'100 cm', jenis:'Dewasa',     durasi:'1.5 menit'}, // 27
  { x:0.716, y:0.789, type:'ride',     name:'Tornado',               queueId:'tornado',        cap:40,   open:'10.00', close:'18.45', fastTrack:true,  minHeight:'145 cm', jenis:'Dewasa',     durasi:'3 menit'  }, // 28
  { x:0.517, y:0.891, type:'ride',     name:'Rumah Riana',           queueId:'rumah-hantu',    cap:6,    open:'11.00', close:'16.30', fastTrack:false, minHeight:'110 cm', jenis:'Dewasa',     durasi:'15 menit', walkthrough:true }, // 29
  { x:0.546, y:0.950, type:'ride',     name:'Niagara-Gara',          queueId:'niagara',        cap:4,    open:'10.00', close:'20.00', fastTrack:true,  minHeight:'125 cm', jenis:'Dewasa',     durasi:'4.5 menit'}, // 30
  { x:0.908, y:0.921, type:'ride',     name:'Rumah Miring',          queueId:'rumah-miring',   cap:4,    open:'10.00', close:'18.45', fastTrack:false, minHeight:'-',      jenis:'Umum',       durasi:'2 menit',  walkthrough:true }, // 31
  { x:0.822, y:0.826, type:'ride',     name:'Poci-Poci',             queueId:'kiddy-rides',    cap:36,   open:'10.00', close:'18.45', fastTrack:false, minHeight:'100 cm', jenis:'Anak-Anak',  durasi:'3 menit'  }, // 32
  { x:0.950, y:0.801, type:'ride',     name:'Istana Boneka',         queueId:'istana-boneka',  cap:12,   open:'10.00', close:'18.45', fastTrack:true,  minHeight:'-',      jenis:'Umum',       durasi:'20 menit' }, // 33
];

// Exact connections from main.js
const CONNS = [
  [0,1],[6,8],[6,11],[8,11],[3,19],[3,20],[3,16],[0,2],[1,2],[0,4],[4,5],[5,6],[8,4],
  [7,10],[10,12],[5,8],[6,9],[9,11],[11,14],[8,14],[11,13],[13,14],[13,15],[14,15],
  [12,15],[10,15],[7,15],[7,12],[13,16],[16,17],[11,17],[13,17],[9,17],[17,18],[16,18],
  [18,19],[16,19],[16,20],[16,21],[20,21],[21,22],[20,22],[22,23],[21,23],[23,24],[20,24],
  [15,25],[1,25],[2,25],[2,15],[2,14],[25,26],[23,26],[24,26],[26,27],[24,27],[27,28],
  [26,28],[28,29],[25,29],[1,29],[29,30],[28,30],[27,30],[1,30],[30,31],[27,31],[27,32],
  [24,33],[32,33],[31,33]
];

/* ── State ── */
let qData  = {};
let wtData = {};
let runData = {};  // { wahanaId: { until: timestamp, durasi: menit } }

const TURNOVER = 0.5; // menit loading/unloading antar siklus

const getStatus = (q, cap) => {
  if (!cap || cap <= 0) return 'none';
  const r = q / cap;
  return r < 0.3 ? 'low' : r < 0.7 ? 'medium' : 'high';
};
const COL = { low:'#22c55e', medium:'#fbbf24', high:'#ef4444', none:'#38bdf8', unlinked:'#475569' };
const LBL = { low:'ANTRIAN NORMAL', medium:'ANTRIAN RAMAI', high:'SANGAT PADAT', none:'ENTRANCE', unlinked:'BELUM DI SCANNER' };
const WT_LBL = { low:'TERSEDIA', medium:'HAMPIR PENUH', high:'PENUH' };

const parseDurasi = s => {
  if (!s || s === '-') return 0;
  const m = String(s).match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
};

const getWait = (q, node) => {
  if (!node || !node.queueId) return 'Langsung masuk';
  const durasi = parseDurasi(node.durasi);
  const cap    = node.cap || 1;
  if (durasi === 0) return q < 5 ? 'Langsung masuk' : `~${Math.round(q * 0.8)} menit`;
  const raw = (q / cap) * durasi + TURNOVER;
  if (raw < 1) return 'Langsung masuk';
  const mins = Math.round(raw);
  return mins >= 60
    ? `~${Math.floor(mins/60)}j ${mins%60}m`
    : `~${mins} menit`;
};

const isRunning = n => {
  if (!n.queueId) return false;
  const r = runData[n.queueId];
  return r && r.until && Date.now() < r.until;
};

const getRunRemaining = n => {
  const r = runData[n.queueId];
  if (!r || !r.until) return 0;
  return Math.max(0, Math.round((r.until - Date.now()) / 1000));
};

const getQ = n => {
  if (!n.queueId) return 0;
  if (n.walkthrough) {
    const wt = wtData[n.queueId] || { in:0, out:0 };
    return Math.max(0, (wt.in||0) - (wt.out||0));
  }
  return qData[n.queueId] || 0;
};
const getNodeStatus = n => {
  if (n.type === 'entrance') return 'none';
  if (!n.queueId) return 'unlinked';
  return getStatus(getQ(n), n.cap);
};
const getNodeCol = n => COL[getNodeStatus(n)];

/* =================================================================
   CANVAS
================================================================= */
const canvas = document.getElementById('map-canvas');
const ctx    = canvas.getContext('2d');
let CW, CH, scale;

function resize() {
  const wrap = document.getElementById('map-wrap');
  const cssW = wrap.clientWidth;
  const dpr  = Math.min(window.devicePixelRatio || 1, 2);
  CW = cssW * dpr;
  CH = Math.round(CW * MAP_H / MAP_W);
  canvas.width  = CW;
  canvas.height = CH;
  canvas.style.width  = cssW + 'px';
  canvas.style.height = Math.round(cssW * MAP_H / MAP_W) + 'px';
  scale = CW / MAP_W;
  draw();
}

const px = n => n.x * CW;
const py = n => n.y * CH;

/* ── Background (blueprint, same as main.js drawParkBackground) ── */
function drawBg() {
  ctx.fillStyle = 'rgb(8,18,38)';
  ctx.fillRect(0, 0, CW, CH);

  // Major grid
  const gM = 80 * scale;
  ctx.strokeStyle = 'rgba(30,80,160,0.6)'; ctx.lineWidth = 1;
  for (let x = 0; x <= CW; x += gM) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,CH); ctx.stroke(); }
  for (let y = 0; y <= CH; y += gM) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(CW,y); ctx.stroke(); }

  // Minor grid
  const gm = 20 * scale;
  ctx.strokeStyle = 'rgba(20,55,120,0.28)'; ctx.lineWidth = 0.5;
  for (let x = 0; x <= CW; x += gm) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,CH); ctx.stroke(); }
  for (let y = 0; y <= CH; y += gm) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(CW,y); ctx.stroke(); }

  // Corner crosshairs
  const mk = 12 * scale;
  ctx.strokeStyle = 'rgba(56,140,255,0.5)'; ctx.lineWidth = 1;
  [[20*scale,20*scale],[CW-20*scale,20*scale],[20*scale,CH-20*scale],[CW-20*scale,CH-20*scale]].forEach(([cx,cy])=>{
    ctx.beginPath();ctx.moveTo(cx-mk,cy);ctx.lineTo(cx+mk,cy);ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx,cy-mk);ctx.lineTo(cx,cy+mk);ctx.stroke();
  });

  // Scale bar
  const sbX=CW-120*scale, sbY=CH-20*scale, sbW=80*scale;
  ctx.strokeStyle='rgba(56,140,255,0.6)';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(sbX,sbY);ctx.lineTo(sbX+sbW,sbY);ctx.stroke();
  ctx.beginPath();ctx.moveTo(sbX,sbY-4*scale);ctx.lineTo(sbX,sbY+4*scale);ctx.stroke();
  ctx.beginPath();ctx.moveTo(sbX+sbW,sbY-4*scale);ctx.lineTo(sbX+sbW,sbY+4*scale);ctx.stroke();
  ctx.fillStyle='rgba(56,140,255,0.6)'; ctx.font=`${8*scale}px "Share Tech Mono"`;
  ctx.textAlign='center'; ctx.textBaseline='alphabetic'; ctx.fillText('~400m', sbX+sbW/2, sbY-3*scale);

  // Compass (top-right)
  const cpX=CW-38*scale, cpY=62*scale, cpR=20*scale;
  ctx.strokeStyle='rgba(56,189,248,0.3)';ctx.lineWidth=1;
  ctx.beginPath();ctx.arc(cpX,cpY,cpR,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='rgba(56,189,248,0.12)';ctx.fill();
  ctx.fillStyle='#38bdf8';ctx.font=`bold ${9*scale}px "Share Tech Mono"`;
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('U',cpX,cpY-5*scale);
  ctx.fillStyle='rgba(56,189,248,0.5)';ctx.font=`${8*scale}px "Share Tech Mono"`;
  ctx.fillText('↑',cpX,cpY+5*scale);
}

/* ── Connections ── */
function drawConns() {
  ctx.setLineDash([3*scale, 4*scale]);
  CONNS.forEach(([a,b]) => {
    ctx.strokeStyle='rgba(56,140,255,0.22)';
    ctx.lineWidth=1.5*scale;
    ctx.beginPath();
    ctx.moveTo(px(NODES[a]),py(NODES[a]));
    ctx.lineTo(px(NODES[b]),py(NODES[b]));
    ctx.stroke();
  });
  ctx.setLineDash([]);
}

/* ── Rounded rect helper ── */
function rr(x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);
  ctx.closePath();
}

/* ── Draw single node ── */
const NR = 15; // base radius at MAP_W=1280
function drawNode(node) {
  if (node.type === 'junc') {
    ctx.beginPath(); ctx.arc(px(node),py(node), 3*scale, 0, Math.PI*2);
    ctx.fillStyle='rgba(56,140,255,0.3)'; ctx.fill();
    return;
  }

  const x=px(node), y=py(node), r=NR*scale;
  const col = getNodeCol(node);
  const q   = getQ(node);
  const hasData = node.queueId !== null;
  const running = isRunning(node);

  if (node.type === 'entrance') {
    const er = r * 1.2;
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0,-er);ctx.lineTo(er,0);ctx.lineTo(0,er);ctx.lineTo(-er,0);
    ctx.closePath();
    ctx.fillStyle='rgba(56,189,248,0.15)'; ctx.fill();
    ctx.shadowColor='#38bdf8'; ctx.shadowBlur=14*scale;
    ctx.strokeStyle='#38bdf8'; ctx.lineWidth=1.5*scale; ctx.stroke();
    ctx.shadowBlur=0;
    ctx.fillStyle='#38bdf8'; ctx.font=`bold ${7*scale}px "Share Tech Mono"`;
    ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('IN',0,0);
    ctx.fillStyle='rgba(147,210,245,0.6)'; ctx.font=`${6.5*scale}px "Share Tech Mono"`;
    ctx.fillText('ENTRANCE', 0, er+9*scale);
    ctx.restore();
    return;
  }

  // ── RUNNING: animasi ring berputar ──
  if (running) {
    const t   = (Date.now() / 1000) % (Math.PI * 2);
    const rr2 = r * 1.65;
    // Track bg
    ctx.beginPath(); ctx.arc(x, y, rr2, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(251,191,36,0.15)'; ctx.lineWidth = 2.5*scale; ctx.stroke();
    // Arc berputar
    ctx.save();
    ctx.shadowColor = '#fbbf24'; ctx.shadowBlur = 10*scale;
    ctx.beginPath();
    ctx.arc(x, y, rr2, t, t + Math.PI * 1.2);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5*scale;
    ctx.lineCap = 'round'; ctx.stroke();
    ctx.restore();
  }

  // Outer glow
  if (hasData && q > 0) {
    ctx.save();
    ctx.shadowColor = col; ctx.shadowBlur = 18*scale;
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
    ctx.strokeStyle = col+'44'; ctx.lineWidth=1*scale; ctx.stroke();
    ctx.restore();
  }

  // Body gradient
  const g = ctx.createRadialGradient(x,y-r*0.35,0,x,y,r);
  g.addColorStop(0, col+'2e');
  g.addColorStop(1, 'rgba(6,14,30,0.9)');
  ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fillStyle=g; ctx.fill();

  // Border
  ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
  ctx.strokeStyle = col; ctx.lineWidth = (hasData && q > 0) ? 2*scale : 1.5*scale;
  ctx.stroke();

  // Count text inside
  if (hasData) {
    ctx.save();
    ctx.shadowColor=col; ctx.shadowBlur=8*scale;
    ctx.fillStyle=col;
    const fs = q >= 100 ? 9*scale : 11*scale;
    ctx.font=`bold ${fs}px "Orbitron"`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(q, x, y);
    ctx.restore();
  } else {
    ctx.fillStyle='rgba(71,85,105,0.8)';
    ctx.font=`${8*scale}px "Share Tech Mono"`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('—', x, y);
  }

  // ── RUNNING: label "BERJALAN" kecil di atas node ──
  if (running) {
    const secsLeft = getRunRemaining(node);
    const m = Math.floor(secsLeft/60);
    const s = secsLeft % 60;
    const label = m > 0 ? `▶ ${m}m ${String(s).padStart(2,'0')}s` : `▶ ${secsLeft}s`;
    const fss = 6.5*scale;
    ctx.font = `${fss}px "Share Tech Mono"`;
    const tw  = ctx.measureText(label).width;
    const lW  = tw+10*scale, lH=11*scale;
    const lX  = x - lW/2, lY = y - r - lH - 5*scale;
    ctx.fillStyle='rgba(251,191,36,0.18)';
    rr(lX,lY,lW,lH,2.5*scale); ctx.fill();
    ctx.strokeStyle='rgba(251,191,36,0.6)'; ctx.lineWidth=0.8*scale;
    rr(lX,lY,lW,lH,2.5*scale); ctx.stroke();
    ctx.fillStyle='#fbbf24';
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(label, x, lY+lH/2);
  }

  // Name label pill below node
  const name = node.name;
  const fs = 7*scale;
  ctx.font=`${fs}px "Share Tech Mono"`;
  const tw = ctx.measureText(name).width;
  const lW=tw+10*scale, lH=12*scale, lX=x-lW/2, lY=y+r+4*scale;
  // Pill bg
  ctx.fillStyle='rgba(6,14,30,0.82)'; rr(lX,lY,lW,lH,2.5*scale); ctx.fill();
  // Left accent stripe
  ctx.fillStyle=col; rr(lX,lY,2.5*scale,lH,1.5*scale); ctx.fill();
  // Name text
  ctx.fillStyle = hasData ? '#cbd5e1' : '#475569';
  ctx.font=`${fs}px "Share Tech Mono"`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(name, x+1.5*scale, lY+lH/2);
}

function draw() {
  ctx.clearRect(0,0,CW,CH);
  drawBg();
  drawConns();
  NODES.forEach(drawNode);
}

let animFrameId = null;
function startAnimLoop() {
  if (animFrameId) return;
  const loop = () => {
    // Hanya redraw jika ada wahana yang sedang running
    const anyRunning = NODES.some(n => isRunning(n));
    if (anyRunning) draw();
    animFrameId = requestAnimationFrame(loop);
  };
  animFrameId = requestAnimationFrame(loop);
}

/* =================================================================
   TOOLTIP
================================================================= */
const tooltip = document.getElementById('map-tooltip');
let hoveredIdx = -1;

function hitTest(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const mx = (clientX - rect.left) * (CW / rect.width);
  const my = (clientY - rect.top)  * (CH / rect.height);
  const hitR = NR * scale * 2.4;
  for (let i = 0; i < NODES.length; i++) {
    const n = NODES[i];
    if (n.type === 'junc') continue;
    const dx = px(n)-mx, dy = py(n)-my;
    if (dx*dx+dy*dy < hitR*hitR) return i;
  }
  return -1;
}

function updateTooltip(idx) {
  const node = NODES[idx];
  const q    = getQ(node);
  const st   = getNodeStatus(node);
  const col  = COL[st];
  const pct  = Math.min(q / Math.max(node.cap,1) * 100, 100);
  const isWT = node.walkthrough === true;

  document.getElementById('tt-name').textContent    = node.name;
  document.getElementById('tt-name').style.color    = col;
  document.getElementById('tt-count').textContent   = node.type==='entrance' ? '—' : q;
  document.getElementById('tt-count').style.color   = col;
  document.getElementById('tt-count').style.textShadow = `0 0 20px ${col}`;
  document.getElementById('tt-count-lbl').textContent = isWT ? `DI DALAM  ·  Kapasitas ${node.cap}` : 'ORANG DALAM ANTRIAN';
  document.getElementById('tt-bar').style.width     = pct+'%';
  document.getElementById('tt-bar').style.background = col;

  const running = isRunning(node);
  if (running) {
    const secsLeft = getRunRemaining(node);
    const m = Math.floor(secsLeft/60), s = secsLeft % 60;
    const timeStr = m > 0 ? `${m}m ${String(s).padStart(2,'0')}s` : `${secsLeft}s`;
    document.getElementById('tt-wait').textContent = `▶ BERJALAN — selesai ~${timeStr}`;
    document.getElementById('tt-wait').style.color = '#fbbf24';
  } else {
    document.getElementById('tt-wait').textContent = isWT
      ? (q >= node.cap ? '⛔ PENUH' : `Sisa slot: ${node.cap - q}`)
      : getWait(q, node);
    document.getElementById('tt-wait').style.color = '';
  }
  document.getElementById('tt-cap').textContent     = node.cap > 0 ? `Kapasitas: ${node.cap}` : '—';

  const sp = document.getElementById('tt-status');
  const statusLabel = running ? 'SEDANG BERJALAN' : (isWT ? (WT_LBL[st] || '—') : (LBL[st] || '—'));
  const statusCol   = running ? '#fbbf24' : col;
  sp.textContent = statusLabel;
  sp.style.borderColor = statusCol;
  sp.style.color       = statusCol;

  // Extra info
  document.getElementById('tt-open').textContent  = node.open  || '—';
  document.getElementById('tt-close').textContent = node.close || '—';
  document.getElementById('tt-height').textContent= node.minHeight || '—';
  document.getElementById('tt-type').textContent  = node.jenis  || '—';
  document.getElementById('tt-duration').textContent = node.durasi || '—';
  const ftEl = document.getElementById('tt-ft');
  if (node.fastTrack) {
    ftEl.textContent = '⚡ YA';
    ftEl.className = 'tt-info-val tt-ft-yes';
  } else {
    ftEl.textContent = '✕ TIDAK';
    ftEl.className = 'tt-info-val tt-ft-no';
  }
}

function positionTooltip(clientX, clientY) {
  const wrap = document.getElementById('map-wrap');
  const rect = wrap.getBoundingClientRect();
  const ttW  = tooltip.offsetWidth  || 200;
  const ttH  = tooltip.offsetHeight || 170;
  let lx = clientX - rect.left + 18;
  let ly = clientY - rect.top  - ttH/2;
  if (lx + ttW > rect.width  - 8) lx = clientX - rect.left - ttW - 10;
  if (ly < 4) ly = 4;
  if (ly + ttH > rect.height - 4) ly = rect.height - ttH - 4;
  tooltip.style.left = lx + 'px';
  tooltip.style.top  = ly + 'px';
}

canvas.addEventListener('mousemove', e => {
  const idx = hitTest(e.clientX, e.clientY);
  if (idx !== hoveredIdx) {
    hoveredIdx = idx;
    if (idx >= 0) { updateTooltip(idx); tooltip.classList.add('show'); }
    else tooltip.classList.remove('show');
  }
  if (idx >= 0) positionTooltip(e.clientX, e.clientY);
});
canvas.addEventListener('mouseleave', () => { tooltip.classList.remove('show'); hoveredIdx = -1; });
canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  const t = e.touches[0];
  const idx = hitTest(t.clientX, t.clientY);
  if (idx >= 0) { hoveredIdx = idx; updateTooltip(idx); tooltip.classList.add('show'); positionTooltip(t.clientX, t.clientY); }
  else { tooltip.classList.remove('show'); hoveredIdx = -1; }
}, {passive:false});

/* =================================================================
   STATS
================================================================= */
function updateStats() {
  let total=0,low=0,med=0,high=0;
  NODES.forEach(n => {
    if (!n.queueId) return;
    const q=getQ(n), st=getStatus(q,n.cap);
    total+=q;
    if(st==='low')low++; else if(st==='medium')med++; else high++;
  });
  document.getElementById('s-total').textContent=total;
  document.getElementById('s-low').textContent=low;
  document.getElementById('s-med').textContent=med;
  document.getElementById('s-high').textContent=high;
}

/* =================================================================
   TOAST
================================================================= */
let toastTmr;
function showToast(type,icon,msg){
  const el=document.getElementById('toast');
  document.getElementById('t-icon').textContent=icon;
  document.getElementById('t-msg').textContent=msg;
  el.className=`toast ${type} show`;
  clearTimeout(toastTmr);toastTmr=setTimeout(()=>el.classList.remove('show'),3500);
}

/* =================================================================
   CLOCK
================================================================= */
setInterval(()=>{
  document.getElementById('topbar-time').textContent=
    new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
},1000);

/* =================================================================
   FIREBASE
================================================================= */
function initApp() {
  resize();
  window.addEventListener('resize', resize);

  window._fbListen('queue', val => {
    if (!val) return;
    qData = { ...qData, ...val };
    draw();
    updateStats();
    if (hoveredIdx >= 0) updateTooltip(hoveredIdx);
    document.getElementById('last-update-lbl').textContent=
      `⟳ UPDATE: ${new Date().toLocaleTimeString('id-ID')}`;
    showToast('success','🔥','Data antrian diperbarui dari Firebase');
  });

  window._fbListen('walkthrough', val => {
    if (!val) return;
    Object.keys(val).forEach(k => {
      wtData[k] = { in: val[k].in||0, out: val[k].out||0 };
    });
    draw();
    updateStats();
    if (hoveredIdx >= 0) updateTooltip(hoveredIdx);
    document.getElementById('last-update-lbl').textContent=
      `⟳ UPDATE: ${new Date().toLocaleTimeString('id-ID')}`;
  });

  window._fbListen('running', val => {
    runData = val || {};
    draw();
    if (hoveredIdx >= 0) updateTooltip(hoveredIdx);
    startAnimLoop();
  });

  startAnimLoop();
  updateStats();
  showToast('success','🔥','Terhubung ke Firebase — memuat data antrian...');
}

if (window._fbReady) initApp();
else document.addEventListener('firebase-ready', initApp, {once:true});