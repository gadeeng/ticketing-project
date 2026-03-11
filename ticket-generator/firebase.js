/* ================================================================
   DUFAN — Firebase Realtime Database
   Config & shared helpers, di-import oleh script.js
================================================================ */

import { initializeApp }                    from 'https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js';
import { getDatabase, ref, set, get, onValue, remove } from 'https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js';

/* ── CONFIG ── */
const firebaseConfig = {
  apiKey:            'AIzaSyDZohweBiGofXFd2HD-VH5w3BsUc2zaFqc',
  authDomain:        'ticketing-project-3bcf6.firebaseapp.com',
  databaseURL:       'https://ticketing-project-3bcf6-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId:         'ticketing-project-3bcf6',
  storageBucket:     'ticketing-project-3bcf6.firebasestorage.app',
  messagingSenderId: '682939255204',
  appId:             '1:682939255204:web:65d2ba7efb2baf665c5931',
  measurementId:     'G-HME323VPJZ',
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

/* ── HELPERS ── */

/**
 * Tulis data ke path Firebase
 * @param {string} path   — e.g. 'tickets' atau 'queue'
 * @param {any}    data   — nilai yang akan disimpan (object / array / string)
 */
export async function fbSet(path, data) {
  await set(ref(db, path), data);
}

/**
 * Baca data sekali dari path Firebase
 * @param {string} path
 * @returns {any} nilai, atau null jika tidak ada
 */
export async function fbGet(path) {
  const snap = await get(ref(db, path));
  return snap.exists() ? snap.val() : null;
}

/**
 * Subscribe ke perubahan realtime
 * @param {string}   path
 * @param {function} callback — dipanggil setiap kali data berubah
 * @returns {function} unsubscribe function
 */
export function fbListen(path, callback) {
  const r = ref(db, path);
  const unsub = onValue(r, snap => callback(snap.exists() ? snap.val() : null));
  return unsub;
}

/**
 * Hapus node dari Firebase
 * @param {string} path
 */
export async function fbRemove(path) {
  await remove(ref(db, path));
}

export { db };