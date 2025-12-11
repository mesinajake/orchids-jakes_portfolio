# 🚀 Quick Deployment Guide

## Prerequisites Checklist
- [ ] GitHub account
- [ ] Vercel account (free)
- [ ] Railway/Render account (free)
- [ ] MongoDB Atlas account (free)
- [ ] OpenAI API key ($5-10 credit recommended)
- [ ] Gmail account for contact form

---

## Step 1: MongoDB Atlas Setup (5 minutes)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**
   - Choose FREE tier (M0)
   - Select closest region
   - Click "Create Cluster"

3. **Setup Database Access**
   - Database Access → Add New Database User
   - Username: `portfolio_admin`
   - Generate strong password (save it!)
   - Database User Privileges: Read and write to any database

4. **Setup Network Access**
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://portfolio_admin:YourPassword@cluster0.xxxxx.mongodb.net/portfolio`

---

## Step 2: OpenAI API Setup (3 minutes)

1. **Create Account**
   - Go to [platform.openai.com](https://platform.openai.com)
   - Sign up

2. **Get API Key**
   - API Keys → Create new secret key
   - Name it: "Portfolio Chatbot"
   - Copy and save the key (starts with `sk-...`)
   - **IMPORTANT**: You can't see it again!

3. **Add Credits**
   - Billing → Add payment method
   - $5-10 is enough for testing
   - GPT-4 costs ~$0.03 per 1K tokens

---

## Step 3: Backend Deployment (Railway) (10 minutes)

1. **Push Backend to GitHub**
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin <your-backend-repo-url>
git push -u origin main
```

2. **Deploy on Railway**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - New Project → Deploy from GitHub repo
   - Select your backend repository
   - Click "Deploy Now"

3. **Add Environment Variables**
   - In Railway dashboard → Variables tab
   - Add each variable:

```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
MONGODB_URI=mongodb+srv://portfolio_admin:YourPassword@cluster0.xxxxx.mongodb.net/portfolio
OPENAI_API_KEY=sk-your-openai-key-here
AI_MODEL=gpt-4
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=500
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_TO=your.email@gmail.com
```

4. **Generate Domain**
   - Settings → Generate Domain
   - Copy the URL (e.g., `your-app.up.railway.app`)
   - Save this for frontend configuration

---

## Step 4: Gmail App Password Setup (5 minutes)

1. **Enable 2FA**
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Security → 2-Step Verification
   - Enable it

2. **Create App Password**
   - Security → App passwords
   - Select app: Mail
   - Select device: Other (Custom name)
   - Name it: "Portfolio Contact Form"
   - Click Generate
   - Copy the 16-character password
   - Use this as `EMAIL_PASSWORD` in Railway

---

## Step 5: Frontend Deployment (Vercel) (8 minutes)

1. **Push Frontend to GitHub**
```bash
# In main portfolio directory
git add .
git commit -m "Add AI chatbot and backend integration"
git push origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - New Project → Import Git Repository
   - Select your portfolio repository
   - Framework Preset: Vite
   - Root Directory: `./` (leave as is)

3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables**
   - Environment Variables section:
```env
VITE_API_URL=https://your-backend.up.railway.app
VITE_ENABLE_CHATBOT=true
VITE_ENABLE_ANALYTICS=true
VITE_SITE_URL=https://your-site.vercel.app
VITE_SITE_NAME=Jake Mesina Portfolio
```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Copy the deployment URL

---

## Step 6: Update Backend with Frontend URL

1. **Go back to Railway**
   - Your backend project → Variables
   - Update `FRONTEND_URL` with your Vercel URL
   - Example: `https://your-portfolio.vercel.app`
   - Click "Update Variables"
   - App will automatically redeploy

---

## Step 7: Testing (5 minutes)

1. **Test Website**
   - Visit your Vercel URL
   - Check all pages load correctly
   - Verify animations work

2. **Test AI Chatbot**
   - Click the chatbot button (bottom right)
   - Send a message: "What technologies do you work with?"
   - Should respond in 2-5 seconds
   - Check conversation history persists

3. **Test Contact Form**
   - Go to Contact section
   - Fill out form
   - Submit
   - Check your email for notification

4. **Check Backend Health**
   - Visit: `https://your-backend.up.railway.app/api/health`
   - Should see: `{"status":"healthy","timestamp":"...","uptime":...}`

---

## Step 8: Custom Domain (Optional)

### For Vercel (Frontend)
1. **Buy Domain**
   - Namecheap, GoDaddy, or Google Domains
   - Example: `jakemesina.com`

2. **Add to Vercel**
   - Project Settings → Domains
   - Add Domain: `jakemesina.com` and `www.jakemesina.com`
   - Follow DNS instructions
   - Wait 24-48 hours for propagation

3. **Update Environment Variables**
   - Update `VITE_SITE_URL` to your custom domain
   - Redeploy

### For Railway (Backend)
1. **Custom Domain**
   - Railway Settings → Networking → Custom Domain
   - Add subdomain: `api.jakemesina.com`
   - Update DNS as instructed

2. **Update Frontend**
   - In Vercel, update `VITE_API_URL` to `https://api.jakemesina.com`
   - Redeploy

---

## Common Issues & Solutions

### Chatbot Not Responding
- **Check**: Railway logs for errors
- **Verify**: OpenAI API key is correct
- **Confirm**: MongoDB connection string is valid
- **Check**: CORS settings allow your frontend URL

### Contact Form Not Sending
- **Verify**: Gmail app password is correct
- **Check**: Railway logs for email errors
- **Confirm**: EMAIL_TO matches your email

### Build Fails on Vercel
- **Check**: All dependencies in package.json
- **Verify**: Build command is correct
- **Try**: Clear cache and redeploy

### Database Connection Error
- **Check**: MongoDB Atlas IP whitelist includes 0.0.0.0/0
- **Verify**: Connection string has correct password
- **Confirm**: Database user has read/write permissions

---

## Monitoring & Maintenance

### Check Backend Health
```bash
curl https://your-backend.up.railway.app/api/health
```

### View Logs
- **Railway**: Dashboard → Deployments → View Logs
- **Vercel**: Dashboard → Deployments → Function Logs

### Monitor Costs
- **OpenAI**: [platform.openai.com/usage](https://platform.openai.com/usage)
- **MongoDB**: Atlas Dashboard → Metrics
- **Railway**: Usage section (500 hours free/month)
- **Vercel**: Usage section (100GB bandwidth free)

---

## Cost Breakdown

### Free Tier (Testing)
- **Vercel**: Free (100GB bandwidth)
- **Railway**: Free (500 hours/month)
- **MongoDB Atlas**: Free (512MB storage)
- **OpenAI**: ~$5-10 for initial testing

### Production (Estimated Monthly)
- **Vercel Pro**: $20/month (optional)
- **Railway**: $5-10/month (scales with usage)
- **MongoDB Atlas**: Free to $25/month (depends on usage)
- **OpenAI**: $10-50/month (depends on traffic)
- **Domain**: $12/year

**Total**: ~$15-80/month depending on traffic

---

## Next Steps

1. **Update Portfolio Data**
   - Edit `data/portfolio.json` with your real information
   - Add your actual projects, experience, skills
   - Commit and push

2. **Customize Design**
   - Update colors in `tailwind.config.js`
   - Replace images with your own
   - Modify components to match your style

3. **Train AI Better**
   - Test chatbot with different questions
   - Update `commonQuestions` in portfolio.json
   - Adjust `SYSTEM_PROMPT` in `backend/routes/chat.js`

4. **Add Analytics**
   - Set up Google Analytics
   - Add tracking to chatbot interactions
   - Monitor user behavior

5. **SEO Optimization**
   - Add meta tags
   - Create sitemap.xml
   - Submit to Google Search Console

---

## Support

If you encounter issues:
1. Check the main README.md
2. Review Railway/Vercel logs
3. Test API endpoints with Postman
4. Check MongoDB Atlas metrics

---

**Congratulations! Your AI-powered portfolio is live! 🎉**

Share it:
- LinkedIn
- Twitter
- GitHub README
- Developer communities

Remember to:
- Monitor OpenAI usage
- Respond to contact form messages
- Update portfolio regularly
- Keep dependencies updated
