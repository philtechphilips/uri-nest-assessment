// src/applications/applications.service.ts
import { Injectable } from '@nestjs/common';
import { JobApplication } from './application.model';
import { applications } from '../constants/applictations';

@Injectable()
export class ApplicationsService {
    getApplications(page: number = 1, limit: number = 10): { items: JobApplication[]; totalPages: number } {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
      
        const items = applications.slice(startIndex, endIndex); // Extract items based on pagination
        const totalPages = Math.ceil(applications.length / limit); // Calculate total pages based on the limit
      
        return {
          items, // Corrected key from `item` to `items` to imply multiple items
          totalPages, // Return the total number of pages
        };
      }      

  getApplicationStats() {
    const stats = {
      totalApplications: applications.length,
      statusCounts: {
        accepted: applications.filter((app) => app.status === 'accepted').length,
        pending: applications.filter((app) => app.status === 'pending').length,
        rejected: applications.filter((app) => app.status === 'rejected').length,
      },
      monthCounts: Object.entries(
        applications.reduce((acc, app) => {
          const monthIndex = new Date(app.dateApplied).getMonth();
          const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ];
          const month = monthNames[monthIndex];
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {})
      ).map(([month, value]) => ({ month, value })),
    };
    return stats;
  }  
}
