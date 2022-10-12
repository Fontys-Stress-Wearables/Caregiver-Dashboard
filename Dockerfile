FROM node:15-alpine as build

WORKDIR /app

COPY package.json . 

COPY package-lock.json . 

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]