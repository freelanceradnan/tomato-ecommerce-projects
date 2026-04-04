import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
// import App from './App.jsx'
import { Router } from './router/Router';
import { StoreContextProvider } from './contexts/StoreContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <StoreContextProvider>
     <ToastContainer 
      position="top-center"
      autoClose={1500}
      theme="colored"
    />
    
    <RouterProvider router={Router}>
   
   </RouterProvider>
   </StoreContextProvider>
  </StrictMode>,
)
