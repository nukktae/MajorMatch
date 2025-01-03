import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { auth } from './config/firebase';
import './index.css';
import { getRoot } from './utils/root';

const container = document.getElementById('root');

if (container) {
  const root = getRoot(container);
  const router = createBrowserRouter(routes);

  // Initial render with loading state
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );

  // Re-render on auth state changes
  auth.onAuthStateChanged(() => {
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </React.StrictMode>
    );
  });
}
