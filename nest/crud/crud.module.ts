// nest
import { Module } from '@nestjs/common';

// internal
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';

@Module({
  imports: [],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
  ],
})
export class CrudModule {}
