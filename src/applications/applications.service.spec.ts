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
    it('should return all applications', () => {
      const apps = service.getApplications();
      expect(apps).toEqual(applications);
      expect(apps.length).toBe(30);
    });

    it('should have valid job titles', () => {
      const apps = service.getApplications();
      const jobTitles = [
        'Frontend Developer',
        'Backend Developer',
        'Product Manager',
        'UX Designer',
        'Data Scientist',
      ];

      apps.forEach((app) => {
        expect(jobTitles).toContain(app.jobTitle);
      });
    });

    it('should have valid company names', () => {
      const apps = service.getApplications();
      const companyNames = [
        'TechCorp',
        'WebSolutions',
        'InnoTech',
        'InnovateX',
        'DataForge',
      ];

      apps.forEach((app) => {
        expect(companyNames).toContain(app.companyName);
      });
    });

    it('should have valid statuses', () => {
      const apps = service.getApplications();
      const statuses = ['accepted', 'pending', 'rejected'];

      apps.forEach((app) => {
        expect(statuses).toContain(app.status);
      });
    });

    it('should have a dateApplied in 2024', () => {
      const apps = service.getApplications();
      apps.forEach((app) => {
        const date = new Date(app.dateApplied);
        expect(date.getFullYear()).toBe(2024);
      });
    });
  });

  describe('getApplicationStats', () => {
    it('should return correct totalApplications count', () => {
      const stats = service.getApplicationStats();
      expect(stats.totalApplications).toBe(30);
    });

    it('should return correct statusCounts', () => {
      const stats = service.getApplicationStats();
      const acceptedCount = applications.filter(
        (app) => app.status === 'accepted',
      ).length;
      const pendingCount = applications.filter(
        (app) => app.status === 'pending',
      ).length;
      const rejectedCount = applications.filter(
        (app) => app.status === 'rejected',
      ).length;

      expect(stats.statusCounts.accepted).toBe(acceptedCount);
      expect(stats.statusCounts.pending).toBe(pendingCount);
      expect(stats.statusCounts.rejected).toBe(rejectedCount);
    });

    it('should return correct monthCounts', () => {
      const stats = service.getApplicationStats();
      const monthCounts = applications.reduce((acc, app) => {
        const month = new Date(app.dateApplied).getMonth() + 1;
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      expect(stats.monthCounts).toEqual(monthCounts);
    });
  });
});
