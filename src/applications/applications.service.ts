// src/applications/applications.service.ts
import { Injectable } from '@nestjs/common';
import { JobApplication } from './application.model';
import { applications } from '../constants/applictations';

@Injectable()
export class ApplicationsService {
  getApplications(): JobApplication[] {
    return applications;
  }

  getApplicationStats() {
    const stats = {
      totalApplications: applications.length,
      statusCounts: {
        accepted: applications.filter((app) => app.status === 'accepted')
          .length,
        pending: applications.filter((app) => app.status === 'pending').length,
        rejected: applications.filter((app) => app.status === 'rejected')
          .length,
      },
      monthCounts: applications.reduce((acc, app) => {
        const month = new Date(app.dateApplied).getMonth() + 1;
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {}),
    };
    return stats;
  }
}
