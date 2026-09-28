import { dashboardData, startupProjects } from '@/mock/startupData.js';

function wait(milliseconds = 350) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function getDashboardData() {
  await wait();
  return {
    projects: startupProjects,
    ...dashboardData
  };
}

export async function getStartupProjects() {
  await wait();
  return startupProjects;
}

export async function getStartupById(startupId) {
  await wait();

  const startup = startupProjects.find((project) => project.id === startupId);

  if (!startup) {
    throw new Error('Startup project not found.');
  }

  return startup;
}