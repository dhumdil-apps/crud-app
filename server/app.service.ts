import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {

  async getScripts(): Promise<string> {

    return new Promise((resolve) => {

      const pathToIndex = path.join(__dirname, '..', 'public/app/index.html');

      try {
        if (fs.existsSync(pathToIndex)) {
          fs.readFile(pathToIndex,  { encoding: 'utf-8' }, (e, data) => {

            if (!e && data && typeof data === 'string') {

              const scripts = data.split('src="');
              let html = scripts[0];

              for (let i = 1; i < scripts.length; i++) {
                html += 'defer src="/app/' + scripts[i];
              }

              resolve(html);

            } else {
              throw e;
            }

          });
        }
      } catch (e) {
        throw e;
      }

    });

  }

}
