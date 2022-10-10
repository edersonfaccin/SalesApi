import { DataSource } from 'typeorm';
import { SalerBankAccount } from './entities/salerBankAccount.entity';

export const salerBankAccountProviders = [
  {
    provide: 'SALER_BANK_ACCOUNT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SalerBankAccount),
    inject: ['DATA_SOURCE'],
  }
]