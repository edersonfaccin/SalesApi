import { DataSource } from 'typeorm';
import { CustomerPixKey } from './entities/customerPixKey.entity';

export const customerPixKeyProviders = [
  {
    provide: 'CUSTOMER_PIX_KEY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CustomerPixKey),
    inject: ['DATA_SOURCE'],
  }
]