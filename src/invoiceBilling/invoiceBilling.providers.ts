import { DataSource } from 'typeorm';
import { InvoiceBilling } from './entities/invoiceBilling.entity';

export const invoiceBillingProviders = [
  {
    provide: 'INVOICE_BILLING_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(InvoiceBilling),
    inject: ['DATA_SOURCE'],
  }
]