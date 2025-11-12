import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layout/RootLayout.jsx';
import Home from './pages/Home.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import AddProperty from './pages/AddProperty.jsx';
import AllProperties from './pages/AllProperties.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import MyProperties from './pages/MyProperties.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { 
        index: true,
        Component: Home
      },
      {
        path: '/register',
        Component: Register
      },
       {
        path: '/login',
        Component: Login
      },
      {
        path: '/add-property',
        element: <PrivateRoute><AddProperty></AddProperty></PrivateRoute>
      },
      {
        path: '/all-properties',
        Component: AllProperties
      },
      {
        path: '/property-details/:id',
        element: <PrivateRoute><PropertyDetails></PropertyDetails></PrivateRoute>
      },
      {
        path: "/my-properties",
        element: <PrivateRoute><MyProperties></MyProperties></PrivateRoute>
      }
      
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
     <RouterProvider router={router} />
  </AuthProvider>
  </StrictMode>,
)
