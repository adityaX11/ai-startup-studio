import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      loginMock: (user) =>
        set({
          isAuthenticated: true,
          user
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null
        })
    }),
    {
      name: 'ai-startup-studio-auth'
    }
  )
);