import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsService } from './applications.service';
import { applications } from '../constants/applictations';

describe('ApplicationsService', () => {
  let service: ApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationsService],
    }).compile();

    service = module.get<ApplicationsService>(ApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getApplications', () => {
    it('should return paginated applications', () => {
      const page = 1;
      const limit = 10;
      const result = service.getApplications(page, limit);

      expect(result.items.length).toBe(limit);
      expect(result.totalPages).toBe(Math.ceil(applications.length / limit));
      expect(result.items).toEqual(applications.slice(0, limit));
    });

    it('should return the correct items for a specific page', () => {
      const page = 2;
      const limit = 10;
      const result = service.getApplications(page, limit);

      const expectedItems = applications.slice(10, 20); 
      expect(result.items).toEqual(expectedItems);
    });

    it('should handle pages beyond the available data gracefully', () => {
      const page = 10; 
      const limit = 10;
      const result = service.getApplications(page, limit);

      expect(result.items.length).toBe(0); 
      expect(result.totalPages).toBe(Math.ceil(applications.length / limit));
    });
  });

  describe('getApplicationStats', () => {
    it('should return correct totalApplications count', () => {
      const stats = service.getApplicationStats();
      expect(stats.totalApplications).toBe(applications.length);
    });

    it('should return correct statusCounts', () => {
      const stats = service.getApplicationStats();
      const acceptedCount = applications.filter((app) => app.status === 'accepted').length;
      const pendingCount = applications.filter((app) => app.status === 'pending').length;
      const rejectedCount = applications.filter((app) => app.status === 'rejected').length;

      expect(stats.statusCounts).toEqual({
        accepted: acceptedCount,
        pending: pendingCount,
        rejected: rejectedCount,
      });
    });

    it('should return correct monthCounts', () => {
      const stats = service.getApplicationStats();

      const expectedMonthCounts = applications.reduce((acc, app) => {
        const month = new Date(app.dateApplied).toLocaleString('en-US', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const formattedMonthCounts = Object.entries(expectedMonthCounts).map(([month, value]) => ({
        month,
        value,
      }));

      expect(stats.monthCounts).toEqual(formattedMonthCounts);
    });
  });
});
