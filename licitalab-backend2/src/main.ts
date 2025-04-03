import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Seguridad
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: () => {
        // Puedes personalizar el límite según el tipo de solicitud
        return 1000; // Puedes ajustar la lógica aquí
      },
      skipFailedRequests: true, // Ignorar solicitudes fallidas
      standardHeaders: true, // Devolver información de límite en headers
      legacyHeaders: false, // Deshabilitar headers legacy
    })
  );

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URLS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
  });

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Servidor corriendo en: http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error('Error iniciando la aplicación:', error);
});