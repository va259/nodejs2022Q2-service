# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```sh
git clone https://github.com/va259/nodejs2022Q2-service.git
cd nodejs2022Q2-service
```

Switch to appropriate branch:

- Bare NestJS app

```sh
git checkout dev
```

- Dockerized NestJS app

```sh
git checkout docker
```

## Installing NPM modules

```sh
npm install
```

## Build Docker containers

```sh
docker-compose build
```

## Run script for vulnerabilities scanning

```sh
npm run scan:app
npm run scan:db
```

## Run the app with the db in containers

```sh
docker-compose up
```

## Stop the containers

```sh
docker-compose down
```

## Pull Docker images from Docker Hub

```sh
docker pull va259/service
docker pull va259/db
```

## Running application

```sh
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```sh
npm run test
```

To run only one of all test suites

```sh
npm run test -- <path to suite>
```

To run all test with authorization

```sh
npm run test:auth
```

To run only specific test suite with authorization

```sh
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```sh
npm run lint
```

```sh
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
