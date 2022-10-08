import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CarrierPixKeyController } from './carrierPixKey.controller';
import { carrierPixKeyProviders } from './carrierPixKey.providers';
import { CarrierPixKeyService } from './carrierPixKey.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    CarrierPixKeyController
  ],
  providers: [
    CarrierPixKeyService, 
    ...carrierPixKeyProviders,
  ],
  exports: [
    CarrierPixKeyService
  ]
})
export class CarrierPixKeyModule {}
