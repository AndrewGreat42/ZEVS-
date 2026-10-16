# Модель данных и ER-диаграмма

Первая целевая версия модели — четыре таблицы: сотрудники, номера, гости и брони.

```mermaid
erDiagram
  EMPLOYEES ||--o{ BOOKINGS : creates
  ROOMS ||--o{ BOOKINGS : reserves
  GUESTS ||--o{ BOOKINGS : books
  EMPLOYEES {
    bigint id PK
    varchar username UK
    varchar password_hash
    varchar role
    boolean active
  }
  ROOMS {
    bigint id PK
    varchar number UK
    varchar category
    integer capacity
    numeric price_per_night
    boolean active
  }
  GUESTS {
    bigint id PK
    varchar full_name
    varchar phone
    varchar email
  }
  BOOKINGS {
    bigint id PK
    bigint room_id FK
    bigint guest_id FK
    bigint created_by FK
    date check_in
    date check_out
    varchar status
    numeric nightly_rate
    numeric total_amount
    timestamp created_at
  }
```

## Сущности

**employees:** учётные записи персонала с ролью `ADMIN` или `RECEPTIONIST` и хешем пароля (создание пользователей в приложении пока не реализовано).

**rooms:** номер, категория, вместимость, цена за ночь, активность.

**guests:** ФИО, телефон и необязательный email.

**bookings:** связи с гостем, номером и ответственным сотрудником, даты, статус, стоимость, дата создания.

## Ключевые ограничения

1. Уникальные значения `rooms.number` и `employees.username`.
2. Вместимость `>= 1`, стоимость ночи `> 0`, итог `> 0`.
3. `check_out > check_in`.
4. Ограниченный набор значений роли и статуса.
5. Внешние ключи; удаление связанных данных не уничтожает бронь.
6. `EXCLUDE USING gist` с `daterange(check_in, check_out, '[)')` предотвращает пересекающиеся **неотменённые** бронирования одного номера даже в условиях конкуренции запросов.


