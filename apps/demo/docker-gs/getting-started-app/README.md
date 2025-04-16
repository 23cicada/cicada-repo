## Containerize an application

```dockerfile
FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
```

```shell
docker build -t getting-started .
docker run -d -p 127.0.0.1:3000:3000 getting-started
docker ps
```
## Remove a container

```shell
docker ps
docker stop <the-container-id>
docker rm <the-container-id>
docker rm -f <the-container-id>
```

## Persist the DB
```shell
docker volume create todo-db
docker run -dp 127.0.0.1:3000:3000 --mount type=volume,src=todo-db,target=/etc/todos getting-started
```

## Bind Mount
```shell
docker run -dp 127.0.0.1:3000:3000 \
    -w /app --mount type=bind,src="$(pwd)",target=/app \
    node:18-alpine \
    sh -c "yarn install && yarn run dev"
```

`type=volume,src=my-volume,target=/usr/local/data`


`type=bind,src=/path/to/data,target=/usr/local/data`


## Multi container applications
```shell
docker network create todo-app

docker run -d \
    --network todo-app --network-alias mysql \
    -v todo-mysql-data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=secret \
    -e MYSQL_DATABASE=todos \
    mysql:8.0

docker exec -it <mysql-container-id> mysql -u root -p

docker run -dp 127.0.0.1:3000:3000 \
  -w /app -v "$(pwd):/app" \
  --network todo-app \
  -e MYSQL_HOST=mysql \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=secret \
  -e MYSQL_DB=todos \
  node:18-alpine \
  sh -c "yarn install && yarn run dev"

docker exec -it <mysql-container-id> mysql -p todos
```

## Docker Compose
```shell
docker compose up -d

docker compose down
```
