import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { UnitModule } from './unit/unit.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    DatabaseModule, 
    CompanyModule,
    UnitModule,
    CategoryModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
