// nest
import { Controller, Get, Render } from '@nestjs/common';

// internal
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async index() {

    let indexParams;

    try {
      indexParams = {
        title: process.env.APP_NAME,
        scripts: await this.appService.getScripts(),
      };
    } catch (e) {
      throw e;
    }

    return indexParams;
  }
}
