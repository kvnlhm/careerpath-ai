CareerPath AI
Aplikasi web bimbingan karier berbasis kecerdasan buatan (AI) yang dirancang untuk membantu pengguna menemukan jurusan dan jalur pekerjaan yang paling sesuai berdasarkan minat dan hobi mereka.

Fitur Utama
- Kuesioner Interaktif: Antarmuka pengguna yang bersih dan minimalis untuk mengumpulkan data tentang minat dan hobi pengguna.
- Rekomendasi Berbasis AI: Menggunakan model bahasa besar (LLM) untuk menganalisis input pengguna dan menghasilkan rekomendasi jurusan dan pekerjaan yang personal.
- Respons Cepat dan Akurat: API yang dioptimalkan untuk memberikan hasil rekomendasi dengan cepat.

Sruktur Proyek
Proyek ini memiliki arsitektur monorepo, di mana frontend dan backend berada dalam satu repositori untuk kemudahan pengelolaan dan pengumpulan.
/careerpath-ai
├── /frontend/
│   ├── ... (Kode Next.js)
│   └── .env.local
└── /backend/
    ├── ... (Kode Python/Flask)
    └── .env

Teknologi yang Digunakan
Frontend (/frontend)
- Next.js: Framework React untuk membangun antarmuka pengguna yang modern dan cepat.
- CSS Inline: Digunakan untuk styling.
- Tailwind CSS (opsional): Meskipun kode saat ini menggunakan CSS inline, proyek ini kompatibel dengan integrasi Tailwind CSS untuk pengembangan di masa depan.

Backend (/backend)
- Python: Bahasa pemrograman utama untuk logika server.
- Flask: Framework web mikro untuk membangun API yang ringan.
- Replicate API: Digunakan untuk mengakses dan menjalankan model AI IBM Granite 3.3-8B Instruct.
- Gunicorn: Server web WSGI untuk menjalankan aplikasi Flask.

Cara Menjalankan Aplikasi Secara Lokal
Ikuti langkah-langkah di bawah ini untuk mengoperasikan aplikasi di komputer Anda.

Prasyarat
Pastikan Anda telah menginstal yang berikut ini:
- Python 3.x
- Node.js dan npm

Langkah-langkah
1. Siapkan Lingkungan Backend
   - Buka terminal dan masuk ke folder backend:
     cd backend
     
   - Instal semua dependensi Python:
     pip install -r requirements.txt

   - Buat file .env di dalam folder backend dan tambahkan kunci API Replicate Anda:
     REPLICATE_API_TOKEN=[KUNCI_API_REPLICATE_ANDA]

   - Jalankan server backend:
     python app.py

   Server akan berjalan di http://localhost:5000.

2. Siapkan Lingkungan Frontend
   - Buka terminal baru dan masuk ke folder frontend:
     cd frontend

   - Instal semua dependensi Node.js:
     npm install

   - Buat file .env.local di dalam folder frontend dan tambahkan URL API backend:
     NEXT_PUBLIC_API_URL=http://localhost:5000

   - Jalankan server frontend:
     npm run dev
  
3. Akses Aplikasi
   - Buka peramban Anda dan kunjungi http://localhost:3000.
  
Deployment
Aplikasi ini di-deploy secara terpisah untuk frontend dan backend:
- Frontend: Vercel
- Backend: Render

