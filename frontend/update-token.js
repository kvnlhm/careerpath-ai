// Script untuk update token Replicate
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔑 Update Replicate API Token\n');

// Function to update token
function updateToken(newToken) {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ File .env.local tidak ditemukan');
    console.log('💡 Jalankan: cp env.example .env.local');
    return false;
  }

  // Read current content
  let content = fs.readFileSync(envPath, 'utf8');
  
  // Replace token
  const oldTokenRegex = /REPLICATE_API_TOKEN=r8_[^\s\n]+/;
  if (oldTokenRegex.test(content)) {
    content = content.replace(oldTokenRegex, `REPLICATE_API_TOKEN=${newToken}`);
  } else {
    // If no token found, add it
    content = content.replace(
      'REPLICATE_API_TOKEN=your_replicate_api_token_here',
      `REPLICATE_API_TOKEN=${newToken}`
    );
  }

  // Write back to file
  fs.writeFileSync(envPath, content);
  
  console.log('✅ Token berhasil diupdate!');
  console.log('🔑 Token baru:', newToken.substring(0, 10) + '...');
  console.log('💡 Restart development server: npm run dev');
  
  return true;
}

// Main function
async function main() {
  console.log('📋 Langkah-langkah:');
  console.log('1. Buka https://replicate.com/account/api-tokens');
  console.log('2. Generate token baru');
  console.log('3. Copy token (format: r8_xxxxxxxxxxxxxxxxxxxxxxxx)');
  console.log('4. Paste di bawah ini\n');

  rl.question('🔑 Masukkan token Replicate baru: ', (token) => {
    // Validate token format
    if (!token.startsWith('r8_')) {
      console.log('❌ Format token tidak valid!');
      console.log('💡 Token harus dimulai dengan "r8_"');
      rl.close();
      return;
    }

    // Update token
    const success = updateToken(token);
    
    if (success) {
      console.log('\n🧪 Test token baru:');
      console.log('npm run verify:token');
      console.log('npm run test:simple');
    }
    
    rl.close();
  });
}

// Run main function
main();
