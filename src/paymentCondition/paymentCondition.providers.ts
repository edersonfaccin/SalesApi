import { DataSource } from 'typeorm';
import { PaymentCondition } from './entities/paymentCondition.entity';

export const paymentConditionProviders = [
  {
    provide: 'PAYMENT_CONDITION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentCondition),
    inject: ['DATA_SOURCE'],
  }
]