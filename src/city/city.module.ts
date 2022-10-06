import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CityController } from './city.controller';
import { cityProviders } from './city.providers';
import { CityService } from './city.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    CityController
  ],
  providers: [
    CityService, 
    ...cityProviders,
  ],
  exports: [
    CityService
  ]
})
export class CityModule {}
