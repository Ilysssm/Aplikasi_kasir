# Kasir POS & Manajemen Operasional Kuliner

Aplikasi Web Point of Sale (POS) dan Manajemen Operasional Kuliner berbasis **Single-Page Application (SPA)** yang modern, responsif (Desktop, iPad/Tablet, dan Mobile), dan siap produksi.

---

## 🌟 Fitur Utama & Keunggulan

### 1. Desain & UI/UX Modern & Responsif
- **Antarmuka Bersih & Elegan:** Latar belakang lembut bergaya grouped surface (`#F2F2F7`), kartu Pure White (`#FFFFFF`) dengan border halus (`1px solid rgba(60, 60, 67, 0.08)`), serta aksen warna System Blue (`#007AFF`), Green (`#34C759`), Orange (`#FF9500`), dan Red (`#FF3B30`).
- **Komponen Intuitif:**
  - *Translucent Bar* dengan efek kaca buram (*glassmorphism*) yang modern.
  - **Segmented Control** untuk filter kategori, satuan, rentang waktu, dan pemilihan channel order.
  - **Inset Grouped List** dengan sudut melengkung halus (`rounded-2xl`).
  - Target sentuh optimal minimal `44x44px` dengan umpan balik sentuhan instan.
  - Notifikasi melayang (*Floating Toast*) dan dialog modal konfirmasi yang bersih tanpa pop-up browser yang kaku.
  - Efek audio haptic tap dan chime kasir sukses disintesis langsung via Web Audio API.

### 2. Prinsip Zero-Dependency & Handover Mandiri (BYOK)
- **Clean State (0 Item):** Saat pertama kali dijalankan, data Bahan Baku, Menu, dan Transaksi kosong (0 item) dengan tampilan status awal yang bersih dan tombol pintas. Disediakan tombol opsional *Muat Data Contoh Restoran* untuk pengujian instan.
- **Penyimpanan Lokal:** Secara default seluruh data tersimpan murni di `localStorage` browser perangkat kasir (100% offline, tanpa server luar).
- **Tab Pengaturan Sistem (Handover):**
  1. Input **Groq API Key (Gratis)** atau **Google Gemini API Key** mandiri untuk membaca foto struk via AI Vision.
  2. Input **Firebase Config JSON** opsional untuk sinkronisasi cloud Firestore jika diinginkan klien.
  3. **Export Database ke JSON** dan **Import/Restore dari JSON** untuk backup dan pindah perangkat kasir tanpa server.
  4. Pengaturan Nama Usaha & Catatan Kaki Struk Thermal.
  5. Fitur **Factory Reset** untuk mengosongkan kembali database.

### 3. Modul Stok Bahan Baku (Inventory)
- Pencatatan bahan baku baru dengan satuan terkecil (`gram`, `ml`, `pcs`), jumlah stok masuk, dan total harga beli.
- Otomatis menghitung **Harga Modal per Satuan Terkecil** (`Total Harga Beli / Stok Masuk`).
- Tabel inventaris dengan indikator sisa stok, status badge (*AMAN*, *MENIPIS*, *HABIS*), filter satuan, dan pencarian cepat.
- Fitur **+ Restock** dengan kalkulasi **Weighted Average Cost** (Rata-rata tertimbang modal baru & lama).
- Pengecekan aman saat menghapus bahan baku (peringatan jika bahan masih terpakai pada resep menu).

### 4. Modul Menu & Kalkulator Resep HPP (Bill of Materials)
- Input menu makanan/minuman dengan kategori dan harga jual konsumen (disamakan untuk Offline, GoFood, dan ShopeeFood).
- **Peracik Resep Dinamis (Dynamic BOM):** Menghubungkan bahan baku dari inventaris dan menentukan takaran pemakaian per 1 porsi.
- Kalkulasi **Estimasi HPP Real-time** dari total `(Takaran × Harga Modal per Satuan)`.
- Tampilan **Laba Kotor per Porsi** (`Harga Jual - HPP`) serta persentase margin laba (*Green/Orange/Red badge*).

