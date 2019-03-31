// external
import { Connection } from 'mongoose';

// internal
import { UserSchema } from './schemas';

export const crudProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
