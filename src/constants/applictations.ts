import { JobApplication } from 'src/applications/application.model';

const jobTitles = [
  'Frontend Developer',
  'Backend Developer',
  'Product Manager',
  'UX Designer',
  'Data Scientist',
];
const companyNames = [
  'TechCorp',
  'WebSolutions',
  'InnoTech',
  'InnovateX',
  'DataForge',
];
const statuses = ['accepted', 'pending', 'rejected'];

export const applications: JobApplication[] = [];

for (let i = 1; i <= 50; i++) {
  const randomJobTitle =
    jobTitles[Math.floor(Math.random() * jobTitles.length)];
  const randomCompanyName =
    companyNames[Math.floor(Math.random() * companyNames.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomDateApplied = new Date(
    2024,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1,
  )
    .toISOString()
    .split('T')[0]; // Random date in 2024

  applications.push({
    id: i.toString(),
    jobTitle: randomJobTitle,
    companyName: randomCompanyName,
    status: randomStatus,
    dateApplied: randomDateApplied,
  });
}
