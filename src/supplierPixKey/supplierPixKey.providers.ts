import { DataSource } from 'typeorm';
import { SupplierPixKey } from './entities/supplierPixKey.entity';

export const supplierPixKeyProviders = [
  {
    provide: 'SUPPLIER_PIX_KEY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SupplierPixKey),
    inject: ['DATA_SOURCE'],
  }
]