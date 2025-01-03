import { createRoot } from 'react-dom/client';

let root: ReturnType<typeof createRoot> | null = null;

export const getRoot = (container: HTMLElement) => {
  if (!root) {
    root = createRoot(container);
  }
  return root;
}; 