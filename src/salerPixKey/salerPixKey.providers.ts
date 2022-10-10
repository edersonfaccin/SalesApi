import { DataSource } from 'typeorm';
import { SalerPixKey } from './entities/salerPixKey.entity';

export const salerPixKeyProviders = [
  {
    provide: 'SALER_PIX_KEY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SalerPixKey),
    inject: ['DATA_SOURCE'],
  }
]