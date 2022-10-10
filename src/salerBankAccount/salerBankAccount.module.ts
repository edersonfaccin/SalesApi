import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SalerBankAccountController } from './salerBankAccount.controller';
import { salerBankAccountProviders } from './salerBankAccount.providers';
import { SalerBankAccountService } from './salerBankAccount.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    SalerBankAccountController
  ],
  providers: [
    SalerBankAccountService, 
    ...salerBankAccountProviders,
  ],
  exports: [
    SalerBankAccountService
  ]
})
export class SalerBankAccountModule {}
