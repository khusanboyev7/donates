import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('donate-system')
    .setDescription('The donate system API description')
    .setVersion('1.0')
    .addTag('You are welcome')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
    console.log(` Swagger is running on http://localhost:${PORT}/api`);
  });
}

start();
