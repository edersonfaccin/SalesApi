import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PaymentMethodController } from './paymentMethod.controller';
import { paymentMethodProviders } from './paymentMethod.providers';
import { PaymentMethodService } from './paymentMethod.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    PaymentMethodController
  ],
  providers: [
    PaymentMethodService, 
    ...paymentMethodProviders,
  ],
  exports: [
    PaymentMethodService
  ]
})
export class PaymentMethodModule {}
