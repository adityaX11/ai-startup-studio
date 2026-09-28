import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const emptySwot = {
  strengths: [],
  weaknesses: [],
  opportunities: [],
  threats: []
};

export const useAnalysisStore = create(
  persist(
    (set) => ({
      competitorsByStartup: {},
      swotByStartup: {},
      validationByStartup: {},

      initializeCompetitors: (startupId, competitors) =>
        set((state) => {
          if (state.competitorsByStartup[startupId]) {
            return state;
          }

          return {
            competitorsByStartup: {
              ...state.competitorsByStartup,
              [startupId]: competitors
            }
          };
        }),

      addCompetitor: (startupId, competitor) =>
        set((state) => ({
          competitorsByStartup: {
            ...state.competitorsByStartup,
            [startupId]: [
              ...(state.competitorsByStartup[startupId] || []),
              competitor
            ]
          }
        })),

      updateCompetitor: (startupId, competitorId, updates) =>
        set((state) => ({
          competitorsByStartup: {
            ...state.competitorsByStartup,
            [startupId]: (state.competitorsByStartup[startupId] || []).map(
              (competitor) =>
                competitor.id === competitorId
                  ? { ...competitor, ...updates }
                  : competitor
            )
          }
        })),

      removeCompetitor: (startupId, competitorId) =>
        set((state) => ({
          competitorsByStartup: {
            ...state.competitorsByStartup,
            [startupId]: (state.competitorsByStartup[startupId] || []).filter(
              (competitor) => competitor.id !== competitorId
            )
          }
        })),

      initializeSwot: (startupId, swot) =>
        set((state) => {
          if (state.swotByStartup[startupId]) {
            return state;
          }

          return {
            swotByStartup: {
              ...state.swotByStartup,
              [startupId]: swot
            }
          };
        }),

      addSwotItem: (startupId, section, value) =>
        set((state) => {
          const current = state.swotByStartup[startupId] || emptySwot;

          return {
            swotByStartup: {
              ...state.swotByStartup,
              [startupId]: {
                ...current,
                [section]: [...current[section], value]
              }
            }
          };
        }),

      removeSwotItem: (startupId, section, index) =>
        set((state) => {
          const current = state.swotByStartup[startupId];

          if (!current) {
            return state;
          }

          return {
            swotByStartup: {
              ...state.swotByStartup,
              [startupId]: {
                ...current,
                [section]: current[section].filter(
                  (_, itemIndex) => itemIndex !== index
                )
              }
            }
          };
        }),

      updateSwotItem: (startupId, section, index, value) =>
        set((state) => {
          const current = state.swotByStartup[startupId];

          if (!current) {
            return state;
          }

          return {
            swotByStartup: {
              ...state.swotByStartup,
              [startupId]: {
                ...current,
                [section]: current[section].map((item, itemIndex) =>
                  itemIndex === index ? value : item
                )
              }
            }
          };
        }),

      initializeValidation: (startupId, checklist) =>
        set((state) => {
          if (state.validationByStartup[startupId]) {
            return state;
          }

          return {
            validationByStartup: {
              ...state.validationByStartup,
              [startupId]: checklist
            }
          };
        }),

      toggleValidationItem: (startupId, index) =>
        set((state) => {
          const checklist = state.validationByStartup[startupId];

          if (!checklist) {
            return state;
          }

          return {
            validationByStartup: {
              ...state.validationByStartup,
              [startupId]: checklist.map((item, itemIndex) =>
                itemIndex === index
                  ? { ...item, completed: !item.completed }
                  : item
              )
            }
          };
        })
    }),
    {
      name: 'ai-startup-studio-analysis'
    }
  )
);