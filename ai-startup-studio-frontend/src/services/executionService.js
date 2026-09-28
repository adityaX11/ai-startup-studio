import {
  analyticsData,
  gtmData,
  monitoringData,
  pitchDeckData,
  risksData
} from '@/mock/executionData.js';

function wait(milliseconds = 350) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function getGtmData() {
  await wait();
  return gtmData;
}

export async function getRisksData() {
  await wait();
  return risksData;
}

export async function getPitchDeckData() {
  await wait();
  return pitchDeckData;
}

export async function getMonitoringData() {
  await wait();
  return monitoringData;
}

export async function getAnalyticsData() {
  await wait();
  return analyticsData;
}

export async function sendMockFounderMessage(message) {
  await wait(900);

  return {
    id: `message-${Date.now()}`,
    role: 'assistant',
    content: `Based on your startup context, I recommend treating "${message}" as a hypothesis first. Define the evidence you need, identify the next user action, and avoid committing to a major decision before validation.`,
    sourceLabel: 'Mock AI Co-Founder response',
    confidence: 'Medium',
    createdAt: new Date().toISOString()
  };
}