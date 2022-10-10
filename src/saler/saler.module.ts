import { Module } from '@nestjs/common';
import { SalerBankAccountModule } from 'src/salerBankAccount/salerBankAccount.module';
import { SalerPixKeyModule } from 'src/salerPixKey/salerPixKey.module';
import { DatabaseModule } from 'src/database/database.module';
import { SalerController } from './saler.controller';
import { salerProviders } from './saler.providers';
import { SalerService } from './saler.service';

@Module({
  imports: [
    DatabaseModule,
    SalerBankAccountModule,
    SalerPixKeyModule
  ],
  controllers: [
    SalerController
  ],
  providers: [
    SalerService, 
    ...salerProviders,
  ],
  exports: [
    SalerService
  ]
})
export class SalerModule {}
