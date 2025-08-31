# 🔧 Troubleshooting Guide - CareerPath.AI

Panduan untuk mengatasi masalah yang sering terjadi pada aplikasi CareerPath.AI.

## 🚨 Error: "replicate__WEBPACK_IMPORTED_MODULE_0___default(...).run is not a function"

### Penyebab
Error ini terjadi karena masalah dengan import `replicate` di Next.js API routes.

### Solusi
1. **Restart development server**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Clear Next.js cache**
   ```bash
   # Hapus folder .next
   rm -rf .next
   # Atau di Windows:
   rmdir /s .next
   
   # Restart server
   npm run dev
   ```

3. **Reinstall dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Check environment variables**
   ```bash
   # Pastikan .env.local ada dan berisi:
   REPLICATE_API_TOKEN=your_token_here
   ```

## 🚨 Error: "Replicate API token is not configured"

### Penyebab
Environment variable `REPLICATE_API_TOKEN` tidak ditemukan.

### Solusi
1. **Buat file .env.local**
   ```bash
   cp env.example .env.local
   ```

2. **Edit .env.local**
   ```env
   REPLICATE_API_TOKEN=r8_your_actual_token_here
   ```

3. **Restart development server**
   ```bash
   npm run dev
   ```

## 🚨 Error: "Authentication failed"

### Penyebab
API token Replicate tidak valid atau expired.

### Solusi
1. **Generate token baru**
   - Buka [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
   - Hapus token lama
   - Buat token baru
   - Update `.env.local`

2. **Verify token**
   ```bash
   curl -s -X POST \
     -H "Authorization: Token r8_YOUR_TOKEN_HERE" \
     -H "Content-Type: application/json" \
     -d '{"input": {"prompt": "Hello"}}' \
     https://api.replicate.com/v1/predictions
   ```

## 🚨 Error: "Module not found"

### Penyebab
Dependencies tidak terinstall dengan benar.

### Solusi
1. **Reinstall dependencies**
   ```bash
   npm install
   ```

2. **Check package.json**
   Pastikan `replicate` ada di dependencies:
   ```json
   {
     "dependencies": {
       "replicate": "^1.1.0"
     }
   }
   ```

## 🚨 Error: "Function timeout"

### Penyebab
API call ke Replicate memakan waktu terlalu lama.

### Solusi
1. **Check vercel.json**
   Pastikan `maxDuration` sudah diset:
   ```json
   {
     "functions": {
       "app/api/recommend/route.js": {
         "maxDuration": 30
       }
     }
   }
   ```

2. **Reduce model complexity**
   - Kurangi `max_tokens`
   - Gunakan model yang lebih cepat

## 🧪 Testing Steps

### 1. Test Environment Variables
```bash
# Di terminal, jalankan:
node -e "console.log('REPLICATE_API_TOKEN:', process.env.REPLICATE_API_TOKEN ? 'SET' : 'NOT SET')"
```

### 2. Test API Endpoint
```bash
npm run test:simple
```

### 3. Test Manual
1. Buka http://localhost:3000
2. Isi form dengan data test
3. Klik "Dapatkan Rekomendasi"

## 🔍 Debug Mode

### Enable verbose logging
Edit `app/api/recommend/route.js`:
```javascript
// Tambahkan di awal function
console.log('Environment check:', {
  hasToken: !!process.env.REPLICATE_API_TOKEN,
  tokenLength: process.env.REPLICATE_API_TOKEN?.length
});
```

### Check server logs
```bash
npm run dev
# Lihat output di terminal untuk error details
```

## 📋 Checklist Troubleshooting

- [ ] Development server berjalan (`npm run dev`)
- [ ] File `.env.local` ada dan berisi token valid
- [ ] Dependencies terinstall (`npm install`)
- [ ] Cache Next.js dibersihkan (hapus folder `.next`)
- [ ] API token Replicate valid dan aktif
- [ ] Tidak ada error di browser console
- [ ] Network request berhasil (check Network tab di DevTools)

## 🆘 Still Having Issues?

1. **Check GitHub Issues**
   - Lihat apakah ada issue serupa di repository

2. **Replicate Support**
   - Buka [replicate.com/support](https://replicate.com/support)

3. **Next.js Documentation**
   - Buka [nextjs.org/docs](https://nextjs.org/docs)

4. **Create Issue**
   - Buat issue baru dengan detail error lengkap

---

**💡 Tip**: Selalu restart development server setelah mengubah environment variables!
