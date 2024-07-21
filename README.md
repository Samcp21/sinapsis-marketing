<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Requisitos Previos

1. **Node.js**: Asegúrate de tener Node.js instalado en tu máquina. Puedes descargarlo desde [Node.js Official Website](https://nodejs.org/).

2. **Instalar Docker:**

   - Descarga e instala Docker desde [Docker Desktop](https://www.docker.com/products/docker-desktop).

3. **Configurar Docker Compose:**

   - Asegúrate de tener un archivo `docker-compose.yml` en la raíz de tu proyecto. Utilice el archivo por defecto para crear el entorno local
   - Ejecuta el siguiente comando para iniciar los servicios definidos en docker-compose.yml:

```bash
$ docker-compose up -d
```

4. **Cuenta de AWS**: Necesitarás una cuenta de AWS y las credenciales configuradas en tu entorno.

5. **Serverless Framework**: Instala Serverless Framework globalmente en tu sistema:

   ```bash
   npm install -g serverless
   ```

6. **Configurar una cuenta de AWS:**

## Instalacion

1. **Copia el archivo de ejemplo**: El archivo `.env.example` contiene las variables de entorno necesarias para la aplicación. Debes copiar este archivo y renombrarlo a `.env`.

```bash
# Instalar dependencias
$ npm install
```

## Uso

1. Inicia el servidor

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

2. Accede a la documentación de la API

```bash
$ http://localhost:3000/api
```

3. Inicializa la base de datos

```bash
# Instalar dependencias
$ http://localhost:3000/api#/Seed/SeedController_executedSeed
```

4. Obten tu token

```bash
$ http://localhost:3000/api#/Auth/AuthController_loginUser
```

5. Registra tu token en Authorize para usar todas las Apis

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running the app with serverless

```bash
# development
$ serverless offline

# production
$ serverless deploy
```

## Technical test

1. **Implementar el Modelo de Base de Datos con MySQL** ✅

- La base de datos se encuentra en el entorno local con Docker

2. **Diseñar el Endpoint con OpenAPI para Listar Mensajes Activos Programados** ✅

```bash
$ /api#/Mensajes/MessagesController_findActive
```

3. **Implementar el Endpoint para Listar Mensajes Activos Programados** ✅

```bash
$ /messages/active
```

4. **Diseñar el Endpoint con OpenAPI para Programar una Campaña** ✅

```bash
$ /api#/Campanias/CampaignsController_programCampaign
```

5. **Implementar el Endpoint para Programar una Campaña** ✅

```bash
$ /campaigns/program
```

6. **Desarrollar Pruebas Unitarias** ✅

```bash
$ npm run test:watch
```

7. **Incluir el plugin serverless offline para probar localmente los servicios** ✅

```bash
$ serverless offline
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
