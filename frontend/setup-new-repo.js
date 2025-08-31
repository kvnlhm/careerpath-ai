// Script untuk setup repository baru CareerPath.AI
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🆕 Setup Repository Baru untuk CareerPath.AI\n');

// Function to create new README
function createNewREADME() {
  const readmeContent = `# CareerPath.AI

AI-powered career guidance application that provides personalized recommendations for university majors and career paths using advanced AI models.

## 🚀 Live Demo

[Your Vercel URL will be here after deployment]

## ✨ Features

- 🤖 **AI-Powered Recommendations**: Uses Replicate AI for accurate career guidance
- 🎨 **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- ⚡ **Real-time Processing**: Instant AI analysis and recommendations
- 📱 **Mobile Responsive**: Optimized for all devices
- 🌍 **Global CDN**: Fast loading worldwide via Vercel

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS
- **AI Model**: Replicate (IBM Granite 3.3 8B Instruct)
- **Deployment**: Vercel
- **Language**: JavaScript/Node.js

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Replicate API token

### Installation

1. **Clone repository**
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/careerpath-ai-app.git
   cd careerpath-ai-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Setup environment variables**
   \`\`\`bash
   cp env.example .env.local
   # Edit .env.local and add your REPLICATE_API_TOKEN
   \`\`\`

4. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## 🧪 Testing

\`\`\`bash
# Test API
npm run test:simple

# Verify token
npm run verify:token

# Test full functionality
npm run test:api
\`\`\`

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
2. **Import to Vercel**
3. **Set environment variables**
4. **Deploy!**

Detailed guide: [DEPLOY_NOW.md](DEPLOY_NOW.md)

## 📖 Documentation

- [🚀 Deployment Guide](DEPLOY_NOW.md) - Complete deployment instructions
- [⚡ Quick Start](QUICK_START.md) - Get started in 5 minutes
- [🔧 Troubleshooting](TROUBLESHOOTING.md) - Common issues and solutions
- [🔑 Token Setup](SETUP_TOKEN.md) - Replicate API token configuration

## 🎯 How It Works

1. **User Input**: User provides favorite subjects and hobbies
2. **AI Analysis**: Replicate AI analyzes the input using advanced language models
3. **Smart Recommendations**: AI generates personalized career and major recommendations
4. **Structured Output**: Results are formatted for easy reading and understanding

## 🔒 Security

- Environment variables for sensitive data
- No hardcoded credentials
- Secure API token handling
- Input validation and sanitization

## 📊 Performance

- ⚡ Fast loading (< 3 seconds)
- 🌍 Global CDN distribution
- 📱 Mobile-optimized
- 🔄 Real-time AI processing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Replicate](https://replicate.com) for AI model hosting
- [Vercel](https://vercel.com) for deployment platform
- [Next.js](https://nextjs.org) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for beautiful styling

## 📞 Support

- 📧 Create an issue on GitHub
- 🐛 Check [Troubleshooting Guide](TROUBLESHOOTING.md)
- 📖 Read the documentation

---

**🎉 CareerPath.AI - Empowering students with AI-driven career guidance!**

Made with ❤️ using Next.js, React, and Replicate AI
`;

  fs.writeFileSync('README.md', readmeContent);
  console.log('✅ README.md created successfully');
}

// Function to setup new repository
async function setupNewRepo() {
  try {
    console.log('📋 Setting up new repository...\n');

    // Get GitHub username
    rl.question('🔗 Masukkan GitHub username Anda: ', async (username) => {
      const repoName = 'careerpath-ai-app';
      const repoUrl = `https://github.com/${username}/${repoName}`;

      console.log('\n📋 Repository yang akan dibuat:');
      console.log(`🌐 URL: ${repoUrl}`);
      console.log(`📁 Name: ${repoName}`);
      console.log(`👤 Username: ${username}\n`);

      rl.question('✅ Lanjutkan? (y/n): ', async (answer) => {
        if (answer.toLowerCase() !== 'y') {
          console.log('❌ Setup dibatalkan');
          rl.close();
          return;
        }

        console.log('\n🚀 Memulai setup repository baru...\n');

        // Create new README
        createNewREADME();

        // Initialize git
        console.log('📁 Initializing git repository...');
        execSync('git init', { stdio: 'inherit' });

        // Add all files
        console.log('📝 Adding files to git...');
        execSync('git add .', { stdio: 'inherit' });

        // Initial commit
        console.log('💾 Creating initial commit...');
        execSync('git commit -m "🚀 Initial commit - CareerPath.AI ready for deployment"', { stdio: 'inherit' });

        // Add remote origin
        console.log('🔗 Adding remote origin...');
        execSync(`git remote add origin ${repoUrl}.git`, { stdio: 'inherit' });

        // Push to GitHub
        console.log('📤 Pushing to GitHub...');
        execSync('git push -u origin main', { stdio: 'inherit' });

        console.log('\n🎉 Repository baru berhasil dibuat!');
        console.log(`🌐 URL: ${repoUrl}`);
        console.log('\n📋 Langkah selanjutnya:');
        console.log('1. Buka Vercel Dashboard');
        console.log('2. Import repository baru');
        console.log('3. Set environment variables');
        console.log('4. Deploy!');
        console.log('\n📖 Lihat panduan lengkap di DEPLOY_NOW.md');

        rl.close();
      });
    });

  } catch (error) {
    console.log('❌ Error:', error.message);
    rl.close();
  }
}

// Run setup
setupNewRepo();
