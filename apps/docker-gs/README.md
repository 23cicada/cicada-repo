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
>
> Dockerfile 提供构建容器镜像的指令，而 Compose 文件 定义运行中的容器。通常，Compose 文件会引用 Dockerfile 来构建特定服务所需的镜像。

# Building images

## Dockerfile
```dockerfile
# 指定构建所基于的基础镜像。
FROM node:20-alpine
# 指定工作目录，即容器镜像中用于复制文件和执行命令的路径。
WORKDIR /app
# 告诉构建器复制文件，将主机上的文件放入容器镜像中。
COPY . .
# 告诉构建器运行指定命令。
RUN yarn install --production
# 设置容器的默认命令，即使用该镜像运行容器时执行的默认命令。
CMD ["node", "src/index.js"]
# 声明容器内的应用程序将要监听的端口
EXPOSE 3000
```

## Build cache
- RUN 指令的命令发生任何更改，都会使该层失效。
- 通过 COPY 或 ADD 指令复制到镜像中的文件发生任何更改，都会使该层失效。
- 一旦某一层失效，其后的所有层也都会失效，需要重新构建。

对于基于 Node 的应用，依赖项定义在 package.json 文件中。如果该文件发生更改，则需要重新安装依赖项；如果未更改，则应使用缓存的依赖项。因此，首先只复制 package.json 文件，然后安装依赖项，最后再复制项目的其他文件。这样，只有当 package.json 发生变化时，才需要重新安装 Yarn 依赖项。

## Multi-stage builds
对于 JavaScript、Ruby 或 Python 这类解释型语言，可以在一个阶段中构建和压缩（minify）代码，然后将生产环境可用的文件复制到更小的运行时镜像中。这样可以优化镜像，使其更适合部署。
```shell
# Stage 1: Build Environment
FROM builder-image AS build-stage
# Install build tools (e.g., Maven, Gradle)
# Copy source code
# Build commands (e.g., compile, package)

# Stage 2: Runtime environment
FROM runtime-image AS final-stage
#  Copy application artifacts from the build stage (e.g., JAR file)
COPY --from=build-stage /path/in/build/stage /path/to/place/in/final/stage
# Define runtime configuration (e.g., CMD, ENTRYPOINT)

# --from 用于从另一个构建阶段或已有镜像复制文件到当前构建环境。
```

# Running containers
## Publishing and exposing ports
```shell
docker run -d -p HOST_PORT:CONTAINER_PORT IMAGE

# 将主机的 8080 端口绑定到容器的 80 端口。
docker run -d -p 8080:80 docker/welcome-to-docker
```

```yaml
services:
  app:
    image: docker/welcome-to-docker
    ports:
      - 8080:80
```

自动将所有暴露的端口映射到临时端口。这种方式在开发或测试环境中非常有用，可以避免端口冲突的问题。
```shell
docker run -P
```

# Command
```shell
docker init
```

```shell
docker build -t TARGET_IMAGE .
```

```shell
docker image ls # 列出本地 Docker 镜像
```

```shell
docker image history IMAGE # Show the history of an image
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
