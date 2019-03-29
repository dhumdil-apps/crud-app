// node
import { join } from 'path';

// nest
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

// external
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

// internal
import { ApplicationModule } from './app.module';

async function bootstrap() {

  // If not in production environment -> configure environment with .env
  if (process.env.APP_ENV !== 'prod') {
    dotenv.config();
  }

  const app = await NestFactory.create<NestExpressApplication>(
    ApplicationModule,
  );

  // CSRF
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(csurf({ cookie: true }));

  // Helmet
  app.use(helmet());

  // Rate limiting (1 request per second)
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 900, // limit each IP to 300 requests per windowMs
    }),
  );

  // enable compression (Content-Encoding: gzip)
  app.use(compression());

  // serve assets from "/public" folder
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // for server rendering use hbs view engine from "/views" folder
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.APP_PORT);

}

bootstrap();
