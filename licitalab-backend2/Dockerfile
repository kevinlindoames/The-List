FROM node:18-alpine

WORKDIR /app

# Instalar dependencias de sistema
RUN apk add --no-cache postgresql-client

# Copiar archivos de manifiesto
COPY package*.json ./
RUN npm install

# Copiar todo el código
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

# Construir la aplicación
RUN npm run build

EXPOSE 4000

# Script de inicialización modificado
CMD sh -c "until pg_isready -h postgres -p 5432; do \
  echo 'Esperando PostgreSQL...'; \
  sleep 2; \
  done && \
  npx prisma db push --accept-data-loss && \
  npx ts-node prisma/seed.ts && \
  npm run start:prod"