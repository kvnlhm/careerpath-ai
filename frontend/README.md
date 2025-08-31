# CareerPath.AI - AI Career Guidance

Aplikasi web untuk memberikan rekomendasi jurusan kuliah dan karir berdasarkan kepribadian pengguna menggunakan AI model Replicate.

## 🚀 Fitur

- **AI-Powered Recommendations**: Menggunakan model AI Replicate untuk memberikan rekomendasi yang akurat
- **User-Friendly Interface**: UI yang modern dan responsif
- **Real-time Processing**: Analisis instan berdasarkan input pengguna
- **Mobile Responsive**: Optimal untuk desktop dan mobile

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS
- **AI Model**: Replicate (IBM Granite 3.3 8B Instruct)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- Replicate API token

## 🔧 Setup Lokal

1. **Clone repository**
   ```bash
   git clone <your-repo-url>
   cd careerpath-ai/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` dan tambahkan Replicate API token:
   ```env
   REPLICATE_API_TOKEN=your_replicate_api_token_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment di Vercel

### Metode 1: Deploy via Vercel Dashboard

1. **Push code ke GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy di Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Klik "New Project"
   - Import repository GitHub Anda
   - Set environment variables:
     - `REPLICATE_API_TOKEN`: Token Replicate Anda
   - Klik "Deploy"

### Metode 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login ke Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set environment variables**
   ```bash
   vercel env add REPLICATE_API_TOKEN
   ```

## 🔑 Setup Replicate API

1. **Daftar di Replicate**
   - Buka [replicate.com](https://replicate.com)
   - Buat akun baru
   - Verifikasi email

2. **Generate API Token**
   - Buka [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
   - Klik "Create API token"
   - Copy token yang dihasilkan

3. **Tambahkan ke Environment Variables**
   - Di Vercel: Project Settings → Environment Variables
   - Tambahkan `REPLICATE_API_TOKEN` dengan value token Anda

## 📁 Struktur Proyek

```
frontend/
├── app/
│   ├── api/
│   │   └── recommend/
│   │       └── route.js          # API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Main page
├── public/                       # Static assets
├── package.json                  # Dependencies
├── next.config.mjs              # Next.js config
├── vercel.json                  # Vercel config
└── env.example                  # Environment template
```

## 🔧 Konfigurasi

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REPLICATE_API_TOKEN` | Token untuk akses Replicate API | ✅ |

### Model Configuration

Aplikasi menggunakan model IBM Granite 3.3 8B Instruct yang dioptimalkan untuk:
- Analisis teks dalam bahasa Indonesia
- Rekomendasi karir dan pendidikan
- Response yang terstruktur dan informatif

## 🐛 Troubleshooting

### Error: "Replicate API token is not configured"
- Pastikan `REPLICATE_API_TOKEN` sudah diset di environment variables
- Restart development server setelah menambah environment variable

### Error: "Authentication failed"
- Periksa apakah API token valid
- Pastikan akun Replicate sudah terverifikasi

### Error: "Too many requests"
- Replicate memiliki rate limit
- Tunggu beberapa saat sebelum mencoba lagi

### Build Error di Vercel
- Pastikan semua dependencies terinstall
- Periksa log build di Vercel dashboard

## 📈 Monitoring

### Vercel Analytics
- Buka Vercel dashboard
- Pilih project
- Lihat tab "Analytics" untuk metrics

### API Monitoring
- Monitor API calls di Replicate dashboard
- Periksa usage dan billing

## 🔒 Security

- API token disimpan sebagai environment variable
- Tidak ada hardcoded credentials
- Rate limiting diterapkan oleh Replicate

## 📝 License

MIT License - lihat file LICENSE untuk detail

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📞 Support

Jika ada pertanyaan atau masalah:
- Buat issue di GitHub repository
- Hubungi tim development

---

**CareerPath.AI** - AI-powered career guidance for your future 🚀
