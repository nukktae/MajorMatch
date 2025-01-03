# MajorMatch AI 🎓✨

An intelligent career guidance platform that helps students discover their ideal academic path using AI-powered assessments, personalized mentorship, and interactive challenges.

![Project Demo](demo.gif)

## 🚀 Features

- **AI-Powered Assessments**: Leveraging GPT-4 for personalized major recommendations
- **Interactive Challenges**: Field-specific tasks to explore different careers
- **Mentor Matching**: Connect with professionals in your field of interest
- **Real-time Progress Tracking**: Monitor your journey with detailed analytics
- **Responsive Design**: Seamless experience across all devices

## 🛠️ Tech Stack

<div style="background: linear-gradient(45deg, #1f005c, #5b0060, #870160, #ac255e, #ca485c, #ffb56b); border-radius: 16px; padding: 20px; margin: 20px 0;">

### 🎨 Frontend Technologies
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 10px;">
  <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
    <h4>🔷 Core</h4>
    
    - React 18.2 with TypeScript 5.0
    - Vite 5.0 for build optimization
    - React Router v6.4+ (Data APIs)
    - Redux Toolkit + RTK Query
  </div>

  <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
    <h4>💅 Styling & UI</h4>
    
    - TailwindCSS 3.4
    - Framer Motion 10.16
    - HeadlessUI 1.7
    - Radix UI Primitives
  </div>

  <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
    <h4>📊 Data Visualization</h4>
    
    - Chart.js / React-Chartjs-2
    - React Flow (for career path mapping)
    - Three.js (for 3D elements)
  </div>
</div>

### ⚙️ Backend Infrastructure
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 10px;">
  <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
    <h4>🏗️ Core Backend</h4>
    
    - Node.js 20 LTS
    - Express.js 4.18
    - TypeScript 5.0
    - REST + GraphQL APIs
  </div>

  <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
    <h4>🗄️ Database & Storage</h4>
    
    - PostgreSQL 16 with TypeORM
    - Redis for caching
    - AWS S3 for media storage
    - Prisma ORM 5.0
  </div>

  <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
    <h4>🔐 Authentication & Security</h4>
    
    - Firebase Auth
    - JWT with refresh tokens
    - Rate limiting
    - CORS & Helmet.js
  </div>
</div>

### 🤖 AI & Machine Learning
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 10px;">
  <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
    <h4>🧠 Core AI</h4>
    
    - OpenAI GPT-4 Turbo
    - LangChain.js
    - Vector embeddings
    - Custom ML models
  </div>

  <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
    <h4>📈 Analytics</h4>
    
    - TensorFlow.js
    - Python data processing
    - Jupyter notebooks
    - Custom analytics pipeline
  </div>
</div>

### 🚀 DevOps & Deployment
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 10px;">
  <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
    <h4>☁️ Cloud & CI/CD</h4>
    
    - Docker & Docker Compose
    - GitHub Actions
    - AWS (ECS, Lambda, CloudFront)
    - Terraform for IaC
  </div>

  <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
    <h4>📊 Monitoring</h4>
    
    - Grafana & Prometheus
    - Sentry for error tracking
    - ELK Stack
    - Custom dashboards
  </div>
</div>

</div>

## 🌟 Key Implementations

- **Custom Assessment Engine**: Built with OpenAI's GPT-4 for accurate career recommendations
- **Real-time Mentorship Platform**: Video calls and messaging system
- **Interactive Challenge System**: Progress tracking and achievement rewards
- **Profile Management**: Photo uploads and customization options
- **Responsive Dashboard**: Analytics and progress visualization

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/major-match-ai.git
```

2. Install dependencies:
```bash
cd major-match-ai
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

## 📱 Screenshots

<div class="screenshot-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 40px 0; background: var(--bg-gradient); padding: 20px; border-radius: 16px;">
    <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: transform 0.3s;">
        <img src="frontend/src/assets/demo/home.png" alt="Home Dashboard" style="width: 100%; height: auto;" />
    </div>
    <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: transform 0.3s;">
        <img src="frontend/src/assets/demo/aiassistant.png" alt="AI Assistant Interface" style="width: 100%; height: auto;" />
    </div>
    <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: transform 0.3s;">
        <img src="frontend/src/assets/demo/careerchallenges.png" alt="Career Challenges" style="width: 100%; height: auto;" />
    </div>
    <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: transform 0.3s;">
        <img src="frontend/src/assets/demo/assessmentquestions.png" alt="Assessment Questions" style="width: 100%; height: auto;" />
    </div>
    <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: transform 0.3s;">
        <img src="frontend/src/assets/demo/assessmentresult.png" alt="Assessment Results" style="width: 100%; height: auto;" />
    </div>
    <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: transform 0.3s;">
        <img src="frontend/src/assets/demo/profile.png" alt="User Profile" style="width: 100%; height: auto;" />
    </div>
</div>

## 🎯 Future Enhancements

- [ ] AI-powered chat support
- [ ] Virtual career fairs
- [ ] Enhanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with job boards

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Author

**Your Name**
- Portfolio: [yourportfolio.com](https://yourportfolio.com)
- LinkedIn: [linkedin.com/in/yourusername](https://linkedin.com/in/yourusername)
- Twitter: [@yourusername](https://twitter.com/yourusername)

---

<p align="center">Made with ❤️ and lots of ☕</p>