// src/applications/applications.service.ts
import { Injectable } from '@nestjs/common';
import { JobApplication } from './application.model';
import { applications } from 'src/constants/applictations';

@Injectable()
export class ApplicationsService {
  getApplications(): JobApplication[] {
    return applications;
  }
}
