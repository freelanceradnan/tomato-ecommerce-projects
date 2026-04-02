import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
// import App from './App.jsx'
import { Router } from './router/Router';
import { StoreContextProvider } from './contexts/StoreContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <StoreContextProvider>
    <RouterProvider router={Router}>
   
   </RouterProvider>
   </StoreContextProvider>
  </StrictMode>,
)
