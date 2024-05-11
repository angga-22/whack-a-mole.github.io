FROM node:20-alpine3.18 as builder

WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "run", "start"]

