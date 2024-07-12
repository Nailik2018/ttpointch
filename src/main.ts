import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {VersioningType} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {AppCustomLogger} from './app.custom.logger';

async function bootstrap(): Promise<void> {

  const logger: AppCustomLogger = new AppCustomLogger("Main");
  const app = await NestFactory.create(AppModule);
  logger.log("Application is starting");
  const configService = app.get(ConfigService);
  // cors
  app.enableCors();
  app.setGlobalPrefix("api");
  // Version
  app.enableVersioning({
    type: VersioningType.URI
  });
  const config = new DocumentBuilder()
    .setTitle("Nest.js API Screenshot Job Backend")
    .setDescription("API documentation for Nest.js application with Swagger UI")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get("BACKEND_SWAGGER_PATH"), app, document);
  await app.listen(configService.get("BACKEND_PORT") || 3001);
}

bootstrap();
