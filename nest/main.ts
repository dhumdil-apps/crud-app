// nest
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

// internal
import { AppModule } from './app.module';
import { AppConfiguration } from './app.configuration';

async function bootstrap() {

  const config = new AppConfiguration();

  config.configureEnvironment();
  config.configureDatabase();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  config.configureSecurity(app);
  config.configureCompression(app);
  config.configureAssets(app);

  await app.listen(process.env.APP_PORT);

}

bootstrap();
