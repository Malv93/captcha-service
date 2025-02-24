FROM node:22.13.1-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV MONGODB_URI=""

CMD ["node", "build/index.js"]