@echo off
chcp 65001 > nul
set "PATH=C:\Users\sedat\.gemini\mingit\cmd;%PATH%"

echo =======================================================
echo   6. SINIF FEN BILIMLERI PASAPAROLA - GITHUB YUKLEYICI
echo =======================================================
echo.

set /p GITHUB_USER="GitHub Kullanıcı Adınız (Varsayılan: sedattasmis): "
if "%GITHUB_USER%"=="" set GITHUB_USER=sedattasmis

set /p GITHUB_REPO="Depo (Repo) Adı (Varsayılan: pasaparola-fen-bilimleri): "
if "%GITHUB_REPO%"=="" set GITHUB_REPO=pasaparola-fen-bilimleri

echo.
echo GitHub Personal Access Token (PAT) giriniz:
echo (Token almak icin: https://github.com/settings/tokens -> Generate new token (classic) -> repo secin)
set /p GITHUB_TOKEN="Token: "

if "%GITHUB_TOKEN%"=="" (
    echo Token girilmedi, islem iptal edildi.
    pause
    exit /b
)

echo.
echo GitHub'a yukleniyor...
git remote remove origin >nul 2>&1
git remote add origin https://%GITHUB_TOKEN%@github.com/%GITHUB_USER%/%GITHUB_REPO%.git
git branch -M main
git push -u origin main

echo.
echo =======================================================
echo   ISLEM TAMAMLANDI! 
echo   Deponuz: https://github.com/%GITHUB_USER%/%GITHUB_REPO%
echo =======================================================
pause
