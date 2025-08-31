# ⚡ Quick Start Guide - CareerPath.AI

Panduan cepat untuk menjalankan CareerPath.AI dalam 5 menit!

## 🚀 Langkah Cepat

### 1. Setup Environment (2 menit)
```bash
cd frontend
cp env.example .env.local
```

Edit `.env.local` dan tambahkan Replicate API token:
```env
REPLICATE_API_TOKEN=r8_your_token_here
```

### 2. Install Dependencies (1 menit)
```bash
npm install
```

### 3. Run Development Server (1 menit)
```bash
npm run dev
```

### 4. Test API (1 menit)
```bash
npm run test:api
```

### 5. Buka Browser
```
http://localhost:3000
```

## 🔑 Dapatkan Replicate API Token

1. Buka [replicate.com](https://replicate.com)
2. Sign up / Login
3. Buka [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
4. Klik "Create API token"
5. Copy token (format: `r8_xxxxxxxxxxxxxxxxxxxxxxxx`)

## 🧪 Testing

### Test API Endpoint
```bash
npm run test:api
```

### Test Manual
1. Buka http://localhost:3000
2. Isi form dengan data test:
   - Mata pelajaran favorit: "Matematika"
   - Hobi: "Menulis dan membaca"
3. Klik "Dapatkan Rekomendasi"

## 🚀 Deploy ke Vercel

### Metode Cepat
1. Push ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import repository
4. Set environment variable: `REPLICATE_API_TOKEN`
5. Deploy!

### Detail lengkap lihat: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🐛 Troubleshooting

### Error: "Replicate API token is not configured"
- Pastikan `.env.local` sudah dibuat
- Restart development server

### Error: "Authentication failed"
- Periksa API token di Replicate dashboard
- Generate token baru jika perlu

### Error: "Module not found"
- Jalankan `npm install`
- Restart development server

## 📞 Butuh Bantuan?

- 📖 Dokumentasi lengkap: [README.md](./frontend/README.md)
- 🚀 Panduan deployment: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 Troubleshooting: Lihat section troubleshooting di README

---

**🎉 Selamat! Aplikasi CareerPath.AI Anda sudah siap digunakan!**
