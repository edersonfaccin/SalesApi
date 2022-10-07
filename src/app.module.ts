import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { UnitModule } from './unit/unit.module';
import { CategoryModule } from './category/category.module';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { BankModule } from './bank/bank.module';
import { CarrierModule } from './carrier/carrier.module';
import { CarrierBankAccountModule } from './carrierBankAccount/carrierBankAccount.module';
import { CarrierPixKeyModule } from './carrierPixKey/carrierPixKey.module';

@Module({
  imports: [
    DatabaseModule, 
    CompanyModule,
    UnitModule,
    CategoryModule,
    CountryModule,
    StateModule,
    CityModule,
    BankModule,
    CarrierModule,
    CarrierBankAccountModule,
    CarrierPixKeyModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
