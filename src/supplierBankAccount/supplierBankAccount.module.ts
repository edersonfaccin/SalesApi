import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SupplierBankAccountController } from './supplierBankAccount.controller';
import { supplierBankAccountProviders } from './supplierBankAccount.providers';
import { SupplierBankAccountService } from './supplierBankAccount.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    SupplierBankAccountController
  ],
  providers: [
    SupplierBankAccountService, 
    ...supplierBankAccountProviders,
  ],
  exports: [
    SupplierBankAccountService
  ]
})
export class SupplierBankAccountModule {}
