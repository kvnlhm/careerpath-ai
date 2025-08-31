// Script untuk setup environment variables
import fs from 'fs';
import path from 'path';

console.log('🔧 Setup Environment Variables untuk CareerPath.AI\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('📁 File .env.local ditemukan');
  
  // Read current content
  const currentContent = fs.readFileSync(envPath, 'utf8');
  
  // Check if token is still placeholder
  if (currentContent.includes('your_replicate_api_token_here')) {
    console.log('⚠️  Token masih menggunakan placeholder!');
    console.log('\n📋 Langkah-langkah untuk memperbaiki:');
    console.log('1. Buka file .env.local di editor');
    console.log('2. Ganti "your_replicate_api_token_here" dengan token Replicate Anda');
    console.log('3. Format token: r8_xxxxxxxxxxxxxxxxxxxxxxxx');
    console.log('4. Simpan file');
    console.log('5. Restart development server (npm run dev)');
    
    console.log('\n🔑 Cara mendapatkan token Replicate:');
    console.log('1. Buka https://replicate.com/account/api-tokens');
    console.log('2. Login ke akun Replicate Anda');
    console.log('3. Klik "Create API token"');
    console.log('4. Copy token yang dihasilkan');
    
  } else {
    console.log('✅ Token sudah dikonfigurasi');
    console.log('💡 Jika masih error, pastikan token valid di Replicate dashboard');
  }
  
} else {
  console.log('❌ File .env.local tidak ditemukan');
  console.log('\n📋 Langkah-langkah untuk membuat:');
  console.log('1. Copy env.example ke .env.local');
  console.log('2. Edit .env.local dan tambahkan token Replicate');
  console.log('3. Restart development server');
}

console.log('\n📖 Dokumentasi lengkap:');
console.log('- Quick Start: QUICK_START.md');
console.log('- Troubleshooting: TROUBLESHOOTING.md');
console.log('- Deployment: DEPLOYMENT.md');
