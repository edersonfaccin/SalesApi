import { DataSource } from 'typeorm';
import { PaymentConditionInstallment } from './entities/paymentConditionInstallment.entity';

export const paymentConditionInstallmentProviders = [
  {
    provide: 'PAYMENT_CONDITION_INSTALLMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentConditionInstallment),
    inject: ['DATA_SOURCE'],
  }
]