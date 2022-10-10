import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { paymentConditionInstallmentProviders } from './paymentConditionInstallment.providers';
import { PaymentConditionInstallmentService } from './paymentConditionInstallment.service';
import { PaymentConditionInstallmentController } from './paymentConditionInstallment.controller';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    PaymentConditionInstallmentController
  ],
  providers: [
    PaymentConditionInstallmentService, 
    ...paymentConditionInstallmentProviders,
  ],
  exports: [
    PaymentConditionInstallmentService
  ]
})
export class PaymentConditionInstallmentModule {}
