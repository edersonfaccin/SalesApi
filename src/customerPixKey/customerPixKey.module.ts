import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { customerPixKeyController } from './customerPixKey.controller';
import { customerPixKeyProviders } from './customerPixKey.providers';
import { customerPixKeyService } from './customerPixKey.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    customerPixKeyController
  ],
  providers: [
    customerPixKeyService, 
    ...customerPixKeyProviders,
  ],
  exports: [
    customerPixKeyService
  ]
})
export class customerPixKeyModule {}
