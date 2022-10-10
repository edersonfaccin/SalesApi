import { DataSource } from 'typeorm';
import { CustomerBankAccount } from './entities/customerBankAccount.entity';

export const customerBankAccountProviders = [
  {
    provide: 'CUSTOMER_BANK_ACCOUNT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CustomerBankAccount),
    inject: ['DATA_SOURCE'],
  }
]