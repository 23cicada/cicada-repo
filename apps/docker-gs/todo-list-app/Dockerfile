# syntax=docker/dockerfile:1

FROM node:23.7.0
WORKDIR /app
COPY . .
RUN yarn config set "strict-ssl" false -g
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
