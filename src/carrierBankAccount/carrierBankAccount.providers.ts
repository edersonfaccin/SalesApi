import { DataSource } from 'typeorm';
import { CarrierBankAccount } from './entities/carrierBankAccount.entity';

export const carrierBankAccountProviders = [
  {
    provide: 'CARRIER_BANK_ACCOUNT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CarrierBankAccount),
    inject: ['DATA_SOURCE'],
  }
]