import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CountryController } from './country.controller';
import { countryProviders } from './country.providers';
import { CountryService } from './country.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    CountryController
  ],
  providers: [
    CountryService, 
    ...countryProviders,
  ],
  exports: [
    CountryService
  ]
})
export class CountryModule {}
