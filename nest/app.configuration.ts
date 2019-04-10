// node
import { join } from 'path';

// nest
import { Logger } from '@nestjs/common';

// external
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as rateLimit from 'express-rate-limit';
import * as session from 'express-session';

export class AppConfiguration {

  private logger: Logger;

  constructor() {
    this.logger = new Logger('App configuration', true);
  }

  public configureEnvironment(): void {

    // If not in production environment -> configure environment with .env
    if (process.env.APP_ENV !== 'prod') {
      dotenv.config();
    }

    this.logger.log(process.env.APP_ENV, 'Environment');

  }

  public configureDatabase() {

    const options = {
      useNewUrlParser: true,
    };

    mongoose.connect(process.env.MONGO_URI, options).then(
      () => { this.logger.log(process.env.MONGO_URI, 'Database'); },
      (e) => { this.logger.log(e, 'Database'); },
    );

    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

  }

  public configureSecurity(app: any): void {

    // Helmet
    app.use(helmet());

    // CSRF
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser(process.env.APP_COOKIE_KEY, { httpOnly: true }));
    app.use(session({
      name: 'sessionID',
      secret: process.env.APP_SESSION_KEY,
      cookie: {
        httpOnly: true,
        key: 'XSRF-TOKEN',
        maxAge: 604800, // 1 week
        path: '/',
        secure: !!process.env.APP_SECURE,
      },
    }));
    app.use(csurf());
    app.use((req, res, next) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      next();
    });

    // Rate limiting (~1 rps)
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 900, // limit each IP to 300 requests per windowMs
      }),
    );

    this.logger.log('Helmet, CSRF, Rate limiting (~1 rps)', 'Security');

  }

  public configureCompression(app: any): void {

    // compression (Content-Encoding: gzip)
    app.use(compression());

    this.logger.log('Content-Encoding: gzip', 'Compression');

  }

  public configureAssets(app: any): void {

    // serve assets from "/public" folder
    app.useStaticAssets(join(__dirname, '..', 'public'));

    this.logger.log('serve assets from "/public" folder', 'Assets');

  }

}
