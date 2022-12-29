FROM node:latest

WORKDIR /opt/app

COPY package.json ./

COPY ./ ./

RUN npm i

CMD ["npm", "run", "dev"]