import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderItemModule } from 'src/orderItem/orderItem.module';
import { OrderController } from './order.controller';
import { orderProviders } from './order.providers';
import { OrderService } from './order.service';

@Module({
  imports: [
    DatabaseModule,
    OrderItemModule
  ],
  controllers: [
    OrderController
  ],
  providers: [
    OrderService, 
    ...orderProviders,
  ],
  exports: [
    OrderService
  ]
})
export class OrderModule {}
