import { DataSource } from 'typeorm';
import { Carrier } from './entities/carrier.entity';

export const carrierProviders = [
  {
    provide: 'CARRIER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Carrier),
    inject: ['DATA_SOURCE'],
  }
]