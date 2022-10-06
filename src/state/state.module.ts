import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StateController } from './state.controller';
import { stateProviders } from './state.providers';
import { StateService } from './state.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    StateController
  ],
  providers: [
    StateService, 
    ...stateProviders,
  ],
  exports: [
    StateService
  ]
})
export class StateModule {}
