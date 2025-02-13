# Docker architecture
![Docker architecture](images/docker-architecture.png)

# The basics

## Container
Containers are **isolated processes** for each of your app's components. Each component - the frontend React app, the Python API engine, and the database - runs in its own isolated environment, completely isolated from everything else on your machine.

## Image
A container image is a standardized package that includes all of the files, binaries, libraries, and configurations to run a container.

- Images are immutable.
- Container images are composed of layers. Each layer represents a set of file system changes that add, remove, or modify files.

> Dockerfile versus Compose file
> A Dockerfile provides instructions to build a container image while a Compose file defines your running containers. Quite often, a Compose file references a Dockerfile to build an image to use for a particular service.

# Dockerfile
```dockerfile
# this specifies the base image that the build will extend.
FROM node:20-alpine 
# this instruction specifies the "working directory" or the path in the image where files will be copied and commands will be executed.
WORKDIR /app
# this instruction tells the builder to copy files from the host and put them into the container image.
COPY . .
# this instruction tells the builder to run the specified command.
RUN yarn install --production
# this instruction sets the default command a container using this image will run.
CMD ["node", "src/index.js"]
```

# Build cache
- RUN 指令的命令发生任何更改，都会使该层失效。
- 通过 COPY 或 ADD 指令复制到镜像中的文件发生任何更改，都会使该层失效。
- 一旦某一层失效，其后的所有层也都会失效，需要重新构建。

# Command
```shell
docker init
```
```shell
docker build -t name .
```

```shell
docker image ls # 列出本地 Docker 镜像
```

```shell
docker compose up
# 读取 docker-compose.yml 文件
# 拉取（如果本地没有）并构建镜像
# 创建并启动容器
# 显示日志，并在终端保持运行状态

# -d Detached mode: Run containers in the background
# --build Build images before starting containers
```

```shell
docker compose down # 停止并删除所有容器
```