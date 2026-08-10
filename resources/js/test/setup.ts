import '@testing-library/jest-dom/vitest';
import './mocks/inertia';

// jsdom doesn't implement ResizeObserver, which Radix primitives (e.g. Checkbox) use.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver ??= ResizeObserverStub;
