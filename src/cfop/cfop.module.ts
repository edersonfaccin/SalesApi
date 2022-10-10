import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CfopController } from './cfop.controller';
import { cfopProviders } from './cfop.providers';
import { CfopService } from './cfop.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    CfopController
  ],
  providers: [
    CfopService, 
    ...cfopProviders,
  ],
  exports: [
    CfopService
  ]
})
export class CfopModule {}
