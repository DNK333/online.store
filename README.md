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

## Основные API-эндпойнты

- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `GET /api/products/`
- `GET /api/products/<id>/`
- `GET /api/categories/`
- `GET /api/cart/`
- `POST /api/cart/add/`
- `PATCH /api/cart/update/<id>/`
- `POST /api/orders/`
- `GET /api/orders/`
- `GET /api/profile/`
