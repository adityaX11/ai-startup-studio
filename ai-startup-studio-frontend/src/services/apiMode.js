export function isMockMode() {
  return import.meta.env.VITE_ENABLE_MOCKS !== 'false';
}
