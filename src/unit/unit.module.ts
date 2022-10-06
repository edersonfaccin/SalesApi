import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UnitController } from './unit.controller';
import { unitProviders } from './unit.providers';
import { UnitService } from './unit.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    UnitController
  ],
  providers: [
    UnitService, 
    ...unitProviders,
  ],
  exports: [
    UnitService
  ]
})
export class UnitModule {}
