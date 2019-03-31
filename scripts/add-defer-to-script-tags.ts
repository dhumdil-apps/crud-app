import * as path from 'path';
import * as fs from 'fs';

const pathToIndexHtml = path.join(__dirname, '..', 'public', 'index.html');

if (fs.existsSync(pathToIndexHtml)) {

  const oldIndexHtml = fs.readFileSync(pathToIndexHtml,  { encoding: 'utf-8' });
  const html = oldIndexHtml.split('<script ');

  let newIndexHtml = html[0];

  for (let i = 1; i < html.length; i++) {
    newIndexHtml += '<script defer ' + html[i];
  }

  fs.writeFileSync(pathToIndexHtml, newIndexHtml);

}
