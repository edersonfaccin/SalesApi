import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { salerPixKeyController } from './salerPixKey.controller';
import { salerPixKeyProviders } from './salerPixKey.providers';
import { salerPixKeyService } from './salerPixKey.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    salerPixKeyController
  ],
  providers: [
    salerPixKeyService, 
    ...salerPixKeyProviders,
  ],
  exports: [
    salerPixKeyService
  ]
})
export class salerPixKeyModule {}
