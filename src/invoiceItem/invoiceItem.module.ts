import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { InvoiceItemController } from './invoiceItem.controller';
import { invoiceItemProviders } from './invoiceItem.providers';
import { InvoiceItemService } from './invoiceItem.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    InvoiceItemController
  ],
  providers: [
    InvoiceItemService, 
    ...invoiceItemProviders,
  ],
  exports: [
    InvoiceItemService
  ]
})
export class InvoiceItemModule {}
