import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerPixKeyController } from './customerPixKey.controller';
import { customerPixKeyProviders } from './customerPixKey.providers';
import { CustomerPixKeyService } from './customerPixKey.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    CustomerPixKeyController
  ],
  providers: [
    CustomerPixKeyService, 
    ...customerPixKeyProviders,
  ],
  exports: [
    CustomerPixKeyService
  ]
})
export class CustomerPixKeyModule {}
