import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Server } from './shared/interfaces';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const { url, port, prefix, version } = app
    .get<ConfigService>(ConfigService)
    .get<Server>('server');

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig(url, prefix),
  );

  SwaggerModule.setup(`${prefix}${version}/swagger`, app, document);

  app.setGlobalPrefix(prefix);

  await app.listen(port);
  Logger.log(`App service running in port ${port}`);
}
bootstrap();
