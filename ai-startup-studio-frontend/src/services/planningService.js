import {
  businessModelData,
  financialData,
  mvpData,
  revenueData,
  roadmapData,
  technologyData
} from '@/mock/planningData.js';

function wait(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getBusinessModelData() {
  await wait();
  return businessModelData;
}

export async function getRevenueData() {
  await wait();
  return revenueData;
}

export async function getFinancialData() {
  await wait();
  return financialData;
}

export async function getMvpData() {
  await wait();
  return mvpData;
}

export async function getTechnologyData() {
  await wait();
  return technologyData;
}

export async function getRoadmapData() {
  await wait();
  return roadmapData;
}