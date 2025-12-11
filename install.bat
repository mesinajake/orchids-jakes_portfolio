@echo off
echo ================================
echo AI-Powered Portfolio Setup
echo ================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed. Please install Node.js 16+ from nodejs.org
    exit /b 1
)
echo Node.js is installed

echo Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo Error: npm is not installed
    exit /b 1
)
echo npm is installed
echo.

echo Installing Frontend Dependencies...
call npm install
if errorlevel 1 (
    echo Error: Frontend installation failed
    exit /b 1
)
echo Frontend dependencies installed successfully
echo.

echo Installing Backend Dependencies...
cd backend
if exist package.json (
    call npm install
    if errorlevel 1 (
        echo Error: Backend installation failed
        cd ..
        exit /b 1
    )
    echo Backend dependencies installed successfully
) else (
    echo Warning: Backend package.json not found. Skipping backend setup.
)
cd ..
echo.

echo Configuring Environment Variables...
if not exist .env.local (
    if exist .env.example (
        copy .env.example .env.local >nul
        echo Created .env.local from template
        echo Please update .env.local with your configuration
    )
) else (
    echo .env.local already exists
)

if exist backend (
    if not exist backend\.env (
        if exist backend\.env.example (
            copy backend\.env.example backend\.env >nul
            echo Created backend/.env from template
            echo Please update backend/.env with your configuration
        )
    ) else (
        echo backend/.env already exists
    )
)

echo.
echo ================================
echo Installation Complete!
echo ================================
echo.
echo Next Steps:
echo 1. Update .env.local with your API configuration
echo 2. Update backend/.env with MongoDB and OpenAI credentials
echo 3. Start MongoDB (if using local instance)
echo 4. Run 'npm run dev' to start frontend
echo 5. Run 'cd backend && npm run dev' in another terminal for backend
echo.
echo See README-DEPLOYMENT.md for detailed setup instructions
echo.
pause
