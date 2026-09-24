# Online Store

Полноценный каркас интернет-магазина на Django REST Framework + React + PostgreSQL + Docker.

## Что входит

- регистрация и авторизация пользователя;
- каталог товаров;
- категории товаров;
- страница товара;
- поиск и фильтрация;
- корзина и изменение количества;
- оформление заказа;
- история заказов;
- личный кабинет;
- административная часть Django;
- REST API;
- React-интерфейс;
- PostgreSQL;
- Docker;
- пример .env файла.

## Структура проекта

- `backend/` — Django API backend;
- `react-start/` — React-приложение;
- `docker-compose.yml` — запуск PostgreSQL, Django и React;
- `.env.example` — переменные окружения;
- `.gitignore` — игнорируемые файлы.

## Запуск через Docker

1. Создайте копию `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Запустите проект:
   ```bash
   docker compose up --build
   ```
3. Откройте:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/
   - Admin: http://localhost:8000/admin/

## Локальный запуск backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Локальный запуск frontend

```bash
cd react-start
npm install
npm run dev
```

## Архитектура и реализация

React загружает каталог через Axios из Django REST API. Если backend не запущен, интерфейс использует встроенные демонстрационные данные, поэтому frontend можно открыть отдельно. Корзина в демонстрационном режиме хранится в React state; при наличии токена авторизации добавление и оформление заказа выполняются через backend API. Заказы и история пользователя хранятся в PostgreSQL.

## Основные API-эндпойнты

- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/logout/`
- `GET /api/products/`
- `GET|POST /api/products/`
- `GET|PUT|DELETE /api/products/<id>/`
- `GET|POST /api/categories/`
- `GET|PUT|DELETE /api/categories/<id>/`
- `GET /api/cart/`
- `POST /api/cart/add/`
- `PATCH /api/cart/update/<id>/`
- `DELETE /api/cart/remove/<id>/`
- `POST /api/orders/create/`
- `GET /api/orders/`
- `GET /api/orders/<id>/`
- `GET /api/profile/`

Каталог поддерживает параметры `search`, `category`, `min_price` и `max_price`. Изменение и удаление товаров и категорий доступны администратору; просмотр каталога открыт всем.

## Использование AI

В процессе разработки использовался GitHub Copilot.

AI применялся для:

- генерации отдельных участков кода;
- поиска и объяснения ошибок;
- рефакторинга React-компонентов;
- подготовки документации.

AI-assisted код помечен непосредственно в исходных файлах. Архитектура проекта, интеграция компонентов и проверка результата выполнены разработчиком.

## Автор

Учебный проект интернет-магазина Django + React.
