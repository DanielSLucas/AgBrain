import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpInterceptor } from './shared/interceptors/http-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.ENV !== 'prod') {
    const config = new DocumentBuilder()
      .setTitle('Brain Agriculture')
      .setDescription('The Brain Agriculture API description')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }

  app.useGlobalInterceptors(new HttpInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
