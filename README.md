Этот проект был запущен с [Create React App](https://create-react-app.dev/).

Среда исполнения: **NodeJS v14**

## Структура проекта

```
src/
  api/
  components/
  lib/
  metrics/
  services/
  views/
```

- `api` - Обёртка для работы с `@vkontakte/vk-bridge` [https://vk.com/dev/vkbridge](https://vk.com/dev/vkbridge)
- `components` - Общие компоненты проекта, из которых можно собрать страницы, либо использовать независимо. Допускается использовать `components` при описании какой-то страницы.
- `lib` - Внутренняя бибилиотека общих вспомогательных функций. Допускается использовать `lib` при описании какой-то страницы или компонента.
- `metrics` - Метрики производительности проекта. Для сбора данных используется `web-vitals` [https://github.com/GoogleChrome/web-vitals](https://github.com/GoogleChrome/web-vitals).
- `views` - Страницы проекта. Вложенность должна отражать реальный роутинг в проекте.

## Доступные скрипты

Ниже представлен список скриптов доступных для исполнения:

### `yarn start`

Запускает сервер в режиме `development`.<br />
Сервер будет доступен по адресу [http://localhost:10888](http://localhost:10888).

В этом режиме страница перерисовывается при изменениях в исходом коде.<br />
Также в консоль выводятся ошибки форматирования.

### `yarn build`

Собирает приложение в режиме `production` в папку `build`.<br />
Собирает приложение в режиме `production` и оптимизирует сборку для лучшей производительности.<br />
Сборка минифицируется, а имена файлов имеют хэш.

### `yarn test`

Запускает среду для тестирования.<br />
Больше информации о среде тестирования можно найти в разделе посвященному [тестированию](https://create-react-app.dev/docs/running-tests/).

### `yarn lint`

Запускает все линтеры на проверку форматирования и исправление ошибок исходного кода.<br />
Это алиас для:

```bash
§ yarn lint:all:eslint
§ yarn lint:all:prettier
§ yarn lint:all:stylelint
```

### `yarn lint:eslint`

Запускает `eslint` на проверку форматирования и исправление ошибок исходного кода в заданной директории.
Больше информации о линтинге можно найти на сайте [eslint](https://eslint.org/docs/user-guide/getting-started).

### `yarn link:prettier`

Запускает `prettier` на проверку форматирования и исправление ошибок исходного кода в заданной директории.
Больше информации о линтинге можно найти на сайте [prettier](https://prettier.io/docs/en/install.html).

### `yarn lint:stylelint`

Запускает `stylelint` на проверку форматирования и исправление ошибок исходного кода в заданной директории.
Больше информации о линтинге можно найти на сайте [stylelint](https://stylelint.io/user-guide/get-started).

### `yarn lint:all:eslint`

Запускает `eslint` для всех `.js, .jsx, .ts, .tsx` файлов в директории `src`

### `yarn lint:all:prettier`

Запускает `prettier` для всех файлов в директории `src`

### `yarn lint:all:stylelint`

Запускает `stylelint` для всех `.css, .scss` файлов в директории `src`

### `yarn update:deps`

Запускает интерактивное обновление зависимостей проекта.

### `yarn update:cssdb`

Запускает обновление базы данных `caniuse-lite`
