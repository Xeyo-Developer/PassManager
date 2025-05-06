#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
WHITE='\033[1;37m'
BLUE='\033[0;34m'
NC='\033[0m'

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUKCES]${NC} $1"
}

run_hidden() {
    "$@" >/dev/null 2>&1
    return $?
}

clear
echo -e "${WHITE}-----------------------------------${NC}"
echo -e "${WHITE}$(date) - Uruchamianie Password Manager${NC}"
echo -e "${WHITE}-----------------------------------${NC}"

info "Instalowanie wymaganych pakietów..."
run_hidden npm install --no-audit --no-fund
if [ $? -ne 0 ]; then
    info "Próba naprawy cache npm..."
    run_hidden npm cache clean --force
    run_hidden npm install --no-audit --no-fund
    if [ $? -ne 0 ]; then
        error "Krytyczny błąd podczas instalacji pakietów"
        read -p "Naciśnij Enter, aby zakończyć..."
        exit 1
    fi
fi

info "Sprawdzanie TypeScript..."
if ! command -v tsc &> /dev/null; then
    info "Instalowanie TypeScript globalnie..."
    run_hidden npm install -g typescript
    if [ ! -f "node_modules/.bin/tsc" ]; then
        error "Nie udało się zainstalować TypeScript"
        read -p "Naciśnij Enter, aby zakończyć..."
        exit 1
    fi
fi

info "Inicjalizacja konfiguracji TypeScript..."
if [ ! -f "tsconfig.json" ]; then
    run_hidden npx tsc --init
fi

info "Kompilowanie projektu..."
run_hidden tsc
if [ $? -ne 0 ]; then
    error "Błąd kompilacji TypeScript"
    echo -e "\nSprawdź:"
    echo -e "1. Czy pliki źródłowe istnieją w folderze src/"
    echo -e "2. Czy tsconfig.json jest poprawnie skonfigurowany"
    echo -e "3. Czy nie ma błędów składniowych w kodzie TypeScript\n"
    read -p "Naciśnij Enter, aby zakończyć..."
    exit 1
fi

info "Uruchamianie aplikacji..."
npm run start

if [ $? -eq 0 ]; then
    success "Aplikacja została zamknięta"
else
    error "Wystąpił błąd podczas uruchamiania"
fi

read -p "Naciśnij Enter, aby zakończyć..."
exit 0