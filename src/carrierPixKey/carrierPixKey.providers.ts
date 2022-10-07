import { DataSource } from 'typeorm';
import { CarrierPixKey } from './entities/carrierPixKey.entity';

export const carrierPixKeyProviders = [
  {
    provide: 'CARRIER_PIX_KEY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CarrierPixKey),
    inject: ['DATA_SOURCE'],
  }
]