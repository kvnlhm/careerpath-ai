// Script untuk memverifikasi token Replicate
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value && !key.startsWith('#')) {
        process.env[key.trim()] = value.trim();
      }
    });
  }
}

async function verifyToken() {
  console.log('🔍 Verifying Replicate API Token...\n');

  // Load environment variables
  loadEnv();

  // Check if token is set
  const token = process.env.REPLICATE_API_TOKEN;
  
  if (!token) {
    console.log('❌ REPLICATE_API_TOKEN tidak ditemukan');
    console.log('💡 Pastikan file .env.local ada dan berisi token valid');
    return;
  }

  if (token === 'your_replicate_api_token_here') {
    console.log('❌ Token masih menggunakan placeholder');
    console.log('💡 Update file .env.local dengan token Replicate yang sebenarnya');
    return;
  }

  if (!token.startsWith('r8_')) {
    console.log('❌ Format token tidak valid');
    console.log('💡 Token harus dimulai dengan "r8_"');
    return;
  }

  console.log('✅ Token format valid');
  console.log('🔑 Token:', token.substring(0, 10) + '...');

  // Test token with Replicate API
  try {
    console.log('\n🧪 Testing token dengan Replicate API...');
    
    const response = await fetch('https://api.replicate.com/v1/models', {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('✅ Token valid! API call berhasil');
      console.log('🎉 Anda siap menggunakan CareerPath.AI');
    } else {
      console.log('❌ Token tidak valid atau expired');
      console.log('💡 Generate token baru di replicate.com/account/api-tokens');
    }

  } catch (error) {
    console.log('❌ Error testing token:', error.message);
  }
}

// Run verification
verifyToken();
