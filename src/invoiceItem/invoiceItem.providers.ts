import { DataSource } from 'typeorm';
import { InvoiceItem } from './entities/invoiceItem.entity';

export const invoiceItemProviders = [
  {
    provide: 'INVOICE_ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(InvoiceItem),
    inject: ['DATA_SOURCE'],
  }
]