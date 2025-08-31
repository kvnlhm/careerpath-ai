# Troubleshooting Guide - CareerPath.AI

## Error 500 pada POST /api/recommend

### Kemungkinan Penyebab dan Solusi:

#### 1. **REPLICATE_API_TOKEN tidak dikonfigurasi**
**Gejala:** Error 500 dengan pesan "API token not configured"

**Solusi:**
- Pastikan environment variable `REPLICATE_API_TOKEN` sudah diset di Render
- Buka dashboard Render → Service → Environment → Add Environment Variable
- Key: `REPLICATE_API_TOKEN`
- Value: Token API dari Replicate (dapatkan dari https://replicate.com/account/api-tokens)

#### 2. **Token API tidak valid atau expired**
**Gejala:** Error 401/403 dari Replicate API

**Solusi:**
- Periksa token di https://replicate.com/account/api-tokens
- Generate token baru jika diperlukan
- Update environment variable di Render

#### 3. **Quota API habis**
**Gejala:** Error "quota exceeded" atau "limit reached"

**Solusi:**
- Periksa usage di dashboard Replicate
- Upgrade plan jika diperlukan
- Tunggu reset quota (biasanya bulanan)

#### 4. **Network/Timeout Issues**
**Gejala:** Request timeout atau connection error

**Solusi:**
- Periksa log di Render dashboard
- Pastikan service berjalan dengan baik
- Coba restart service

### Cara Debug:

#### 1. **Test Token API**
```bash
curl https://your-app-name.onrender.com/test-token
```

#### 2. **Health Check**
```bash
curl https://your-app-name.onrender.com/health
```

#### 3. **Periksa Log di Render**
- Buka dashboard Render
- Pilih service
- Klik tab "Logs"
- Cari error messages

#### 4. **Test API Endpoint**
```bash
curl -X POST https://your-app-name.onrender.com/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"q1":"Matematika","q2":"Membaca buku"}'
```

### Environment Variables yang Diperlukan:

```bash
REPLICATE_API_TOKEN=your_token_here
RENDER=true
FLASK_ENV=production
```

### Local Development vs Production:

**Local:**
- Gunakan file `.env` di folder `backend/`
- Token disimpan di file `.env`

**Production (Render):**
- Token disimpan di Environment Variables di dashboard Render
- Tidak ada file `.env` di production

### Tips Tambahan:

1. **Selalu periksa log** sebelum melaporkan masalah
2. **Test token** menggunakan endpoint `/test-token`
3. **Restart service** setelah mengubah environment variables
4. **Monitor usage** di dashboard Replicate
