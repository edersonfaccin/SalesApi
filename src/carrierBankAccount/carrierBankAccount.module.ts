import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CarrierBankAccountController } from './carrierBankAccount.controller';
import { carrierBankAccountProviders } from './carrierBankAccount.providers';
import { CarrierBankAccountService } from './carrierBankAccount.service';
import { CarrierBankAccount } from './entities/carrierBankAccount.entity';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    CarrierBankAccountController
  ],
  providers: [
    CarrierBankAccountService, 
    ...carrierBankAccountProviders,
  ],
  exports: [
    CarrierBankAccountService,
    CarrierBankAccount
  ]
})
export class CarrierBankAccountModule {}
