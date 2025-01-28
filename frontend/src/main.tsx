import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import { getRoot } from './utils/root';

const container = document.getElementById('root');

if (container) {
  const root = getRoot(container);
  const router = createBrowserRouter(routes);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </React.StrictMode>
  );
}
