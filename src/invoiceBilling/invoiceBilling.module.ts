import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { InvoiceBillingController } from './invoiceBilling.controller';
import { invoiceBillingProviders } from './invoiceBilling.providers';
import { InvoiceBillingService } from './invoiceBilling.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    InvoiceBillingController
  ],
  providers: [
    InvoiceBillingService, 
    ...invoiceBillingProviders,
  ],
  exports: [
    InvoiceBillingService
  ]
})
export class InvoiceBillingModule {}
