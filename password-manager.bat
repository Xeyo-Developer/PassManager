@echo off

chcp 65001 > nul
title Password Manager - Uruchamianie
color 0F
cls

echo -----------------------------------
echo %date% %time% - Uruchamianie Password Manager
echo -----------------------------------

echo Instalowanie wymaganych pakietów...
call :run_hidden npm install --no-audit --no-fund
if %errorlevel% neq 0 (
    echo [INFO] Próba naprawy cache npm...
    call :run_hidden npm cache clean --force
    call :run_hidden npm install --no-audit --no-fund
    if %errorlevel% neq 0 (
        echo [ERROR] Krytyczny błąd podczas instalacji pakietów
        pause
        exit /b 1
    )
)

echo Sprawdzanie TypeScript...
where tsc >nul 2>&1
if %errorlevel% neq 0 (
    echo Instalowanie TypeScript lokalnie...
    call :run_hidden npm install -g typescript
    if not exist node_modules\.bin\tsc.cmd (
        echo [ERROR] Nie udało się zainstalować TypeScript
        pause
        exit /b 1
    )
)

echo Inicjalizacja konfiguracji TypeScript...
if not exist tsconfig.json (
    call :run_hidden npx tsc --init  :: Poprawiono z 'init tsc' na 'tsc --init'
)

echo Kompilowanie projektu...
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

echo Uruchamianie aplikacji...
npm run start

if %errorlevel% eq 0 (
    echo [OK] Aplikacja została zamknięta  :: Zmieniono z [SUKCES] na [OK]
) else (
    echo [ERROR] Wystąpił błąd podczas uruchamiania
)

pause
exit /b 0

:run_hidden
start /B /MIN "" cmd /C %*
exit /b %errorlevel%