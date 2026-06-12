# 🚀 popApi v2.0 - GitHub Batch Upload Tool

**Быстрый и удобный инструмент для массовой загрузки файлов в репозитории GitHub.**

PopApi теперь имеет **веб-интерфейс** и **CLI** для максимальной гибкости!

---

## ✨ Новые возможности v2.0

✅ **Веб-интерфейс** - управление через браузер на `http://localhost:3000`
✅ **Конфигурация в UI** - настройка GitHub токена прямо в приложении
✅ **Drag & Drop** - перетаскивание файлов для загрузки
✅ **История загрузок** - отслеживание всех выполненных операций
✅ **CLI режим** - по-прежнему работает как команда `popapi`
✅ **Безопасное хранение** - конфигурация хранится локально в `~/.popapi/`
✅ **Адаптивный дизайн** - работает на всех устройствах

---

## 📋 Требования

- **Node.js** >= 14.0.0
- **npm** или **yarn**
- **GitHub аккаунт** с личным токеном доступа

---

## 🔧 Установка

### 1. Установка из npm (когда будет опубликовано)

```bash
npm install -g popapi
```

### 2. Локальная установка для разработки

```bash
# Клонировать репозиторий
git clone https://github.com/yourusername/popapi.git
cd popapi

# Установить зависимости
npm install

# Создать глобальную команду (опционально)
npm link
```

---

## 🌐 Веб-интерфейс

### Запуск

```bash
# Через CLI команду
popapi web

# Или напрямую
npm start

# Для разработки с перезагрузкой
npm run dev
```

Затем откройте в браузере: **http://localhost:3000**

### Использование

1. **⚙️ Конфигурация**
   - Введите GitHub токен
   - Укажите имя пользователя GitHub
   - Сохраните конфигурацию

2. **📁 Загрузка файлов**
   - Выберите файлы или перетащите их
   - Укажите название репозитория
   - (Опционально) выберите ветку
   - Нажмите "Upload to GitHub"

3. **📊 История**
   - Просмотрите все загрузки
   - Отслеживайте статус каждой операции

---

## 💻 Использование CLI

### Настройка (интерактивная)

```bash
popapi setup
```

Будут запрошены:
- GitHub token
- GitHub username
- Default repository (опционально)

### Загрузка файлов

```bash
# Загрузить папку в репозиторий (ветка main)
popapi push ./src myrepo

# Загрузить в конкретную ветку
popapi push ./build myrepo develop

# Если установлен defaultRepo, можно:
popapi push ./files
```

### Другие команды

```bash
# Справка
popapi help

# Запуск веб-интерфейса
popapi web
```

---

## 🔐 GitHub Токен

### Как создать личный токен доступа:

1. Перейти на https://github.com/settings/tokens
2. Нажать "Generate new token"
3. Дать название: `popApi`
4. Выбрать scope `repo` (Full control of private repositories)
5. Нажать "Generate token"
6. Скопировать токен и сохранить в безопасном месте

### ⚠️ Безопасность

- **НИКОГДА** не делитесь токеном
- **НИКОГДА** не коммитьте конфиг-файл в Git
- Если токен скомпрометирован - удалите его на GitHub и создайте новый
- Используйте GitHub secrets для CI/CD

---

## 📁 Структура проекта

```
popapi/
├── server.js              # Веб-сервер Express.js
├── cli.js                 # CLI приложение
├── package.json           # Зависимости
├── public/
│   └── index.html         # Веб-интерфейс
├── README.md              # Этот файл
└── config.example.json    # Пример конфигурации
```

---

## 💾 Хранение данных

Все данные хранятся локально:

```
~/.popapi/
├── config.json           # Конфигурация (GitHub токен и username)
├── history.json          # История загрузок
└── uploads/              # Временная папка для загруженных файлов
```

---

## 🚀 Примеры использования

### Пример 1: Загрузить сборку в репозиторий

```bash
# Через CLI
popapi push ./dist my-website-repo

# Или через веб-интерфейс
# 1. Откройте http://localhost:3000
# 2. Загрузите файлы через drag & drop
# 3. Укажите репозиторий "my-website-repo"
# 4. Нажмите Upload
```

### Пример 2: Загрузить файлы на определенную ветку

```bash
# CLI
popapi push ./src my-project develop

# Веб-интерфейс
# - Укажите репозиторий: "my-project"
# - Укажите ветку: "develop"
# - Загрузите файлы
```

### Пример 3: Использование default repository

```bash
# В конфигурации указать defaultRepo: "my-default-repo"
popapi setup

# Теперь можно просто:
popapi push ./files
```

---

## 🔍 Решение проблем

### Ошибка: "Not configured"

```bash
# Запустите setup
popapi setup

# Или введите данные через веб-интерфейс на http://localhost:3000
```

### Ошибка: "Repository not found"

- Проверьте название репозитория
- Убедитесь, что репозиторий существует
- Проверьте, что токен имеет доступ к репозиторию

### Ошибка: "Invalid token"

- Создайте новый токен на https://github.com/settings/tokens
- Убедитесь, что у токена есть scope `repo`
- Если токен скомпрометирован, удалите его на GitHub

### Сервер не запускается на порту 3000

```bash
# Используйте другой порт
PORT=8080 popapi web

# Или через npm
PORT=8080 npm start
```

---

## 📊 API Endpoints

Если вы хотите интегрировать popApi в свое приложение:

### GET /api/config
Получить текущую конфигурацию

```bash
curl http://localhost:3000/api/config
```

### POST /api/config
Сохранить конфигурацию

```bash
curl -X POST http://localhost:3000/api/config \
  -H "Content-Type: application/json" \
  -d '{"token":"ghp_...", "username":"john"}'
```

### POST /api/upload
Загрузить файлы

```bash
curl -X POST http://localhost:3000/api/upload \
  -F "files=@file1.txt" \
  -F "files=@file2.txt" \
  -F "repo=my-repo" \
  -F "branch=main"
```

### GET /api/history
Получить историю загрузок

```bash
curl http://localhost:3000/api/history
```

---

## 🤝 Разработка и Контрибуция

Мы приветствуем контрибуции! Вот как помочь:

1. Fork репозиторий
2. Создайте ветку для вашей фичи (`git checkout -b feature/amazing-feature`)
3. Коммитьте изменения (`git commit -m 'Add amazing feature'`)
4. Push в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

---

## 📝 Лицензия

MIT License - смотрите файл LICENSE

---

## 👥 Автор

**popApi Contributors** 

Вопросы и предложения: [GitHub Issues](https://github.com/yourusername/popapi/issues)

---

## 🎯 Roadmap

- [ ] Поддержка загрузки больших файлов (>100MB)
- [ ] Планирование загрузок
- [ ] Синхронизация между девайсами
- [ ] Поддержка GitLab и Gitea
- [ ] Веб-версия с облаком
- [ ] Docker контейнер

---

## ❤️ Спасибо за использование popApi!

Если вам нравится проект - поставьте ⭐ на GitHub!
