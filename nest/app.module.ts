// nest
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';

// internal
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [
    CacheModule.register(),
    CrudModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
