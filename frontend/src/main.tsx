import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { auth } from './config/firebase'
import './index.css'

// Wait for Firebase Auth to initialize
auth.onAuthStateChanged(() => {
  const router = createBrowserRouter(routes)
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  )
})
