import { DataSource } from 'typeorm';
import { Unit } from './entities/unit.entity';

export const unitProviders = [
  {
    provide: 'UNIT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Unit),
    inject: ['DATA_SOURCE'],
  }
]