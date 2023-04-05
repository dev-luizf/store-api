import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = parseInt(process.env.PORT) || 3001;
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Store Manager API')
    .setDescription(
      'Uma API para controle de uma lista produtos utilizando nest.js, mongoose, joi, swagger, jest e docker.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
