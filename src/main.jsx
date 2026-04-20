import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
// import App from './App.jsx'
import Router from './router/Router.jsx';
import { StoreContextProvider } from './contexts/StoreContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './Feature/store';
createRoot(document.getElementById('root')).render(
   <Provider store={store}>
    <StoreContextProvider>
     <ToastContainer 
      position="top-center"
      autoClose={1500}
      theme="colored"
    />
    
    <RouterProvider router={Router} />
    
    </StoreContextProvider>
   </Provider>
)
