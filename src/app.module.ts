import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { UnitModule } from './unit/unit.module';
import { CategoryModule } from './category/category.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    DatabaseModule, 
    CompanyModule,
    UnitModule,
    CategoryModule,
    CountryModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