### 5. Modul Kasir (POS) & Keranjang Konfirmasi
- Grid menu interaktif dengan filter kategori dan pencarian nama menu.
- Indikator ketersediaan porsi riil berdasarkan stok bahan baku gudang.
- Panel Keranjang Pesanan:
  - Pilihan Channel: `Offline`, `GoFood`, `ShopeeFood`.
  - Input `Nomor Order ID` (otomatis terisi untuk Offline `OFF-YYYYMMDD-XXXX`, atau sesuai struk GoFood/ShopeeFood).
  - Stepper kuantitas item, rincian HPP, dan total tagihan.
  - **Sistem Anti-Duplikasi Order ID:** Mencegah penyimpanan ganda jika Order ID sudah pernah tercatat sebelumnya.
  - Pengecekan kecukupan stok bahan baku sebelum checkout.
  - **Pengurangan Stok Otomatis:** Saat transaksi selesai, stok bahan baku langsung terpotong sesuai resep.
  - **Snapshot Modal & Harga:** Nilai HPP dan harga jual saat transaksi dikunci ke riwayat transaksi.
  - Cetak struk format printer thermal 80mm/58mm dan struk digital.

### 6. Modul 3 Alternatif Pembaca Struk Otomatis (Multi-Fallback AI)
Akses melalui tombol **"📷 Scan Struk GoFood / ShopeeFood"** di halaman Kasir dengan 3 mode pilihan:
1. **Mode 1: Groq AI Vision (Ultra Cepat & Gratis)**:
   Menggunakan model `llama-3.2-11b-vision-preview` dari Groq via API Key klien. Inferensi berjalan super cepat (~0.3 detik) dan mengekstrak nomor pesanan, platform, dan item dalam format JSON murni. (Tersedia opsi cadangan Google Gemini).
2. **Mode 2: OCR Browser / Tesseract.js (Upload Screenshot - 100% Gratis)**:
   Membaca teks gambar langsung di browser tanpa API key, mengekstrak nomor pesanan dan mencocokkan nama menu secara fuzzy.
3. **Mode 3: Smart Paste Teks (Instan)**:
   Kasir cukup menyalin teks order dari notifikasi merchant lalu sistem memetakan channel, Order ID, dan daftar menu.
- **Layar Preview & Konfirmasi:** Hasil ekstraksi tidak langsung memotong stok, melainkan ditampilkan di layar konfirmasi dengan dropdown pilihan menu agar kasir dapat memverifikasi atau menyesuaikan menu sebelum dimasukkan ke kasir.

### 7. Modul Laporan Penjualan & Fitur Void
- Ringkasan kartu metrik: **Total Omzet**, **Total Modal HPP**, **Laba Kotor Bersih**, dan **Total Transaksi**.
- Filter rentang waktu: *Hari Ini*, *7 Hari Terakhir*, *Bulan Ini*, *Semua Waktu*.
- Bar visual distribusi omzet per channel (Offline vs GoFood vs ShopeeFood).
- Tabel riwayat transaksi dengan tombol **Cetak Ulang Struk**.
- **Fitur Void (Pembatalan Transaksi):** Menandai transaksi batal dan **otomatis mengembalikan stok bahan baku** ke gudang inventaris sesuai takaran resep.

---

## 💼 PANDUAN LENGKAP SERAH TERIMA KE KLIEN (HANDOVER GUIDE)

Agar demo ini dapat segera beroperasi di tempat usaha klien (kafe, resto, atau kedai), Anda dapat memilih salah satu dari 3 metode penyerahan berikut:

