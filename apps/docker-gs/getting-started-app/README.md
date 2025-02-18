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
