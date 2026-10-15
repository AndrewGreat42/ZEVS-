# API-контракт v1 (проект)

Базовый префикс бизнес-API: `/api/v1`, формат JSON. **Все маршруты ниже, кроме `/api/health`, пока запланированы, но не реализованы.**

## Техническая проверка (стартовый каркас)

```http
GET /api/health
200 OK
{"status":"UP","service":"ZEVS Hotel CRM"}
```

## Авторизация

```http
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

## Номерной фонд

```http
GET  /api/v1/rooms?category=STANDARD
GET  /api/v1/rooms/{id}
POST /api/v1/rooms                     # ADMIN
PUT  /api/v1/rooms/{id}                # ADMIN
GET  /api/v1/rooms/available?checkIn=2026-11-10&checkOut=2026-11-13
```

## Гости

```http
GET  /api/v1/guests?query=Иванов
GET  /api/v1/guests/{id}
POST /api/v1/guests
PUT  /api/v1/guests/{id}
```

## Брони

```http
GET  /api/v1/bookings?status=CONFIRMED
GET  /api/v1/bookings/{id}
POST /api/v1/bookings
PUT  /api/v1/bookings/{id}
POST /api/v1/bookings/{id}/confirm
POST /api/v1/bookings/{id}/cancel
POST /api/v1/bookings/{id}/check-in
POST /api/v1/bookings/{id}/check-out
```

## Сводка

```http
GET /api/v1/dashboard?date=2026-11-15
```

### Пример запроса создания брони

```json
{"roomId":1,"guestId":2,"checkIn":"2026-11-10","checkOut":"2026-11-13"}
```

При успехе: `201 Created` с ID, статусом `PENDING` и суммой. Если номер занят: `409 Conflict`.

### Коды и ошибки

- `200` — успешное чтение/изменение;
- `201` — создано;
- `204` — успешное действие без тела;
- `400` — некорректные данные;
- `401` — не вошёл в систему;
- `403` — запрещённая ролью операция;
- `404` — объект отсутствует;
- `409` — конфликт броней или перехода статуса;
- `500` — неожиданная ошибка.

**Планируемый единый формат ошибки:**

```json
{"code":"ROOM_NOT_AVAILABLE","message":"Номер уже забронирован на выбранные даты"}
```

Способ хранения сессии и защиты входа необходимо детализировать при реализации FR-01/FR-18. Реальные персональные данные в учебных тестах не используются.
