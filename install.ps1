# Installation Script for AI-Powered Portfolio
# Run this script to set up the entire project

Write-Host "🚀 AI-Powered Portfolio Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 16+ from nodejs.org" -ForegroundColor Red
    exit 1
}

# Check npm installation
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend installation failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Frontend dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Setup backend
Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Yellow
Set-Location backend

if (Test-Path "package.json") {
    npm install
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Backend installation failed" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    
    Write-Host "✅ Backend dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "⚠️  Backend package.json not found. Skipping backend setup." -ForegroundColor Yellow
}

Set-Location ..
Write-Host ""

# Create .env files if they don't exist
Write-Host "⚙️  Configuring Environment Variables..." -ForegroundColor Yellow

if (-not (Test-Path ".env.local")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env.local"
        Write-Host "✅ Created .env.local from template" -ForegroundColor Green
        Write-Host "⚠️  Please update .env.local with your configuration" -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ .env.local already exists" -ForegroundColor Green
}

if (Test-Path "backend") {
    if (-not (Test-Path "backend/.env")) {
        if (Test-Path "backend/.env.example") {
            Copy-Item "backend/.env.example" "backend/.env"
            Write-Host "✅ Created backend/.env from template" -ForegroundColor Green
            Write-Host "⚠️  Please update backend/.env with your configuration" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✅ backend/.env already exists" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✨ Installation Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Update .env.local with your API configuration" -ForegroundColor White
Write-Host "2. Update backend/.env with MongoDB and OpenAI credentials" -ForegroundColor White
Write-Host "3. Start MongoDB (if using local instance)" -ForegroundColor White
Write-Host "4. Run 'npm run dev' to start frontend" -ForegroundColor White
Write-Host "5. Run 'cd backend && npm run dev' in another terminal for backend" -ForegroundColor White
Write-Host ""
Write-Host "📚 See README-DEPLOYMENT.md for detailed setup instructions" -ForegroundColor Cyan
Write-Host ""
