# popApi - Продвинутые примеры

## 📋 Сценарии использования

### 1. Автоматическая загрузка после сборки проекта

**Bash скрипт** (`deploy.sh`)
```bash
#!/bin/bash

# Собираем проект
npm run build

# Загружаем на GitHub
popapi push ./dist myrepo main

echo "✅ Проект успешно развёрнут!"
```

Использование:
```bash
chmod +x deploy.sh
./deploy.sh
```

### 2. Загрузка с разных веток для разных окружений

```bash
# Development
popapi push ./build myrepo develop

# Staging
popapi push ./build myrepo staging

# Production
popapi push ./build myrepo main
```

### 3. Batch загрузка нескольких проектов

**Скрипт** (`batch-upload.sh`)
```bash
#!/bin/bash

projects=(
  "./frontend:my-frontend:main"
  "./backend:my-backend:main"
  "./mobile:my-mobile:develop"
)

for project in "${projects[@]}"; do
  IFS=':' read -r path repo branch <<< "$project"
  echo "📦 Загружаю $path в $repo ($branch)..."
  popapi push "$path" "$repo" "$branch"
done
```

### 4. Загрузка с расписанием (cron)

Добавить в crontab:
```bash
crontab -e

# Загружать файлы каждый день в 3 ночи
0 3 * * * /usr/local/bin/popapi push /home/user/backups myrepo backup
```

### 5. Загрузка через Docker

**Dockerfile**
```dockerfile
FROM node:18-alpine

RUN npm install -g popapi

WORKDIR /app
COPY . .

ENV GITHUB_TOKEN=${GITHUB_TOKEN}
ENV GITHUB_USERNAME=${GITHUB_USERNAME}

CMD ["popapi", "push", ".", "${GITHUB_REPO}", "main"]
```

Использование:
```bash
docker build -t popapi-uploader .

docker run \
  -e GITHUB_TOKEN="ghp_xxxxx" \
  -e GITHUB_USERNAME="myusername" \
  -e GITHUB_REPO="myrepo" \
  popapi-uploader
```

### 6. На Termux с автоматическим резервным копированием

```bash
#!/bin/bash
# backup-to-github.sh

BACKUP_DIR="/storage/emulated/0/DCIM/Camera"
REPO="my-photo-backup"
DATE=$(date +%Y-%m-%d)

# Создаём папку с датой
mkdir -p "/tmp/backup_$DATE"
cp -r "$BACKUP_DIR"/* "/tmp/backup_$DATE/"

# Загружаем
popapi push "/tmp/backup_$DATE" "$REPO" "main"

echo "✅ Резервная копия загружена!"
```

### 7. Загрузка с фильтрацией файлов

Модифицированный скрипт (`selective-upload.sh`)
```bash
#!/bin/bash

path=$1
repo=$2

# Копируем только нужные файлы
mkdir -p /tmp/filtered
find "$path" -type f \( -name "*.js" -o -name "*.json" \) -exec cp {} /tmp/filtered/ \;

# Загружаем отфильтрованные файлы
popapi push /tmp/filtered "$repo" main

# Очищаем временные файлы
rm -rf /tmp/filtered
```

### 8. Загрузка с логированием

```bash
#!/bin/bash

LOG_FILE="./upload_$(date +%Y-%m-%d).log"

{
  echo "=== Начало загрузки: $(date) ==="
  popapi push ./src myrepo main
  echo "=== Конец загрузки: $(date) ==="
} | tee -a "$LOG_FILE"
```

### 9. Совместное использование с Git

```bash
#!/bin/bash

# 1. Коммитим локально
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M')"

# 2. Пушим на GitHub стандартным способом
git push origin main

# 3. Дополнительно загружаем артефакты
popapi push ./build myrepo artifacts
```

### 10. Интеграция с CI/CD (GitHub Actions)

**.github/workflows/deploy.yml**
```yaml
name: Deploy with popApi

on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install popApi
        run: npm install -g popapi
      
      - name: Upload files
        run: |
          popapi setup << EOF
          ${{ secrets.GITHUB_TOKEN }}
          ${{ secrets.GITHUB_USERNAME }}
          myrepo
          EOF
          popapi push ./dist myrepo main
```

### 11. На Windows с PowerShell

```powershell
# setup-popapi.ps1

# Проверяем Node.js
node --version

# Устанавливаем popApi
npm install -g popapi

# Настраиваем
popapi setup

# Используем
popapi push .\src myrepo main
```

### 12. Загрузка со статусом-бары

Расширенный скрипт с прогрессом:
```bash
#!/bin/bash

path=$1
repo=$2
total_files=$(find "$path" -type f | wc -l)
current=0

echo "📊 Начинаю загрузку $total_files файлов..."

popapi push "$path" "$repo" main

echo "✅ Загрузка завершена!"
echo "📈 Загружено: $total_files файлов"
echo "🔗 Репозиторий: https://github.com/$(git config user.name)/$repo"
```

## 🔧 Переменные окружения

```bash
# Для автоматизации
export POPAPI_TOKEN="ghp_xxxxx"
export POPAPI_USERNAME="myusername"
export POPAPI_REPO="myrepo"

popapi push ./files $POPAPI_REPO main
```

## ⚡ Производительность

Советы для быстрой загрузки:

1. **Исключайте ненужные файлы** через .gitignore
2. **Сжимайте файлы** перед загрузкой
3. **Разделяйте на несколько веток** для больших проектов
4. **Используйте параллельные загрузки** (планируется в v2.0)

## 🐛 Отладка

Включить verbose режим:
```bash
# Добавьте в начало скрипта
set -x

popapi push ./src myrepo main

# Или просмотрите логи
cat ~/.popapi/config.json
```

## 📚 Дополнительные ресурсы

- GitHub API: https://docs.github.com/en/rest
- Node.js: https://nodejs.org/docs/
- Termux: https://termux.com/

---

**Успешных загрузок! 🚀**
