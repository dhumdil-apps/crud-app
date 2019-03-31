// nest
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

// internal
import { AppModule } from './app.module';
import { AppConfiguration } from './app.configuration';

async function bootstrap() {

  AppConfiguration.configureEnvironment();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  AppConfiguration.configureSecurity(app);
  AppConfiguration.configureCompression(app);
  AppConfiguration.configureAssets(app);
  AppConfiguration.configureExceptions(app);

  await app.listen(process.env.APP_PORT);

}

bootstrap();
