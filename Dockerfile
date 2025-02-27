FROM node:16.20.0-alpine3.17

WORKDIR /odontoapp-dental-graph

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "run", "start:prod"]