# Balaghah Builder

Prototype media pembelajaran Ilmu Ma'ani untuk mahasiswa Pendidikan Bahasa Arab.

## Persyaratan
- Node.js versi LTS
- npm

## Menjalankan secara lokal
```bash
npm install
npm run dev
```

## Build untuk deployment
```bash
npm run build
npm run preview
```

## Supabase
Salin `.env.example` menjadi `.env`, lalu isi URL proyek dan publishable key dari Supabase.
Jangan pernah menambahkan service-role key atau rahasia backend ke frontend.

Saat ini Supabase client sudah disiapkan, tetapi login, pengaturan peran, database,
penilaian, dan penyimpanan nilai belum diimplementasikan. Halaman login masih berupa placeholder.

## Status materi
Daftar bab pada prototipe adalah kerangka awal, bukan materi akademik final.
Setiap materi, contoh Arab, dan kunci jawaban harus diverifikasi terhadap sumber akademik.
Tautan Dorar yang membahas أغراض التشبيه berkaitan dengan Ilmu Bayan, bukan sumber utama
untuk seluruh materi Ilmu Ma'ani.
