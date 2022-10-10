import { DataSource } from 'typeorm';
import { SupplierBankAccount } from './entities/supplierBankAccount.entity';

export const supplierBankAccountProviders = [
  {
    provide: 'SUPPLIER_BANK_ACCOUNT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SupplierBankAccount),
    inject: ['DATA_SOURCE'],
  }
]