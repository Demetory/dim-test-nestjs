# Backend

[Nest 9](https://nestjs.com/) + [TypeScript 5](https://www.typescriptlang.org/) + [PostgreSQL 8](https://www.postgresql.org/)

## Requirements

- [Docker](https://www.docker.com/) >= 4.18.0
- [Node.js](https://nodejs.org/en/) >= 18.15.0
- [npm](https://www.npmjs.com/) >= 9.5.0

## Recommended IDE

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Installed Modules

- [Swagger 6](https://swagger.io/) &rarr; API
- [ESLint 8](https://eslint.org/) + [Prettier 2](https://prettier.io/) &rarr; code quality

## Installation

### Run docker containers

```bash
# make sure you have docker installed ^-^
$ docker-compose up
```

### Install dependencies

```bash
$ npm install
```

### Update deps if needed

```bash
npm update
```

### Running the app on http://localhost:5000

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

MIT [Demetory](https://demetrey.ru)
