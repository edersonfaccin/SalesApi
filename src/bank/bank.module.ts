import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BankController } from './bank.controller';
import { bankProviders } from './bank.providers';
import { BankResolver } from './bank.resolver';
import { BankService } from './bank.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    BankController
  ],
  providers: [
    BankService, 
    BankResolver,
    ...bankProviders,
  ],
  exports: [
    BankService
  ]
})
export class BankModule {}
