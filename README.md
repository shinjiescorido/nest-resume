## Resume API
 This is an API using Node.js platform and Nest.js framework

## Requirements
1. Docker
2. Docker-compose
3. Git
4. .env file
```
MONGODB_DB_HOST=
MONGODB_DB_NAME=
MONGODB_LOCAL_PORT=
MONGODB_DOCKER_PORT=

NODE_LOCAL_PORT=
NODE_DOCKER_PORT=
```
## Running the app

```bash
# clone repo
$ git clone https://github.com/shinjiescorido/nest-resume.git

# run docker-compose
$ docker-compose up -d
```

## Test

```bash
# lint
$ npm run lint

# unit tests
$ npm run test
```

## Remarks
 This API is a dependency for the Resume APP ( front-end ). Please see details in this repository: 
*https://github.com/shinjiescorido/vue-resume*

