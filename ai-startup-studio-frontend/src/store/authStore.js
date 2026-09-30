import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  isLoading: false,

  setSession: ({ user, accessToken }) =>
    set({
      isAuthenticated: true,
      user,
      accessToken,
      isLoading: false
    }),

  clearSession: () =>
    set({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      isLoading: false
    }),

  setLoading: (isLoading) =>
    set({
      isLoading
    })
}));