#!/bin/bash

# =============================================
# Password Manager - Skrypt uruchamiający
# Wersja: 1.0.2
# =============================================

# Konfiguracja środowiska
clear
export LC_ALL=C.UTF-8
export LANG=C.UTF-8
printf '\033]2;Password Manager - Uruchamianie\007'

# Nagłówek uruchomienia
echo "----------------------------------------------------------------------"
echo "$(date) - Uruchamianie Password Manager v1.0.2"
echo "----------------------------------------------------------------------"
echo

# Sprawdź czy npm jest dostępny
if ! command -v npm &> /dev/null; then
    echo "[ERROR] Nie znaleziono npm. Zainstaluj Node.js przed kontynuowaniem."
    read -p "Naciśnij Enter, aby kontynuować..."
    exit 1
fi

# Funkcja do ukrytego uruchamiania poleceń
run_hidden() {
    "$@" > /dev/null 2>&1
    return $?
}

# Instalacja pakietów npm
echo "[1/4] Instalowanie wymaganych pakietów..."
npm install --no-audit --no-fund
if [ $? -ne 0 ]; then
    echo "[WARN] Próba naprawy cache npm..."
    run_hidden npm cache clean --force
    npm install --no-audit --no-fund
    if [ $? -ne 0 ]; then
        echo "[ERROR] Nie udało się zainstalować wymaganych pakietów"
        read -p "Naciśnij Enter, aby kontynuować..."
        exit 1
    fi
fi

# Sprawdzenie TypeScript
echo "[2/4] Sprawdzanie TypeScript..."
if ! command -v tsc &> /dev/null; then
    echo "Instalowanie TypeScript lokalnie..."
    npm install -g typescript
    if [ ! -f node_modules/.bin/tsc ]; then
        echo "[ERROR] Instalacja TypeScript nie powiodła się"
        read -p "Naciśnij Enter, aby kontynuować..."
        exit 1
    fi
fi

# Inicjalizacja konfiguracji TypeScript
echo "[3/4] Inicjalizacja konfiguracji TypeScript..."
if [ ! -f tsconfig.json ]; then
    run_hidden npx tsc --init
    if [ $? -ne 0 ]; then
        echo "[ERROR] Nie udało się zainicjalizować tsconfig.json"
        read -p "Naciśnij Enter, aby kontynuować..."
        exit 1
    fi
fi

# Kompilacja projektu
echo "[4/4] Kompilowanie projektu..."
run_hidden tsc
if [ $? -ne 0 ]; then
    echo "[ERROR] Błąd kompilacji TypeScript"
    echo
    echo "Sprawdź:"
    echo "1. Czy pliki źródłowe istnieją w folderze src/"
    echo "2. Czy tsconfig.json jest poprawnie skonfigurowany"
    echo "3. Czy nie ma błędów składniowych w kodzie TypeScript"
    echo
    read -p "Naciśnij Enter, aby kontynuować..."
    exit 1
fi

# Uruchomienie aplikacji
echo
echo "Uruchamianie aplikacji..."
echo "----------------------------------------------------------------------"
npm run start

# Obsługa wyniku uruchomienia
if [ $? -eq 0 ]; then
    echo "----------------------------------------------------------------------"
    echo "[SUKCES] Aplikacja została pomyślnie zamknięta"
else
    echo "----------------------------------------------------------------------"
    echo "[ERROR] Wystąpił błąd podczas uruchamiania aplikacji"
fi

read -p "Naciśnij Enter, aby kontynuować..."
exit $?