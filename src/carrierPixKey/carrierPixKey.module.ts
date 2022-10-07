import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CarrierPixKeyController } from './carrierPixKey.controller';
import { carrierPixKeyProviders } from './carrierPixKey.providers';
import { CarrierPixKeyService } from './carrierPixKey.service';
import { CarrierPixKey } from './entities/carrierPixKey.entity';

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
    CarrierPixKeyService,
    CarrierPixKey
  ]
})
export class CarrierPixKeyModule {}