### METODE 1: Deploy Online 1-Klik Gratis (Paling Direkomendasikan untuk iPad & Tablet)
Metode ini memungkinkan klien membuka aplikasi langsung dari browser iPad/Tablet/HP mereka tanpa perlu instalasi apa pun:
1. Buka layanan gratis seperti **[Netlify Drop](https://app.netlify.com/drop)** atau **Vercel**.
2. Tarik (*drag-and-drop*) folder proyek `Kasir POS` ini ke Netlify Drop.
3. Anda langsung mendapatkan tautan publik gratis, misalnya: `https://kasir-kuliner-klien.netlify.app`.
4. **Jadikan Aplikasi Layar Utama (PWA) di iPad/Tablet Klien:**
   - Buka tautan tersebut di browser Safari iPad atau Chrome Android di meja kasir.
   - Di Safari: Tekan tombol **Share (Bagikan)** ➡️ pilih **"Add to Home Screen" (Tambahkan ke Layar Utama)**.
   - Ikon aplikasi POS akan muncul di layar tablet dan saat dibuka akan berjalan **layar penuh (Full Screen)** layaknya aplikasi native kasir!

### METODE 2: Paket Offline Mandiri (USB / File ZIP)
Jika klien ingin aplikasi beroperasi 100% offline di laptop kasir tanpa koneksi internet luar:
1. Kompres seluruh folder `Kasir POS` menjadi file ZIP: `Kasir-POS-Kuliner.zip`.
2. Kirimkan file ZIP tersebut via Flashdisk atau email ke klien.
3. Di laptop klien: ekstrak file ZIP, lalu klien cukup **klik ganda (double click) file `index.html`** di Google Chrome atau browser bawaan mereka.
4. Aplikasi langsung berjalan murni di browser kasir dengan database tersimpan di komputer kasir.

### METODE 3: Berjalan di Jaringan Lokal WiFi Kafe
Jika klien memiliki 1 laptop server di kasir dan beberapa pelayan menggunakan HP/tablet:
1. Di laptop kasir, jalankan perintah:
   ```bash
   node server.js
   # atau:
   python3 -m http.server 3000
   ```
2. Cek IP lokal laptop kasir (misalnya `192.168.1.50`).
3. Seluruh tablet atau smartphone di kedai yang terhubung ke WiFi yang sama dapat mengakses POS melalui:
   👉 `http://192.168.1.50:3000`

---

## 🔑 Langkah Persiapan Pertama Klien di Lokasi

Setelah klien membuka aplikasi untuk pertama kalinya:
1. **Buka Tab "Pengaturan":**
   - **Nama Toko:** Masukkan nama kedai/resto klien (misal: "Kopi Kenangan Senja").
   - **Catatan Kaki Struk:** Masukkan pesan struk thermal (misal: "Terima kasih telah berkunjung!").
   - **Groq API Key (Opsional untuk AI Struk):**
     - Klien dapat mendaftar gratis di [console.groq.com/keys](https://console.groq.com/keys).
     - Buat API key baru (`gsk_...`) dan tempelkan di kolom Groq API Key lalu tekan **Simpan**.
     - Tekan **"Test Koneksi Groq"** untuk memastikan status aktif.
2. **Isi Bahan Baku & Resep:**
   - Klien dapat menekan tombol **"Muat Data Contoh Restoran"** di tab Bahan Baku jika ingin langsung mencoba demo transaksi, atau mulai menginput bahan baku riil mereka.
3. **Pencadangan Rutin:**
   - Ingatkan klien untuk rutin menekan tombol **"Unduh File Backup (.json)"** di menu Pengaturan setiap akhir bulan untuk mengamankan data penjualan mereka.

---

## 📁 Struktur Berkas

```
Kasir POS/
├── index.html                 # Halaman utama aplikasi SPA
├── package.json               # Konfigurasi npm & skrip start
├── server.js                  # Zero-dependency local server
├── css/
│   └── styles.css             # Desain token, typography, glassmorphism, print CSS
├── js/
│   ├── app.js                 # Inisialisasi aplikasi & navigasi tab
│   ├── storage.js             # Penyimpanan LocalStorage, BYOK Groq/Gemini, Export/Import
│   ├── modules/
│   │   ├── inventory.js       # Modul A: Stok Bahan Baku & Restock Weighted Average
│   │   ├── menu.js            # Modul B: Menu & Peracik Resep Dinamis HPP (BOM)
│   │   ├── cashier.js         # Modul C: Kasir POS, Anti-Duplikasi & Potong Stok
│   │   ├── receiptReader.js   # Modul D: 3 Mode Ekstraksi Struk (Groq AI, Tesseract, Paste)
│   │   ├── reports.js         # Modul E: Laporan Penjualan & Fitur Void Kembalikan Stok
│   │   └── settings.js        # Handover: BYOK Groq Key, Firebase, Backup/Restore
│   └── utils/
│       ├── audio.js           # Sintesis efek suara haptic via Web Audio API
│       ├── helpers.js         # Format Rupiah, tanggal, ID generator, Sorensen-Dice fuzzy match
│       ├── modal.js           # Sheet Modal, Alert Dialog, Floating Toast
│       └── print.js           # Format cetak struk kasir thermal 80mm/58mm
└── tests/
    └── test_suite.js          # Pengujian unit kalkulasi HPP, restok, void, dan anti-duplikasi
```
