// Script untuk deployment otomatis ke Vercel
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Deploying CareerPath.AI to Vercel...\n');

// Check if Vercel CLI is installed
function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

// Check if user is logged in to Vercel
function checkVercelLogin() {
  try {
    execSync('vercel whoami', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

// Main deployment function
async function deploy() {
  console.log('📋 Checking prerequisites...\n');

  // Check Vercel CLI
  if (!checkVercelCLI()) {
    console.log('❌ Vercel CLI tidak terinstall');
    console.log('💡 Install dengan: npm install -g vercel');
    console.log('💡 Atau gunakan Vercel Dashboard: https://vercel.com');
    return;
  }

  // Check login status
  if (!checkVercelLogin()) {
    console.log('❌ Belum login ke Vercel');
    console.log('💡 Login dengan: vercel login');
    console.log('💡 Atau gunakan Vercel Dashboard: https://vercel.com');
    return;
  }

  // Check environment variables
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.log('❌ File .env.local tidak ditemukan');
    console.log('💡 Setup environment variables terlebih dahulu');
    return;
  }

  console.log('✅ Prerequisites check passed!\n');

  // Deploy to Vercel
  try {
    console.log('🚀 Starting deployment...');
    console.log('📝 Note: Pastikan REPLICATE_API_TOKEN sudah diset di Vercel dashboard\n');
    
    // Run vercel deploy
    execSync('vercel --prod', { stdio: 'inherit' });
    
    console.log('\n🎉 Deployment completed successfully!');
    console.log('🌐 Your app is now live and accessible to thousands of users!');
    
  } catch (error) {
    console.log('❌ Deployment failed');
    console.log('💡 Error:', error.message);
    console.log('\n📖 Alternative: Use Vercel Dashboard');
    console.log('🌐 https://vercel.com/new');
  }
}

// Run deployment
deploy();
