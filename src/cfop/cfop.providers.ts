import { DataSource } from 'typeorm';
import { Cfop } from './entities/cfop.entity';

export const cfopProviders = [
  {
    provide: 'CFOP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cfop),
    inject: ['DATA_SOURCE'],
  }
]