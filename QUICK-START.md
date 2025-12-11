# ⚡ Quick Start Guide - AI-Powered Portfolio

Get your portfolio running locally in 5 minutes!

---

## 🚀 Super Quick Setup (For the impatient)

### 1. Install Everything (2 minutes)

**Windows:**
```bash
.\install.bat
```

**PowerShell:**
```bash
.\install.ps1
```

**Manual:**
```bash
npm install
cd backend
npm install
cd ..
```

### 2. Configure Environment (2 minutes)

**Create `.env.local`:**
```env
VITE_API_URL=http://localhost:5000
VITE_ENABLE_CHATBOT=true
```

**Create `backend/.env`:**
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/portfolio
OPENAI_API_KEY=your_key_here

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_TO=your.email@gmail.com
```

### 3. Start MongoDB (1 minute)

**Already installed MongoDB?**
```bash
mongod
```

**Don't have MongoDB?** Use free MongoDB Atlas:
1. Sign up at mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Use it in `MONGODB_URI`

### 4. Run Everything (30 seconds)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Open Browser

Go to: `http://localhost:3000`

✅ **Done!** Your portfolio is running!

---

## 🎯 What You Need First

### Required (Must Have)
- ✅ Node.js 16+ ([download](https://nodejs.org))
- ✅ npm (comes with Node.js)

### For AI Chatbot
- ✅ OpenAI API Key ([get one](https://platform.openai.com))
  - Cost: ~$0.03 per conversation
  - $5 credit is enough for testing

### For Database
- **Option A**: Install MongoDB locally ([download](https://www.mongodb.com/try/download/community))
- **Option B**: Use MongoDB Atlas FREE tier ([signup](https://www.mongodb.com/cloud/atlas))

### For Contact Form
- ✅ Gmail account
- ✅ Gmail App Password ([how to get](https://support.google.com/accounts/answer/185833))

---

## 📁 File Structure

```
Portfolio/
├── src/                    # Frontend React code
│   ├── components/         # React components
│   │   └── ChatBot.jsx    # 🤖 AI Chatbot
│   ├── pages/             # Page components
│   └── App.jsx            # Main app
├── backend/               # Backend API
│   ├── routes/           # API endpoints
│   │   ├── chat.js       # Chatbot API
│   │   ├── contact.js    # Contact form
│   │   └── portfolio.js  # Portfolio data
│   ├── models/           # Database schemas
│   └── server.js         # Express server
├── data/
│   └── portfolio.json    # 📝 Your info (EDIT THIS!)
└── package.json
```

---

## ✏️ Customize Your Portfolio

### 1. Edit Your Information

Open `data/portfolio.json` and update:
```json
{
  "personal": {
    "name": "YOUR NAME",
    "title": "YOUR TITLE",
    "email": "your@email.com"
  },
  "skills": { ... },
  "experience": [ ... ],
  ...
}
```

### 2. Update Social Links

In `src/pages/Home.jsx`, find:
```javascript
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/YOUR_USERNAME" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/YOUR_PROFILE/" },
  ...
];
```

### 3. Add Your Photo

Replace `src/assets/FormalPic.webp` with your photo

### 4. Customize Colors (Optional)

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',    // Change these
  secondary: '#a855f7',  // to your colors
}
```

---

## 🧪 Test Everything

### ✅ Frontend Works
1. Visit http://localhost:3000
2. All pages load?
3. Navigation works?
4. Animations smooth?

### ✅ Chatbot Works
1. Click chatbot button (bottom right)
2. Type: "What technologies do you work with?"
3. Should respond in 2-5 seconds

### ✅ Contact Form Works
1. Go to Contact section
2. Fill form and submit
3. Check your email

---

## 🐛 Common Issues

### Chatbot Not Responding
**Problem**: "Failed to get response"
**Fix**:
1. Check OpenAI API key in `backend/.env`
2. Check backend is running (Terminal 1)
3. Check browser console for errors

### Can't Connect to MongoDB
**Problem**: "MongoDB connection error"
**Fix**:
1. Is MongoDB running? Run `mongod`
2. Using Atlas? Check connection string
3. Check IP whitelist in Atlas (add 0.0.0.0/0)

### Port Already in Use
**Problem**: "Port 3000/5000 already in use"
**Fix**:
```bash
# Kill process on port
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Build Errors
**Problem**: npm install fails
**Fix**:
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Next Steps

### Before Deploying:
1. ✅ Update all content in `data/portfolio.json`
2. ✅ Test chatbot with different questions
3. ✅ Test contact form
4. ✅ Add your real projects
5. ✅ Replace placeholder images

### Ready to Deploy?
See `DEPLOYMENT-GUIDE.md` for:
- MongoDB Atlas setup
- OpenAI API configuration
- Railway deployment (backend)
- Vercel deployment (frontend)
- Custom domain setup

---

## 📚 Additional Resources

- **Full Documentation**: `README-DEPLOYMENT.md`
- **Deployment Guide**: `DEPLOYMENT-GUIDE.md`
- **Setup Checklist**: `SETUP-CHECKLIST.md`

---

## 💡 Tips

### Save Money on OpenAI
- Use `gpt-3.5-turbo` instead of `gpt-4` (20x cheaper)
- Set `AI_MAX_TOKENS=300` to limit response length
- Implement response caching for common questions

### Improve AI Responses
1. Edit `backend/routes/chat.js`
2. Update `SYSTEM_PROMPT` with more personality
3. Add more examples in `commonQuestions`

### Speed Up Development
```bash
# Hot reload for both frontend and backend
npm run dev          # Terminal 1 (frontend)
cd backend && npm run dev    # Terminal 2 (backend)
```

---

## 🆘 Need Help?

1. **Check logs**: Look at terminal output for errors
2. **Test endpoints**: Visit http://localhost:5000/api/health
3. **Check environment**: Verify all `.env` variables
4. **Read docs**: Check README-DEPLOYMENT.md

---

## ✨ You're All Set!

Your AI-powered portfolio is running locally!

**Local URLs:**
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend: http://localhost:5000
- ❤️ Health: http://localhost:5000/api/health

**Next:**
- Customize your content
- Test all features
- Deploy to production
- Share with the world!

---

**Happy coding! 🚀**
