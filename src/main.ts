import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import * as dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente do .env

async function bootstrap() {
  const expressApp = express();

  // Middleware para definir o tipo de conteúdo explicitamente para arquivos PDF
  expressApp.use('/documents', express.static(join(__dirname, '..', 'documents')));
  expressApp.use('/documents', (req, res, next) => {
    if (req.path.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf');
    }
    next();
  });

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  
  // Configurar CORS
  app.enableCors({
    origin: 'https://brunoholanda.com', // Altere para uma lista de domínios permitidos para maior segurança
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(4000);

  console.log('Application is running on: http://localhost:4000');
}

bootstrap();
