// node
import { join } from 'path';

// external
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

// internal
import { DatabaseExceptionFilter } from './core/exceptions/database-exceptions.filter';

export class AppConfiguration {

  static configureEnvironment(): void {

    // If not in production environment -> configure environment with .env
    if (process.env.APP_ENV !== 'prod') {
      dotenv.config();
    }

  }

  static configureSecurity(app: any): void {

    // Helmet
    app.use(helmet());

    // CSRF
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(csurf({ cookie: true }));

    // Rate limiting (1 request per second)
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 900, // limit each IP to 300 requests per windowMs
      }),
    );

  }

  static configureCompression(app: any): void {

    // enable compression (Content-Encoding: gzip)
    app.use(compression());

  }

  static configureAssets(app: any): void {

    // serve assets from "/public" folder
    app.useStaticAssets(join(__dirname, '..', 'public'));

  }

  static configureExceptions(app: any): void {

    // TODO

    // exceptions
    app.useGlobalFilters(new DatabaseExceptionFilter());

  }

}
