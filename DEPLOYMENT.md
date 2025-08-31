# 🚀 Panduan Deployment CareerPath.AI

Panduan lengkap untuk mendeploy aplikasi CareerPath.AI ke Vercel.

## 📋 Checklist Sebelum Deployment

- [ ] Code sudah di-push ke GitHub
- [ ] Replicate API token sudah siap
- [ ] Akun Vercel sudah dibuat
- [ ] Environment variables sudah disiapkan

## 🔑 Setup Replicate API

### 1. Daftar di Replicate
1. Buka [replicate.com](https://replicate.com)
2. Klik "Sign Up" dan buat akun baru
3. Verifikasi email Anda

### 2. Generate API Token
1. Login ke Replicate
2. Buka [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
3. Klik "Create API token"
4. Beri nama token (misal: "careerpath-ai")
5. Copy token yang dihasilkan (akan terlihat seperti: `r8_xxxxxxxxxxxxxxxxxxxxxxxx`)

### 3. Test API Token
```bash
curl -s -X POST \
  -H "Authorization: Token r8_YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "Hello, test"}}' \
  https://api.replicate.com/v1/predictions
```

## 🚀 Deployment ke Vercel

### Metode 1: Via Vercel Dashboard (Recommended)

#### Step 1: Push Code ke GitHub
```bash
# Di folder frontend
git add .
git commit -m "Initial commit - CareerPath.AI ready for deployment"
git push origin main
```

#### Step 2: Deploy di Vercel
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub account
3. Klik "New Project"
4. Import repository GitHub Anda
5. Konfigurasi project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend` (jika repo ada di subfolder)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
6. Klik "Deploy"

#### Step 3: Set Environment Variables
1. Setelah deploy selesai, buka project di Vercel dashboard
2. Buka tab "Settings"
3. Klik "Environment Variables"
4. Tambahkan variable:
   - **Name**: `REPLICATE_API_TOKEN`
   - **Value**: Token Replicate Anda (r8_xxxxxxxxxxxxxxxxxxxxxxxx)
   - **Environment**: Production, Preview, Development
5. Klik "Save"
6. Redeploy project (klik "Redeploy" di tab "Deployments")

### Metode 2: Via Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login ke Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
# Di folder frontend
vercel
```

#### Step 4: Set Environment Variables
```bash
vercel env add REPLICATE_API_TOKEN
# Masukkan token Replicate Anda ketika diminta
```

#### Step 5: Deploy ke Production
```bash
vercel --prod
```

## 🔧 Konfigurasi Post-Deployment

### 1. Custom Domain (Optional)
1. Di Vercel dashboard, buka project
2. Buka tab "Settings" → "Domains"
3. Tambahkan custom domain Anda
4. Update DNS records sesuai instruksi Vercel

### 2. Environment Variables untuk Preview
1. Di Vercel dashboard, buka "Settings" → "Environment Variables"
2. Pastikan `REPLICATE_API_TOKEN` sudah diset untuk semua environment

### 3. Monitoring Setup
1. Aktifkan Vercel Analytics (gratis)
2. Setup error monitoring (opsional)

## 🧪 Testing Deployment

### 1. Test API Endpoint
```bash
curl -X POST https://your-app.vercel.app/api/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "q1": "Matematika",
    "q2": "Menulis dan membaca"
  }'
```

### 2. Test Frontend
1. Buka URL aplikasi Anda
2. Isi form dengan data test
3. Klik "Dapatkan Rekomendasi"
4. Pastikan response muncul dengan benar

## 🐛 Troubleshooting

### Error: "Replicate API token is not configured"
**Solusi:**
1. Periksa environment variables di Vercel dashboard
2. Pastikan variable name tepat: `REPLICATE_API_TOKEN`
3. Redeploy aplikasi setelah menambah environment variable

### Error: "Authentication failed"
**Solusi:**
1. Periksa apakah API token valid
2. Test token di Replicate dashboard
3. Generate token baru jika perlu

### Error: "Build failed"
**Solusi:**
1. Periksa log build di Vercel dashboard
2. Pastikan semua dependencies terinstall
3. Periksa syntax error di code

### Error: "Function timeout"
**Solusi:**
1. File `vercel.json` sudah dikonfigurasi dengan `maxDuration: 30`
2. Jika masih timeout, pertimbangkan menggunakan model yang lebih cepat

## 📊 Monitoring & Analytics

### Vercel Analytics
1. Buka Vercel dashboard
2. Pilih project Anda
3. Buka tab "Analytics"
4. Monitor:
   - Page views
   - Performance metrics
   - Error rates

### Replicate Usage
1. Buka [replicate.com/account/usage](https://replicate.com/account/usage)
2. Monitor:
   - API calls
   - Cost per request
   - Rate limits

## 🔒 Security Best Practices

1. **Environment Variables**: Jangan pernah commit API token ke repository
2. **Rate Limiting**: Replicate sudah menerapkan rate limiting
3. **Input Validation**: API sudah memvalidasi input
4. **Error Handling**: Error messages tidak expose sensitive information

## 📈 Scaling Considerations

### Untuk Traffic Tinggi
1. **CDN**: Vercel sudah menyediakan CDN global
2. **Caching**: Pertimbangkan caching untuk response yang sama
3. **Rate Limiting**: Monitor usage di Replicate dashboard
4. **Cost Optimization**: Pilih model yang sesuai dengan budget

### Performance Optimization
1. **Image Optimization**: Next.js sudah mengoptimalkan images
2. **Code Splitting**: Next.js otomatis melakukan code splitting
3. **Static Generation**: Pertimbangkan static generation untuk halaman yang tidak dinamis

## 🎯 Next Steps

Setelah deployment berhasil:

1. **SEO Optimization**
   - Tambahkan meta tags
   - Setup sitemap
   - Register di Google Search Console

2. **Analytics Integration**
   - Setup Google Analytics
   - Setup conversion tracking

3. **Feature Enhancements**
   - Tambahkan user authentication
   - Implementasi database untuk menyimpan history
   - Tambahkan social sharing

4. **Marketing**
   - Share di social media
   - Submit ke product hunt
   - Outreach ke target audience

---

## 📞 Support

Jika mengalami masalah:

1. **Vercel Support**: [vercel.com/support](https://vercel.com/support)
2. **Replicate Support**: [replicate.com/support](https://replicate.com/support)
3. **GitHub Issues**: Buat issue di repository Anda

---

**🎉 Selamat! Aplikasi CareerPath.AI Anda sudah siap digunakan oleh ribuan pengguna!**
