FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copiar .env.docker a .env
COPY .env.docker .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]