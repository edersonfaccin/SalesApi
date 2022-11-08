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
import { ColorModule } from './color/color.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { PaymentMethodModule } from './paymentMethod/paymentMethod.module';
import { CfopModule } from './cfop/cfop.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './orderItem/orderItem.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceItemModule } from './invoiceItem/invoiceItem.module';
import { InvoiceBillingModule } from './invoiceBilling/invoiceBilling.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    }),
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
    PaymentConditionInstallmentModule,
    ColorModule,
    ProductModule,
    SupplierModule,
    PaymentMethodModule,
    CfopModule,
    OrderModule,
    OrderItemModule,
    InvoiceModule,
    InvoiceItemModule,
    InvoiceBillingModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    AppResolver
  ],
})
export class AppModule {}
