import '@testing-library/jest-dom/vitest'

if (typeof window !== 'undefined') {
  class MockIntersectionObserver {
    observe = () => {}
    unobserve = () => {}
    disconnect = () => {}
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.IntersectionObserver = MockIntersectionObserver as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  global.IntersectionObserver = MockIntersectionObserver as any
}
