import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Routes.tsx'
import './assets/globals.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
// Line 6 and 7 is how redux connects to react, provider wraps the whole app.
// Line 14 now "store" is injected and accesible from anywhere in the app.


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
