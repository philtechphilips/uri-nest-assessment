import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsService } from './applications/applications.service';
import { ApplicationsController } from './applications/applications.controller';

@Module({
  imports: [],
  controllers: [AppController, ApplicationsController],
  providers: [AppService, ApplicationsService],
})
export class AppModule {}
