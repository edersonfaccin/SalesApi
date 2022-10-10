import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ColorController } from './color.controller';
import { colorProviders } from './color.providers';
import { ColorService } from './color.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    ColorController
  ],
  providers: [
    ColorService, 
    ...colorProviders,
  ],
  exports: [
    ColorService
  ]
})
export class ColorModule {}
