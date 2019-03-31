// nest
import { Module } from '@nestjs/common';

// internal
import { databaseProviders } from './database/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class CoreModule {}
