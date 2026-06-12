# 🚀 Быстрая установка popApi

## Windows

### Способ 1: Через PowerShell (Рекомендуется)

1. Откройте PowerShell как администратор
2. Выполните:
```powershell
# Установка Node.js (если не установлена)
irm get.scoop.sh | iex  # или скачайте с nodejs.org

# Установка popApi
npm install -g popapi

# Проверка
popapi help
```

### Способ 2: Через Git Bash
```bash
npm install -g popapi
popapi help
```

---

## macOS

### Через Homebrew (Рекомендуется)
```bash
# Установка Node.js
brew install node

# Установка popApi
npm install -g popapi

# Проверка
popapi help
```

### Через npm напрямую
```bash
npm install -g popapi
```

---

## Linux (Ubuntu/Debian)

```bash
# Обновление пакетов
sudo apt update

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка popApi
sudo npm install -g popapi

# Проверка
popapi help
```

### Другие дистрибутивы Linux

**Fedora/RHEL:**
```bash
sudo dnf install nodejs npm
sudo npm install -g popapi
```

**Arch Linux:**
```bash
sudo pacman -S nodejs npm
sudo npm install -g popapi
```

**OpenSUSE:**
```bash
sudo zypper install nodejs npm
sudo npm install -g popapi
```

---

## Termux (Android)

### Полная установка

```bash
# 1. Обновление Termux
pkg update -y && pkg upgrade -y

# 2. Установка Node.js
pkg install -y nodejs

# 3. Установка popApi
npm install -g popapi

# 4. Проверка
popapi help
```

### Быстрый скрипт
```bash
curl -sSL https://raw.githubusercontent.com/yourusername/popapi/main/install.sh | bash
```

### Основные команды Termux
```bash
# Обновить popApi
npm update -g popapi

# Удалить popApi
npm uninstall -g popapi

# Проверить версию
popapi --version
```

### Работа с файлами на Termux
```bash
# Загрузить файлы с Download
popapi push ~/storage/downloads/myfiles myrepo

# Загрузить фото с камеры
popapi push ~/storage/pictures myrepo photos

# Загрузить из DCIM
popapi push ~/storage/shared/DCIM/Camera myrepo backup
```

---

## Первые шаги на любой платформе

### 1️⃣ Установка
```bash
npm install -g popapi
```

### 2️⃣ Получение GitHub токена

Перейдите на: https://github.com/settings/tokens/new

Настройки:
- Token name: `popApi`
- Expiration: `No expiration` (или выберите дату)
- Select scopes: отметьте `repo` ✓
- Generate token

**Копируйте токен сразу!** Больше не сможете его увидеть.

### 3️⃣ Настройка
```bash
popapi setup
```

Введите:
```
Enter your GitHub token: ghp_xxxxxxxxxxxxxxxxxxxxxxxx
Enter your GitHub username: myusername
Enter default repository name: myrepo
```

### 4️⃣ Первая загрузка
```bash
popapi push ./my-files myrepo
```

Все готово! ✅

---

## Проверка установки

```bash
# Проверить версию popApi
popapi --version

# Проверить Node.js
node --version

# Проверить npm
npm -v

# Проверить конфигурацию
cat ~/.popapi/config.json  # Linux/macOS
type %USERPROFILE%\.popapi\config.json  # Windows
```

---

## Обновление popApi

```bash
# Проверить обновления
npm outdated -g popapi

# Обновить
npm update -g popapi

# Или переустановить последнюю версию
npm install -g popapi@latest
```

---

## Деинсталляция

```bash
npm uninstall -g popapi
```

---

## Решение проблем

### ❌ "popapi: command not found"

**На Linux/macOS:**
```bash
# Проверить путь
npm config get prefix

# Убедиться, что это в PATH
export PATH=$(npm config get prefix)/bin:$PATH

# Добавить в .bashrc/.zshrc
echo 'export PATH=$(npm config get prefix)/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

**На Windows:**
- Перезагрузите PowerShell
- Или переустановите Node.js

### ❌ "permission denied"

```bash
# На Linux/macOS используйте sudo
sudo npm install -g popapi
```

### ❌ "npm: command not found"

Переустановите Node.js с nodejs.org

### ❌ На Termux не работает

```bash
# Переустановите Node.js
pkg uninstall nodejs
pkg install nodejs

# Переустановите popApi
npm install -g popapi
```

---

## Локальная установка (без глобального)

Если не хотите глобальную установку:

```bash
# Клонируйте репозиторий
git clone https://github.com/yourusername/popapi.git
cd popapi

# Установка зависимостей
npm install

# Использование через node
node index.js setup
node index.js push ./files myrepo
```

---

## Docker установка

```bash
# Создайте образ
docker build -t popapi .

# Используйте
docker run --rm -it popapi popapi help
```

---

## Что дальше?

- 📖 Читайте [README.md](README.md) для деталей
- 🔧 Смотрите [ADVANCED.md](ADVANCED.md) для продвинутых примеров
- 💬 Задавайте вопросы в Issues
- 🐛 報告об ошибках

**Успешной работы с popApi! 🚀**
