import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductController } from './product.controller';
import { productProviders } from './product.providers';
import { ProductService } from './product.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    ProductController
  ],
  providers: [
    ProductService, 
    ...productProviders,
  ],
  exports: [
    ProductService
  ]
})
export class ProductModule {}
