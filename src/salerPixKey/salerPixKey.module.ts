import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SalerPixKeyController } from './salerPixKey.controller';
import { salerPixKeyProviders } from './salerPixKey.providers';
import { SalerPixKeyService } from './salerPixKey.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    SalerPixKeyController
  ],
  providers: [
    SalerPixKeyService, 
    ...salerPixKeyProviders,
  ],
  exports: [
    SalerPixKeyService
  ]
})
export class SalerPixKeyModule {}
