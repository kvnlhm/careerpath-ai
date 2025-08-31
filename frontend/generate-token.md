# 🔑 Generate Token Replicate Baru

Token Anda saat ini tidak valid atau expired. Ikuti langkah-langkah berikut untuk generate token baru.

## 🚨 Masalah Saat Ini

- Token: `r8_PjRsIVXS5VFs9DcOpa7Tyt0ZoMK5Jrx1NjkAl`
- Status: **Tidak valid atau expired**

## 📋 Langkah-langkah Generate Token Baru

### Step 1: Login ke Replicate
1. Buka [replicate.com](https://replicate.com)
2. Login dengan akun Anda
3. Pastikan akun sudah terverifikasi

### Step 2: Hapus Token Lama
1. Buka [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
2. Cari token `r8_PjRsIVXS5VFs9DcOpa7Tyt0ZoMK5Jrx1NjkAl`
3. Klik tombol "Delete" atau "Remove"
4. Konfirmasi penghapusan

### Step 3: Generate Token Baru
1. Klik "Create API token"
2. Beri nama: `careerpath-ai`
3. Klik "Create"
4. **Copy token yang dihasilkan** (format: `r8_xxxxxxxxxxxxxxxxxxxxxxxx`)

### Step 4: Update Environment Variables
1. Buka file `frontend/.env.local`
2. Ganti baris:
   ```env
   REPLICATE_API_TOKEN=r8_PjRsIVXS5VFs9DcOpa7Tyt0ZoMK5Jrx1NjkAl
   ```
   
   Dengan token baru:
   ```env
   REPLICATE_API_TOKEN=r8_your_new_token_here
   ```

3. Simpan file

### Step 5: Restart Development Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 6: Test Token Baru
```bash
npm run verify:token
npm run test:simple
```

## 🔍 Troubleshooting

### Jika token masih tidak valid:
1. **Check akun Replicate**
   - Pastikan akun sudah terverifikasi
   - Pastikan tidak ada pembatasan

2. **Check billing**
   - Buka [replicate.com/account/billing](https://replicate.com/account/billing)
   - Pastikan ada kredit atau payment method

3. **Generate token dengan nama berbeda**
   - Coba nama: `careerpath-ai-dev`
   - Atau: `careerpath-ai-test`

### Jika masih error:
1. **Contact Replicate Support**
   - Buka [replicate.com/support](https://replicate.com/support)
   - Jelaskan masalah Anda

2. **Check Replicate Status**
   - Buka [status.replicate.com](https://status.replicate.com)
   - Pastikan tidak ada maintenance

## 🧪 Testing Commands

```bash
# Verify token
npm run verify:token

# Test API
npm run test:simple

# Test manual
# Buka http://localhost:3000
```

## 📞 Support

Jika masih mengalami masalah:
- **Replicate Support**: [replicate.com/support](https://replicate.com/support)
- **Documentation**: [replicate.com/docs](https://replicate.com/docs)

---

**💡 Tip**: Setelah generate token baru, selalu test dengan `npm run verify:token` sebelum menggunakan aplikasi!
