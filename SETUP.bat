@echo off
echo ========================================
echo ShopHub MERN Stack Setup Script
echo ========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo [2/4] Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo [3/4] Seeding Database...
cd ..\backend
call npm run seed
if %errorlevel% neq 0 (
    echo ERROR: Database seeding failed!
    echo Make sure MongoDB is running!
    pause
    exit /b 1
)
echo Database seeded successfully!
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Open TWO terminal windows
echo 2. In terminal 1: cd backend ^&^& npm start
echo 3. In terminal 2: cd frontend ^&^& npm run dev
echo 4. Open http://localhost:5173 in your browser
echo.
echo See QUICKSTART.md for detailed instructions
echo.
pause
