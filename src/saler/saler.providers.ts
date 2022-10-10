import { DataSource } from 'typeorm';
import { Saler } from './entities/saler.entity';

export const salerProviders = [
  {
    provide: 'SALER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Saler),
    inject: ['DATA_SOURCE'],
  }
]