// Test script untuk API CareerPath.AI secara lokal
import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000/api/recommend';

const testData = {
  q1: 'Matematika dan Fisika',
  q2: 'Menulis cerita, bermain video game, dan memecahkan puzzle'
};

async function testAPI() {
  console.log('🧪 Testing CareerPath.AI API...\n');
  console.log('📤 Sending request with data:', testData);
  console.log('🌐 API URL:', API_URL);
  console.log('⏳ Waiting for response...\n');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('📊 Response Status:', response.status);
    console.log('📋 Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error Response:', errorText);
      return;
    }

    const data = await response.json();
    console.log('✅ Success Response:');
    console.log('📄 Result:', data.result);
    console.log('\n🎉 API test completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure the development server is running (npm run dev)');
    console.log('2. Check if REPLICATE_API_TOKEN is set in .env.local');
    console.log('3. Verify the API endpoint is accessible');
  }
}

// Run the test
testAPI();
