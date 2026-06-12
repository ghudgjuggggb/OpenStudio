# popApi 🚀

**Быстрый инструмент для загрузки множества файлов на GitHub**

Работает на:
- ✅ Linux (Ubuntu, Debian, Fedora, и т.д.)
- ✅ macOS (Intel и Apple Silicon)
- ✅ Windows (cmd, PowerShell, Git Bash)
- ✅ Termux (Android)

## Установка

### 1️⃣ Установка Node.js

#### Linux/macOS
```bash
# Используя curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Windows
Скачайте с [nodejs.org](https://nodejs.org) и установите

#### Termux
```bash
pkg update
pkg install nodejs
```

### 2️⃣ Установка popApi

```bash
npm install -g popapi
```

или локально:

```bash
npm install
node index.js
```

## Быстрый старт

### Шаг 1: Настройка
```bash
popapi setup
```

Введите:
- GitHub токен (создайте на [github.com/settings/tokens](https://github.com/settings/tokens))
- GitHub username
- Репозиторий по умолчанию (опционально)

### Шаг 2: Загрузка файлов
```bash
popapi push ./путь/к/файлам имя-репозитория
```

### Шаг 3: Готово! ✅
Файлы загружены на GitHub

## Примеры использования

### Загрузить папку src в главную ветку
```bash
popapi push ./src myrepo
```

### Загрузить файлы в отдельную ветку
```bash
popapi push ./build myrepo develop
```

### Загрузить всё в текущей папке
```bash
popapi push . myrepo
```

### На Termux
```bash
# Установка
pkg install nodejs
npm install -g popapi

# Использование
popapi setup
popapi push /storage/emulated/0/Download/files myrepo
```

## Команды

| Команда | Описание |
|---------|---------|
| `popapi setup` | Настройка GitHub токена и username |
| `popapi push <путь> <репо> [ветка]` | Загрузить файлы |
| `popapi help` | Справка |

## Как получить GitHub токен

1. Перейдите на [github.com/settings/tokens](https://github.com/settings/tokens)
2. Нажмите "Generate new token"
3. Дайте название: `popApi`
4. Выберите scope: `repo` (Full control of private repositories)
5. Нажмите "Generate token"
6. **Копируйте токен сразу** (больше не сможете увидеть)

## Особенности

✨ **Рекурсивная загрузка** - автоматически загружает все файлы из подпапок
🔄 **Кроссплатформа** - Windows, Mac, Linux, Termux
⚡ **Быстро** - загружает множество файлов параллельно
📊 **Отчеты** - показывает результаты загрузки
🔐 **Безопасно** - токен сохраняется локально в ~/.popapi/

## Структура конфигурации

Конфиг сохраняется в `~/.popapi/config.json`:
```json
{
  "token": "ghp_xxxxxxxxxxxxxxxx",
  "username": "myusername",
  "defaultRepo": "myrepo"
}
```

## Возможные ошибки

| Ошибка | Решение |
|--------|---------|
| `Not configured` | Запустите `popapi setup` |
| `HTTP 401` | Проверьте токен (истек или неверный) |
| `HTTP 404` | Репозиторий не существует или приватный |
| `HTTP 422` | Файл уже существует (обновляется автоматически) |

## Лицензия

MIT

## Помощь и поддержка

Найдите проблему? 
- Проверьте GitHub токен
- Убедитесь, что репозиторий существует
- Проверьте доступ к интернету
- Запустите `popapi help`

---

**Сделано с ❤️ для быстрой загрузки файлов на GitHub**
