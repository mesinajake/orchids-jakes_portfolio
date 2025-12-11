# 🚀 AI-Powered Portfolio Website

A modern, full-stack portfolio with an AI chatbot powered by OpenAI GPT-4.

![Version](https://img.shields.io/badge/version-6.0.0-blue.svg) ![React](https://img.shields.io/badge/React-18.3+-61DAFB?logo=react) ![Node](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js)

---

## 📁 Project Structure

```
Portfolio1.1/
├── frontend/              # React frontend application
│   ├── src/              # React components & pages
│   ├── index.html        # HTML entry point
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
│
├── backend/              # Node.js + Express backend
│   ├── routes/          # API endpoints
│   ├── models/          # MongoDB schemas
│   └── server.js        # Express server
│
└── data/                # Portfolio data & docs
```

---

## ⚡ Quick Start

### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Configure Environment

**Frontend** (`frontend/.env.local`):
```env
VITE_API_URL=http://localhost:5000
VITE_ENABLE_CHATBOT=true
```

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
OPENAI_API_KEY=your_openai_key
EMAIL_USER=your@email.com
EMAIL_PASSWORD=your_app_password
```

### 3. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit: **http://localhost:3000**

---

## 🎯 Features

✅ **AI Chatbot** - GPT-4 powered assistant  
✅ **Portfolio Showcase** - Projects & certifications  
✅ **Contact Form** - Email notifications  
✅ **Analytics** - User tracking  
✅ **Responsive Design** - Mobile-first  
✅ **Modern UI** - Smooth animations  

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, TailwindCSS, Framer Motion  
**Backend:** Node.js, Express, MongoDB, OpenAI GPT-4  
**Deploy:** Vercel (frontend), Railway (backend)

---

## 📚 Documentation

- **[QUICK-START.md](QUICK-START.md)** - Get started in 5 minutes
- **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)** - Deploy to production
- **[PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)** - File organization guide
- **[SETUP-CHECKLIST.md](SETUP-CHECKLIST.md)** - Complete setup checklist

---

## 🎨 Customization

1. **Update Your Info**: Edit `data/portfolio.json`
2. **Customize AI**: Edit `backend/routes/chat.js`
3. **Update Styling**: Modify `frontend/src/styles/`
4. **Add Projects**: Update Firebase or `portfolio.json`

---

## 🚀 Deployment

### Quick Deploy:

1. **Backend** → Railway (Root: `backend/`)
2. **Frontend** → Vercel (Root: `frontend/`)
3. **Database** → MongoDB Atlas
4. **Configure** environment variables

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed steps.

---

## 💡 Development Commands

**Frontend:**
```bash
cd frontend
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

**Backend:**
```bash
cd backend
npm run dev          # Development server
npm start            # Production server
```

---

## 🔒 Security

- Helmet.js security headers
- CORS protection
- Rate limiting
- Input validation
- Environment variable protection

---

## 💰 Estimated Costs

**Development:** Free or ~$5-10 (OpenAI testing)  
**Production:** ~$15-80/month depending on traffic

---

## 🙏 Credits

- Original template by [Eki Zulfar Rachman](https://github.com/EkiZR/Portofolio_V5)
- AI enhancement by Jake Mesina
- Powered by OpenAI GPT-4

---

## 📞 Support

**Documentation:**
- [Quick Start Guide](QUICK-START.md)
- [Deployment Guide](DEPLOYMENT-GUIDE.md)
- [Project Structure](PROJECT-STRUCTURE.md)

---

**Built with ❤️ using React, Node.js, and OpenAI GPT-4**

© 2025 Jake Mesina. MIT License.

