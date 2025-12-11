# 🚀 AI-Powered Portfolio Website

A modern, interactive portfolio website with an integrated AI chatbot that represents you to visitors and HR professionals.

![Portfolio Preview](https://via.placeholder.com/1200x600/6366f1/ffffff?text=AI-Powered+Portfolio)

## ✨ Features

### 🤖 AI Chatbot
- **Intelligent Conversations**: Powered by OpenAI GPT-4, the chatbot can answer questions about your experience, skills, and projects
- **Context-Aware**: Uses RAG (Retrieval-Augmented Generation) with your portfolio data for accurate responses
- **Real-time Chat**: Instant responses with typing indicators and smooth animations
- **Persistent Sessions**: Chat history is saved across sessions
- **Quick Questions**: Pre-defined questions for quick engagement

### 🎨 Modern UI/UX
- **Smooth Animations**: Powered by Framer Motion and AOS
- **Responsive Design**: Mobile-first approach, works beautifully on all devices
- **Interactive Components**: Lottie animations, hover effects, and micro-interactions
- **Professional Theme**: Gradient accents with purple/blue color scheme
- **Dark Mode Ready**: Optimized for dark backgrounds

### 🔧 Technical Excellence
- **React 18+**: Modern React with hooks and performance optimizations
- **Vite**: Lightning-fast build tool and hot module replacement
- **Express.js Backend**: RESTful API for chatbot, contact forms, and analytics
- **MongoDB**: Database for storing conversations, contacts, and analytics
- **Firebase Integration**: Existing Firebase setup for projects and certificates
- **TailwindCSS**: Utility-first CSS for rapid development

### 📊 Analytics & Tracking
- **User Analytics**: Track page views, interactions, and engagement
- **Chat Analytics**: Monitor popular questions and conversation patterns
- **Contact Form Tracking**: Keep track of inquiries and responses

### 📱 Key Sections
1. **Hero Section**: Eye-catching introduction with animated Lottie graphics
2. **About Me**: Professional summary with statistics and achievements
3. **Skills Matrix**: Comprehensive display of technical skills with icons
4. **Experience Timeline**: Work history with detailed responsibilities
5. **Portfolio Showcase**: Projects and certificates with filtering
6. **Contact Form**: Easy-to-use contact form with email notifications
7. **AI Chatbot**: Floating chatbot widget available on all pages

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3+** - UI library
- **Vite 5.4+** - Build tool
- **TailwindCSS 3.4+** - Styling
- **Framer Motion 11+** - Animations
- **React Router 6+** - Routing
- **Lucide React** - Icons
- **AOS** - Scroll animations
- **Lottie** - Vector animations

### Backend
- **Node.js** - Runtime
- **Express.js 4+** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **OpenAI API** - AI chatbot
- **Nodemailer** - Email service

### DevOps
- **Git** - Version control
- **Vercel** - Frontend hosting (recommended)
- **Railway/Render** - Backend hosting
- **MongoDB Atlas** - Database hosting

---

## 📦 Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- MongoDB instance (local or Atlas)
- OpenAI API key

### Frontend Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Portfolio1.1
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:5000
VITE_ENABLE_CHATBOT=true
VITE_SITE_URL=http://localhost:3000
```

4. **Run development server**
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio
# Or use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Email (for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_TO=your_receiving_email@gmail.com
```

4. **Run backend server**
```bash
npm run dev
```

Backend API will be available at `http://localhost:5000`

---

## 🔑 Configuration

### OpenAI API Key
1. Sign up at [OpenAI Platform](https://platform.openai.com/)
2. Create an API key
3. Add to backend `.env` file

### Email Setup (Gmail)
1. Enable 2-Factor Authentication
2. Generate App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use app password in `.env` file

### MongoDB Setup
**Local:**
```bash
# Install MongoDB
# macOS: brew install mongodb-community
# Windows: Download from mongodb.com

# Start MongoDB
mongod --dbpath /path/to/data
```

**MongoDB Atlas (Cloud):**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Get connection string
4. Add to `.env` file

---

## 📂 Project Structure

```
Portfolio1.1/
├── src/                          # Frontend source
│   ├── components/               # React components
│   │   ├── ChatBot.jsx          # AI chatbot component
│   │   ├── ChatBot.css          # Chatbot styles
│   │   ├── Navbar.jsx           # Navigation
│   │   ├── Background.jsx       # Animated background
│   │   ├── CardProject.jsx      # Project cards
│   │   └── ...
│   ├── pages/                    # Page components
│   │   ├── Home.jsx             # Landing page
│   │   ├── About.jsx            # About section
│   │   ├── Portofolio.jsx       # Projects showcase
│   │   ├── Contact.jsx          # Contact form
│   │   └── WelcomeScreen.jsx    # Loading screen
│   ├── styles/                   # Global styles
│   │   ├── index.css            # Main CSS
│   │   ├── base.css             # Base styles
│   │   └── animations.css       # Animations
│   ├── firebase/                 # Firebase config
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # Entry point
├── backend/                      # Backend API
│   ├── routes/                   # API routes
│   │   ├── chat.js              # Chatbot endpoints
│   │   ├── contact.js           # Contact form
│   │   ├── portfolio.js         # Portfolio data
│   │   └── analytics.js         # Analytics tracking
│   ├── models/                   # Database schemas
│   │   └── schemas.js           # Mongoose schemas
│   ├── server.js                 # Express server
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Environment template
├── data/                         # Data files
│   └── portfolio.json           # Portfolio content & AI training data
├── public/                       # Static assets
├── package.json                  # Frontend dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
└── README.md                     # This file
```

---

## 🎯 Customization Guide

### 1. Update Portfolio Data
Edit `data/portfolio.json` with your information:
- Personal details
- Skills and technologies
- Work experience
- Education
- Projects
- Certifications
- Personality traits (for AI training)

### 2. Customize AI Chatbot Personality
In `backend/routes/chat.js`, modify the `SYSTEM_PROMPT`:
```javascript
const SYSTEM_PROMPT = `You are [Your Name]'s AI assistant...`;
```

### 3. Update Branding
- Replace logo/images in `public/images/`
- Update colors in `tailwind.config.js`
- Modify animations in components

### 4. Add New Sections
1. Create component in `src/components/`
2. Import in `App.jsx`
3. Add to routing if needed

---

## 🚀 Deployment

### Frontend (Vercel - Recommended)

1. **Push code to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy to Vercel**
- Visit [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables:
  ```
  VITE_API_URL=https://your-backend-url.com
  VITE_ENABLE_CHATBOT=true
  ```
- Deploy!

### Backend (Railway - Recommended)

1. **Create account** at [railway.app](https://railway.app)

2. **New Project → Deploy from GitHub**

3. **Add environment variables**:
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
MONGODB_URI=your_mongodb_atlas_uri
OPENAI_API_KEY=your_openai_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password
EMAIL_TO=your_receiving_email
```

4. **Deploy** and copy the backend URL

5. **Update frontend** `.env` with backend URL

### Alternative: Render.com

Similar process to Railway:
1. Create account
2. New Web Service
3. Connect GitHub
4. Add environment variables
5. Deploy

---

## 📊 API Documentation

### Chat Endpoints

**POST** `/api/chat`
```json
{
  "message": "What technologies do you work with?",
  "sessionId": "unique_session_id"
}
```

Response:
```json
{
  "success": true,
  "message": "I work with React, JavaScript, Node.js...",
  "sessionId": "unique_session_id"
}
```

### Contact Form

**POST** `/api/contact`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to discuss a project..."
}
```

### Portfolio Data

**GET** `/api/portfolio`
- Returns complete portfolio data

**GET** `/api/portfolio/skills`
- Returns skills only

**GET** `/api/portfolio/experience`
- Returns experience only

### Analytics

**POST** `/api/analytics`
```json
{
  "type": "page_view",
  "page": "/about",
  "sessionId": "unique_session_id"
}
```

---

## 🧪 Testing

```bash
# Frontend
npm run lint        # Check code quality
npm run build       # Test production build
npm run preview     # Preview production build

# Backend
cd backend
npm test           # Run tests (if configured)
```

---

## 📈 Performance Optimization

### Frontend
- ✅ Code splitting with React.lazy
- ✅ Image optimization (WebP format)
- ✅ Lazy loading for images
- ✅ Memoized components
- ✅ Debounced animations
- ✅ Production build optimization

### Backend
- ✅ Rate limiting
- ✅ MongoDB indexing
- ✅ Response compression
- ✅ Error handling
- ✅ Request validation

---

## 🔒 Security

- Helmet.js for security headers
- CORS configuration
- Rate limiting on API endpoints
- Input validation and sanitization
- Environment variable protection
- MongoDB injection prevention

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📝 License

MIT License - feel free to use for your own portfolio!

---

## 🙋‍♂️ Support

For issues or questions:
- Open an issue on GitHub
- Contact: jake.mesina@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🎉 Acknowledgments

- Original template by [Eki Zulfar Rachman](https://github.com/EkiZR)
- Enhanced with AI capabilities
- OpenAI for GPT-4 API
- Vercel for hosting
- MongoDB Atlas for database

---

## 📸 Screenshots

### Desktop View
![Desktop](https://via.placeholder.com/1200x600/6366f1/ffffff?text=Desktop+View)

### Mobile View
![Mobile](https://via.placeholder.com/400x800/6366f1/ffffff?text=Mobile+View)

### AI Chatbot
![Chatbot](https://via.placeholder.com/400x600/6366f1/ffffff?text=AI+Chatbot)

---

**Built with ❤️ by Jake Mesina**

⭐ Star this repo if you found it helpful!
