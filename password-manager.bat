@echo off
setlocal enableextensions

:: =============================================
:: Password Manager - Skrypt uruchamiający
:: Wersja: 1.0.0
:: =============================================

:: Konfiguracja środowiska
chcp 65001 > nul
title Password Manager - Uruchamianie
color 0F
cls

:: Nagłówek uruchomienia
echo ----------------------------------------------------------------------
echo %date% %time% - Uruchamianie Password Manager v1.0.0
echo ----------------------------------------------------------------------
echo.

:: Sprawdź czy npm jest dostępny
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Nie znaleziono npm. Zainstaluj Node.js przed kontynuowaniem.
    pause
    exit /b 1
)

:: Instalacja pakietów npm
echo [1/4] Instalowanie wymaganych pakietów...
call npm install --no-audit --no-fund
if %errorlevel% neq 0 (
    echo [WARN] Próba naprawy cache npm...
    call :run_hidden npm cache clean --force
    call npm install --no-audit --no-fund
    if %errorlevel% neq 0 (
        echo [ERROR] Nie udało się zainstalować wymaganych pakietów
        pause
        exit /b 1
    )
)

:: Sprawdzenie TypeScript
echo [2/4] Sprawdzanie TypeScript...
where tsc >nul 2>&1
if %errorlevel% neq 0 (
    echo Instalowanie TypeScript lokalnie...
    call npm install -g typescript
    if not exist node_modules\.bin\tsc.cmd (
        echo [ERROR] Instalacja TypeScript nie powiodła się
        pause
        exit /b 1
    )
)

:: Inicjalizacja konfiguracji TypeScript
echo [3/4] Inicjalizacja konfiguracji TypeScript...
if not exist tsconfig.json (
    call :run_hidden npx tsc --init
    if %errorlevel% neq 0 (
        echo [ERROR] Nie udało się zainicjalizować tsconfig.json
        pause
        exit /b 1
    )
)

:: Kompilacja projektu
echo [4/4] Kompilowanie projektu...
call :run_hidden tsc
if %errorlevel% neq 0 (
    echo [ERROR] Błąd kompilacji TypeScript
    echo.
    echo Sprawdź:
    echo 1. Czy pliki źródłowe istnieją w folderze src/
    echo 2. Czy tsconfig.json jest poprawnie skonfigurowany
    echo 3. Czy nie ma błędów składniowych w kodzie TypeScript
    echo.
    pause
    exit /b 1
)

:: Uruchomienie aplikacji
echo.
echo Uruchamianie aplikacji...
echo ----------------------------------------------------------------------
npm run start

:: Obsługa wyniku uruchomienia
if %errorlevel% equ 0 (
    echo ----------------------------------------------------------------------
    echo [SUKCES] Aplikacja została pomyślnie zamknięta
) else (
    echo ----------------------------------------------------------------------
    echo [ERROR] Wystąpił błąd podczas uruchamiania aplikacji
)

pause
exit /b %errorlevel%

:run_hidden
:: Uruchom polecenie w ukrytym oknie
start /B /MIN "" cmd /C %*
exit /b %errorlevel%