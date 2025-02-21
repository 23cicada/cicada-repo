FROM node:16.20.2

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN corepack enable

RUN npm install

COPY . .
