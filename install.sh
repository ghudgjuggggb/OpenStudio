#!/usr/bin/env bash
# popApi Installer Script

set -e

VERSION="1.0.0"
REPO_URL="https://github.com/yourusername/popapi"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функции вывода
print_header() {
  echo -e "${BLUE}"
  echo "╔════════════════════════════════════╗"
  echo "║        popApi Installer v${VERSION}        ║"
  echo "║    GitHub Batch Upload Tool        ║"
  echo "╚════════════════════════════════════╝"
  echo -e "${NC}"
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

# Проверка OS
detect_os() {
  case "$OSTYPE" in
    linux-gnu*) echo "linux" ;;
    darwin*) echo "macos" ;;
    msys|cygwin|win32) echo "windows" ;;
    *) echo "unknown" ;;
  esac
}

# Проверка Node.js
check_node() {
  if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    print_success "Node.js найден: $NODE_VERSION"
    return 0
  else
    return 1
  fi
}

# Установка Node.js
install_node() {
  OS=$(detect_os)
  print_warning "Node.js не найден. Требуется установка..."
  
  case $OS in
    linux)
      print_info "Установка Node.js на Linux..."
      curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
      sudo apt-get install -y nodejs
      ;;
    macos)
      print_info "Установка Node.js на macOS..."
      if command -v brew &> /dev/null; then
        brew install node
      else
        print_error "Требуется Homebrew. Установите с https://brew.sh"
        exit 1
      fi
      ;;
    windows)
      print_error "На Windows установите Node.js с https://nodejs.org"
      exit 1
      ;;
    *)
      print_error "OS не поддерживается. Установите Node.js вручную"
      exit 1
      ;;
  esac
}

# Главная установка
install_popapi() {
  print_header
  
  # Проверка Node.js
  print_info "Проверка зависимостей..."
  if ! check_node; then
    install_node
  fi
  
  # Проверка npm
  if ! command -v npm &> /dev/null; then
    print_error "npm не найден"
    exit 1
  fi
  
  print_success "npm найден: $(npm -v)"
  
  # Установка popApi
  print_info "Установка popApi глобально..."
  npm install -g popapi
  
  if command -v popapi &> /dev/null; then
    print_success "popApi успешно установлен!"
    print_info "Запустите 'popapi help' для справки"
  else
    print_error "Установка не удалась"
    exit 1
  fi
}

# Постустановочная настройка
post_install() {
  echo ""
  read -p "Настроить сейчас? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    popapi setup
    print_success "Готово! Используйте: popapi push <путь> <репо>"
  fi
}

# Для Termux
termux_install() {
  print_header
  
  print_info "Обнаружена Termux"
  print_info "Обновление пакетов..."
  pkg update -y
  
  print_info "Установка Node.js..."
  pkg install -y nodejs
  
  print_info "Установка popApi..."
  npm install -g popapi
  
  print_success "popApi установлена в Termux!"
  post_install
}

# Проверка Termux
is_termux() {
  [[ -d "$PREFIX" ]] && [[ "$PREFIX" == *"termux"* ]]
}

# Главная точка входа
main() {
  if is_termux; then
    termux_install
  else
    install_popapi
    post_install
  fi
  
  echo ""
  print_success "Установка завершена!"
  echo ""
  echo "Дальнейшие шаги:"
  echo "  1. popapi setup"
  echo "  2. popapi push ./путь/к/файлам имя-репо"
  echo ""
  echo "Документация: $REPO_URL"
  echo ""
}

main "$@"
