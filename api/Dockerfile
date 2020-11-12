FROM node:alpine

WORKDIR /api

COPY package.json package-lock.json /api/

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
