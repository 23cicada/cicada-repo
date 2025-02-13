FROM node:20-alpine
WORKDIR /app
COPY . .
RUN yarn config set "strict-ssl" false -g
RUN yarn install --production
CMD ["node", "src/index.js"]