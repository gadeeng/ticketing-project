# 🎢 DUFAN — Sistem Tiket Elektronik

> Sistem manajemen tiket elektronik untuk DUFAN Ancol — mencakup ticket generator, staff portal dengan QR scanner, dan peta wahana realtime berbasis Firebase.

**🌐 Live Demo:** [ticketingproject.vercel.app](https://ticketingproject.vercel.app)

---

## 📌 Deskripsi Project

DUFAN Ticketing System adalah platform back-office dan operasional yang dirancang untuk mendukung pengelolaan tiket pengunjung DUFAN Ancol secara digital. Sistem ini terdiri dari tiga modul utama: **Ticket Generator** untuk admin, **Staff Portal** untuk petugas di lapangan, dan **Live Map** untuk monitoring antrian wahana secara realtime.

Project ini merupakan satu ekosistem bersama [DUFAN Web Platform](https://projectdufan.vercel.app) — berbagi satu Firebase Realtime Database yang sama.

---

## ✨ Fitur Utama

### 🎟️ Ticket Generator (Admin)
- Generate tiket elektronik single maupun **batch** (hingga 50 tiket sekaligus)
- Dua tipe tiket: **Regular** (antrian normal) dan **Fast Track** (antrian prioritas)
- Input identitas pengunjung: nama, nomor HP, email, tanggal kunjungan
- Preview tiket sebelum disimpan
- **Export CSV** untuk keperluan laporan dan arsip
- Simpan tiket langsung ke Firebase Realtime Database
- Fitur print tiket & hapus semua tiket

### 📡 Staff Portal (Petugas Lapangan)
- Pilih wahana yang dijaga — terhubung langsung ke data antrian Firebase
- **Scan QR Code / Barcode** tiket via kamera perangkat (multi-device, mobile-friendly)
- Input manual nomor tiket sebagai alternatif
- Validasi tiket realtime: cek status valid/sudah dipakai/kadaluarsa/fast track
- Manajemen antrian wahana: tambah masuk, catat keluar
- Tombol **"Wahana Mulai"** dengan cooldown timer — update status `running` ke Firebase
- Halaman pintu keluar terpisah untuk mencatat pengunjung yang keluar wahana
- Log scan dengan riwayat aktivitas per sesi
- Statistik sesi: total scan, valid, ditolak, tiket tersimpan

### 🗺️ Peta Wahana Live
- Peta interaktif HTML Canvas dengan **32 node wahana** DUFAN
- Status antrian realtime tiap wahana (Normal / Ramai / Padat)
- Estimasi waktu tunggu berdasarkan kapasitas dan durasi
- Tooltip detail saat hover: jam buka/tutup, fast track, tinggi minimum, jenis, durasi
- Indikator wahana sedang berjalan dengan animasi spinning ring + countdown timer

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|---|---|
| **Frontend** | HTML5, CSS3 (Vanilla), JavaScript (ES6+ Modules) |
| **Rendering** | HTML Canvas API (peta interaktif) |
| **Backend / Database** | Firebase Realtime Database |
| **QR / Barcode Scanner** | Camera API + BarcodeDetector / fallback library |
| **Deployment** | Vercel |
| **Fonts** | Google Fonts — Fredoka One, Nunito, Space Mono |

---

## 📁 Struktur Project

```
ticketingproject/
├── index.html                      # Dashboard utama — menu 3 modul
├── map.html                        # Peta wahana realtime
├── staff.html                      # Staff portal — scan & kelola antrian
│
├── ticket-generator/
│   └── index.html                  # Admin ticket generator
│
└── js/ / css/                      # Asset per halaman
    ├── map.js                      # Logika canvas peta + Firebase listener
    ├── staff.js                    # Logika scan, validasi, antrian
    └── ticket-generator.js         # Logika generate, batch, export CSV
```

---

## 🔥 Firebase Structure

Sistem ini berbagi Firebase project yang sama dengan [DUFAN Web Platform](https://projectdufan.vercel.app). Berikut struktur node yang digunakan:

```
root/
├── tickets/
│   └── {ticketId}/
│       ├── name                    # Nama pengunjung
│       ├── phone                   # No. HP
│       ├── email
│       ├── visitDate               # Tanggal kunjungan (YYYY-MM-DD)
│       ├── type                    # "regular" | "fasttrack"
│       ├── status                  # "valid" | "used" | "expired"
│       ├── batch                   # Nomor batch generate
│       └── createdAt               # Timestamp pembuatan
│
├── queue/
│   └── {wahanaId}                  # Jumlah orang dalam antrian (integer)
│
├── walkthrough/
│   └── {wahanaId}/
│       ├── in                      # Total pengunjung masuk
│       └── out                     # Total pengunjung keluar
│
└── running/
    └── {wahanaId}/
        ├── until                   # Timestamp (ms) wahana selesai berjalan
        └── durasi                  # Durasi wahana (menit)
```

---

## 🖥️ Alur Penggunaan

```
[Admin]                    [Petugas]                  [Firebase]
   │                           │                           │
   ├─ Generate tiket ──────────┼───────── Simpan ─────────►│
   │  (single / batch)         │                           │
   │                           │◄──────── Listen ──────────┤
   │                           │                           │
   │                     Scan QR tiket                     │
   │                           ├─ Validasi tiket ─────────►│
   │                           │◄─ Status (valid/used) ────┤
   │                           │                           │
   │                     Tambah ke antrian                 │
   │                           ├─ Update queue ────────────►│
   │                           │                           │
   │                     Wahana mulai                      │
   │                           ├─ Set running.until ───────►│
   │                           │                           │
   │                     Catat keluar                      │
   │                           ├─ Update walkthrough.out ──►│
```

---

## 🚀 Cara Menjalankan Lokal

Project ini adalah static web — tidak memerlukan build step.

1. Clone repository:
   ```bash
   git clone https://github.com/username/ticketingproject.git
   cd ticketingproject
   ```

2. Jalankan dengan live server:
   ```bash
   npx serve .
   ```

3. Buka `http://localhost:3000` di browser.

> **Catatan:** Firebase config sudah tertanam di masing-masing HTML. Untuk deployment mandiri, ganti dengan Firebase project milikmu sendiri dan sesuaikan Security Rules agar hanya petugas yang berwenang dapat menulis data antrian.

---

## 🔗 Ekosistem Project

| Repository | URL | Deskripsi |
|---|---|---|
| **Ticketing System** | [ticketingproject.vercel.app](https://ticketingproject.vercel.app) | Repo ini — admin & staff tools |
| **Web Platform** | [projectdufan.vercel.app](https://projectdufan.vercel.app) | Frontend pengunjung — beli tiket & dashboard |

Kedua project menggunakan **satu Firebase project yang sama**, sehingga tiket yang dibeli pengunjung di Web Platform langsung terbaca oleh Staff Portal, dan status antrian yang diupdate petugas langsung tampil di Peta Live kedua platform.

---

## 👥 Tim

**Tim Sayang Lomba Sayangg** — © 2026