// import {
//   competitors,
//   ideaAnalysis,
//   marketData,
//   personas,
//   swotData,
//   validationData
// } from '@/mock/analysisData.js';

// function wait(milliseconds = 350) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, milliseconds);
//   });
// }

// export async function getIdeaAnalysis() {
//   await wait();
//   return ideaAnalysis;
// }

// export async function analyzeIdea(input) {
//   await wait(900);

//   return {
//     ...ideaAnalysis,
//     generatedFrom: input,
//     generatedAt: new Date().toISOString(),
//     sourceLabel: 'Mock AI output'
//   };
// }

// export async function getValidationData() {
//   await wait();
//   return validationData;
// }

// export async function getMarketData() {
//   await wait();
//   return marketData;
// }

// export async function getCompetitors() {
//   await wait();
//   return competitors;
// }

// export async function getPersonas() {
//   await wait();
//   return personas;
// }

// export async function getSwotData() {
//   await wait();
//   return swotData;
// }




import {
  competitors,
  ideaAnalysis,
  marketData,
  personas,
  swotData,
  validationData
} from '@/mock/analysisData.js';

function wait(milliseconds = 350) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function getIdeaAnalysis(startupId) {
  await wait();

  return {
    ...ideaAnalysis,
    startupId
  };
}

export async function getValidationData(startupId) {
  await wait();

  return {
    ...validationData,
    startupId
  };
}

export async function getMarketData(startupId) {
  await wait();

  return {
    ...marketData,
    startupId
  };
}

export async function getCompetitors(startupId) {
  await wait();

  return competitors.map((competitor) => ({
    ...competitor,
    startupId
  }));
}

export async function getPersonas(startupId) {
  await wait();

  return personas.map((persona) => ({
    ...persona,
    startupId
  }));
}

export async function getSwotData(startupId) {
  await wait();

  return {
    ...swotData,
    startupId
  };
}

export async function analyzeIdea(input) {
  await wait(900);

  return {
    ...ideaAnalysis,
    generatedFrom: input,
    generatedAt: new Date().toISOString(),
    sourceLabel: 'Mock AI output'
  };
}