import { Module } from '@nestjs/common';
import { CustomerBankAccountModule } from 'src/customerBankAccount/customerBankAccount.module';
import { CustomerPixKeyModule } from 'src/customerPixKey/customerPixKey.module';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.providers';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    DatabaseModule,
    CustomerBankAccountModule,
    CustomerPixKeyModule
  ],
  controllers: [
    CustomerController
  ],
  providers: [
    CustomerService, 
    ...customerProviders,
  ],
  exports: [
    CustomerService
  ]
})
export class CustomerModule {}
