import { Module } from '@nestjs/common';
import { CarrierBankAccountModule } from 'src/carrierBankAccount/carrierBankAccount.module';
import { CarrierPixKeyModule } from 'src/carrierPixKey/carrierPixKey.module';
import { DatabaseModule } from 'src/database/database.module';
import { CarrierController } from './carrier.controller';
import { carrierProviders } from './carrier.providers';
import { CarrierService } from './carrier.service';

@Module({
  imports: [
    DatabaseModule,
    CarrierBankAccountModule,
    CarrierPixKeyModule
  ],
  controllers: [
    CarrierController
  ],
  providers: [
    CarrierService, 
    ...carrierProviders,
  ],
  exports: [
    CarrierService
  ]
})
export class CarrierModule {}
