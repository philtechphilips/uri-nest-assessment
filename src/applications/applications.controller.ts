// src/applications/applications.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  getApplications(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.applicationsService.getApplications(+page, +limit);
  }

  @Get('stats')
  getApplicationStats() {
    return this.applicationsService.getApplicationStats();
  }
}
