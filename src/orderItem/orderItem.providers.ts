import { DataSource } from 'typeorm';
import { OrderItem } from './entities/orderItem.entity';

export const orderItemProviders = [
  {
    provide: 'ORDER_ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderItem),
    inject: ['DATA_SOURCE'],
  }
]