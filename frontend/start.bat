@echo off
cd /d "%~dp0"
echo ========================================
echo Starting Pregnancy Risk Frontend
echo ========================================
echo.
echo Please wait while the server starts...
echo.
call npm run dev
pause