import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderItemController } from './orderItem.controller';
import { orderItemProviders } from './orderItem.providers';
import { OrderItemService } from './orderItem.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    OrderItemController
  ],
  providers: [
    OrderItemService, 
    ...orderItemProviders,
  ],
  exports: [
    OrderItemService
  ]
})
export class OrderItemModule {}
