import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { InvoiceItemModule } from 'src/invoiceItem/invoiceItem.module';
import { InvoiceController } from './invoice.controller';
import { invoiceProviders } from './invoice.providers';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [
    DatabaseModule,
    InvoiceItemModule
  ],
  controllers: [
    InvoiceController
  ],
  providers: [
    InvoiceService, 
    ...invoiceProviders,
  ],
  exports: [
    InvoiceService
  ]
})
export class InvoiceModule {}
