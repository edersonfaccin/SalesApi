import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerBankAccountController } from './customerBankAccount.controller';
import { customerBankAccountProviders } from './customerBankAccount.providers';
import { CustomerBankAccountService } from './customerBankAccount.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    CustomerBankAccountController
  ],
  providers: [
    CustomerBankAccountService, 
    ...customerBankAccountProviders,
  ],
  exports: [
    CustomerBankAccountService
  ]
})
export class CustomerBankAccountModule {}
