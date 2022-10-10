import { DataSource } from 'typeorm';
import { PaymentMethod } from './entities/paymentMethod.entity';

export const paymentMethodProviders = [
  {
    provide: 'PAYMENT_METHOD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentMethod),
    inject: ['DATA_SOURCE'],
  }
]