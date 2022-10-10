import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PaymentConditionInstallmentModule } from 'src/paymentConditionInstallment/paymentConditionInstallment.module';
import { PaymentConditionController } from './paymentCondition.controller';
import { paymentConditionProviders } from './paymentCondition.providers';
import { PaymentConditionService } from './paymentCondition.service';

@Module({
  imports: [
    DatabaseModule,
    PaymentConditionInstallmentModule
  ],
  controllers: [
    PaymentConditionController
  ],
  providers: [
    PaymentConditionService, 
    ...paymentConditionProviders,
  ],
  exports: [
    PaymentConditionService
  ]
})
export class PaymentConditionModule {}
