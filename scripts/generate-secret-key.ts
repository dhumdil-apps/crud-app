import * as crypto from 'crypto';

console.log('SECRET KEY:');
console.log('');
console.log(crypto.randomBytes(256).toString('base64'));
console.log('');
