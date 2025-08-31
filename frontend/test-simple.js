// Simple test script untuk API CareerPath.AI
const testData = {
  q1: 'Sejarah',
  q2: 'Memancing'
};

async function testAPI() {
  console.log('🧪 Testing CareerPath.AI API...\n');
  console.log('📤 Test data:', testData);
  console.log('⏳ Sending request...\n');

  try {
    const response = await fetch('http://localhost:3000/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('📊 Response Status:', response.status);
    console.log('📋 Response Headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('📄 Raw Response:', responseText);

    if (!response.ok) {
      console.error('❌ Error Response:', responseText);
      return;
    }

    const data = JSON.parse(responseText);
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
