import { DataSource } from 'typeorm';
import { IcmsTable } from './entities/icmsTable.entity';

export const icmsTableProviders = [
  {
    provide: 'ICMS_TABLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(IcmsTable),
    inject: ['DATA_SOURCE'],
  }
]