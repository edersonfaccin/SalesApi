import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SupplierPixKeyController } from './supplierPixKey.controller';
import { supplierPixKeyProviders } from './supplierPixKey.providers';
import { SupplierPixKeyService } from './supplierPixKey.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    SupplierPixKeyController
  ],
  providers: [
    SupplierPixKeyService, 
    ...supplierPixKeyProviders,
  ],
  exports: [
    SupplierPixKeyService
  ]
})
export class SupplierPixKeyModule {}
