// Test script untuk debugging API
import fetch from 'node-fetch';

const API_URL = process.env.API_URL || 'https://careerpath-ai-4lqi.onrender.com';

async function testHealth() {
  console.log('🔍 Testing health endpoint...');
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    console.log('✅ Health check:', data);
    return data;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return null;
  }
}

async function testToken() {
  console.log('🔍 Testing token endpoint...');
  try {
    const response = await fetch(`${API_URL}/test-token`);
    const data = await response.json();
    console.log('✅ Token test:', data);
    return data;
  } catch (error) {
    console.error('❌ Token test failed:', error.message);
    return null;
  }
}

async function testRecommendation() {
  console.log('🔍 Testing recommendation endpoint...');
  try {
    const testData = {
      q1: 'Matematika',
      q2: 'Membaca buku dan menulis'
    };
    
    const response = await fetch(`${API_URL}/api/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Recommendation failed:', errorText);
      return { error: errorText, status: response.status };
    }
    
    const data = await response.json();
    console.log('✅ Recommendation success:', data);
    return data;
  } catch (error) {
    console.error('❌ Recommendation test failed:', error.message);
    return { error: error.message };
  }
}

async function runAllTests() {
  console.log('🚀 Starting API tests...\n');
  
  const health = await testHealth();
  console.log('');
  
  const token = await testToken();
  console.log('');
  
  const recommendation = await testRecommendation();
  console.log('');
  
  console.log('📋 Test Summary:');
  console.log('- Health check:', health ? '✅ PASS' : '❌ FAIL');
  console.log('- Token test:', token?.status === 'success' ? '✅ PASS' : '❌ FAIL');
  console.log('- Recommendation:', recommendation?.result ? '✅ PASS' : '❌ FAIL');
  
  if (token?.status === 'error') {
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if REPLICATE_API_TOKEN is set in Render environment variables');
    console.log('2. Verify the token is valid at https://replicate.com/account/api-tokens');
    console.log('3. Check if you have sufficient quota');
  }
}

// Run tests if this file is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  runAllTests();
}

export { testHealth, testToken, testRecommendation, runAllTests };
