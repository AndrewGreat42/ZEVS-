# ZEVS — Hotel CRM

**Тема:** Разработка CRM-системы для автоматизации деятельности малого гостиничного предприятия.

Учебный проект команды из четырёх человек. CRM предназначена для работы с номерным фондом, гостями и бронированиями небольшого отеля, включая заселение, выезд и проверку доступности номеров.

## Документация

- [Функциональные требования к системе](docs/requirements/requirements.md)
- [Бизнес-правила](docs/requirements/business-rules.md)
- [Архитектура программного решения](docs/design/architecture.md)
- [База данных и ER-диаграмма](docs/design/database.md)
- [Спецификация REST API](docs/design/api.md)
- [План клиентской части](docs/design/frontend.md)

## Команда и управление проектом

- [Состав и распределение ролей](docs/management/roles.md)
- [Паспорт проекта](docs/management/passport.md)
- [План-график](docs/management/plan.md)


## Технологический стек

| Компонент | Технологии |
|---|---|
| Backend | Java 21, Spring Boot 3, Spring Web, Spring Data JPA, Spring Security |
| Frontend | JavaScript, React, Vite |
| База данных | PostgreSQL 17, Flyway |
| API | REST, JSON |
| Тестирование | JUnit 5, GitHub Actions |
| Инфраструктура | GitHub, Issues/Projects, Docker Compose |

## Локальный запуск

Понадобятся JDK 21, Maven, Node.js 20+ и Docker.

1. В корне репозитория: `docker compose up -d`
2. В каталоге `backend`: `mvn spring-boot:run`
3. В каталоге `frontend`: `npm install`, затем `npm run dev`
4. Проверка сервера: http://localhost:8080/api/health
5. Frontend: http://localhost:5173

Для демонстрации используются тестовые данные.
