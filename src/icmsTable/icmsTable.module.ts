import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { IcmsTableController } from './icmsTable.controller';
import { icmsTableProviders } from './icmsTable.providers';
import { IcmsTableService } from './icmsTable.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    IcmsTableController
  ],
  providers: [
    IcmsTableService, 
    ...icmsTableProviders,
  ],
  exports: [
    IcmsTableService
  ]
})
export class IcmsTableModule {}
