FROM node:latest

WORKDIR /opt/app

COPY package.json ./

COPY ./ ./

RUN npm i -g pnpm

RUN pnpm i

CMD ["npm", "run", "dev"]