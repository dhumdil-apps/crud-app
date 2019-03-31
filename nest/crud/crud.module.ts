// nest
import { Module } from '@nestjs/common';

// internal
import { CoreModule } from '../core/core.module';
import { crudProviders } from './crud.providers';
import { UserController } from './controllers';
import { UserService } from './services';

@Module({
  imports: [
    CoreModule,
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
    ...crudProviders,
  ],
})
export class CrudModule {}
