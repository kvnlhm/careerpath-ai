# 🔑 Setup Replicate API Token - CareerPath.AI

Panduan lengkap untuk mendapatkan dan mengkonfigurasi Replicate API token.

## 🚨 Masalah Saat Ini

Error `401 Unauthorized` terjadi karena:
- Token Replicate belum dikonfigurasi
- File `.env.local` masih berisi placeholder

## 📋 Langkah-langkah Setup

### Step 1: Daftar di Replicate (Jika belum)

1. **Buka [replicate.com](https://replicate.com)**
2. **Klik "Sign Up"**
3. **Buat akun baru dengan email Anda**
4. **Verifikasi email**

### Step 2: Generate API Token

1. **Login ke Replicate**
2. **Buka [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)**
3. **Klik "Create API token"**
4. **Beri nama token** (misal: "careerpath-ai")
5. **Copy token yang dihasilkan**

   Format token akan seperti ini:
   ```
   r8_xxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Step 3: Update Environment Variables

1. **Buka file `.env.local` di editor**
2. **Ganti baris ini:**
   ```env
   REPLICATE_API_TOKEN=your_replicate_api_token_here
   ```
   
   **Menjadi:**
   ```env
   REPLICATE_API_TOKEN=r8_your_actual_token_here
   ```

3. **Simpan file**

### Step 4: Restart Development Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 5: Test API

```bash
npm run test:simple
```

## 🧪 Verifikasi Setup

### Test 1: Check Environment Variable
```bash
node -e "console.log('Token set:', !!process.env.REPLICATE_API_TOKEN)"
```

### Test 2: Test API Endpoint
```bash
npm run test:simple
```

### Test 3: Test Manual
1. Buka http://localhost:3000
2. Isi form dengan data test
3. Klik "Dapatkan Rekomendasi"

## 🔍 Troubleshooting

### Error: "Token not found"
- Pastikan file `.env.local` ada di folder `frontend`
- Pastikan format token benar: `r8_xxxxxxxxxxxxxxxxxxxxxxxx`

### Error: "401 Unauthorized"
- Token tidak valid atau expired
- Generate token baru di Replicate dashboard
- Update `.env.local` dengan token baru

### Error: "Token format invalid"
- Token harus dimulai dengan `r8_`
- Pastikan tidak ada spasi atau karakter tambahan

## 📁 File Structure

```
frontend/
├── .env.local          # ← File ini harus berisi token valid
├── env.example         # Template file
├── setup-env.js        # Helper script
└── SETUP_TOKEN.md      # Panduan ini
```

## 🔒 Security Tips

- **Jangan commit token ke Git**
- **Jangan share token dengan orang lain**
- **Gunakan token yang berbeda untuk development dan production**

## 🆘 Butuh Bantuan?

1. **Replicate Documentation**: [replicate.com/docs](https://replicate.com/docs)
2. **Replicate Support**: [replicate.com/support](https://replicate.com/support)
3. **Check Troubleshooting Guide**: `TROUBLESHOOTING.md`

---

**💡 Tip**: Setelah mengupdate `.env.local`, selalu restart development server!
