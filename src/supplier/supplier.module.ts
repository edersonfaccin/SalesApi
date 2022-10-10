import { Module } from '@nestjs/common';
import { SupplierBankAccountModule } from 'src/supplierBankAccount/supplierBankAccount.module';
import { SupplierPixKeyModule } from 'src/supplierPixKey/supplierPixKey.module';
import { DatabaseModule } from 'src/database/database.module';
import { SupplierController } from './supplier.controller';
import { supplierProviders } from './supplier.providers';
import { SupplierService } from './supplier.service';

@Module({
  imports: [
    DatabaseModule,
    SupplierBankAccountModule,
    SupplierPixKeyModule
  ],
  controllers: [
    SupplierController
  ],
  providers: [
    SupplierService, 
    ...supplierProviders,
  ],
  exports: [
    SupplierService
  ]
})
export class SupplierModule {}
