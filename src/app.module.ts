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
import { IcmsTableModule } from './icmsTable/icmsTable.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SalerModule } from './saler/saler.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentConditionModule } from './paymentCondition/paymentCondition.module';
import { PaymentConditionInstallmentModule } from './paymentConditionInstallment/paymentConditionInstallment.module';

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
    CarrierPixKeyModule,
    IcmsTableModule,
    AuthModule,
    UserModule,
    SalerModule,
    CustomerModule,
    PaymentConditionModule,
    PaymentConditionInstallmentModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
