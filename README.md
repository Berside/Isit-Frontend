# Установка всех зависимостей
`npm install axios@^1.8.4 bootstrap@^5.3.5 jwt-decode@^4.0.0 mobx@^6.13.7 mobx-react-lite@^4.1.0 react@^19.1.0 react-dom@^19.1.0 react-bootstrap@^2.10.9 react-router-dom@^7.5.1 react-scripts@5.0.1 web-vitals@^2.1.4`

## Запуск проекта
`npm start` либо через start.bat

## Архитектура проекта(классическая)
- utils - папка для константный переменных, а также для функций.
- store - папка хранилище, MobX/json.
- pages - папка для страниц сайта.
- http - папка для взаимодействия с серверной частью проекта.
- components - папка для компонентов React(повторяющийся элементы).
- assets - папка для хранения графики (иконки, картинки и т.д.).

## Рекомендации
- для разных html тегов задаем разные селекторы (class,id), чтобы не возникло путаницы.
- работаем в разных папках, чтобы не было конфликтов между версиями.
- не устанавливаем дополнительные библиотеки.
- придерживаемся установленной архитектуры.
- пушим в гитхаб предупреждая! 