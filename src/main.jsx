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
import MyRatings from './pages/MyRatings.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import DashboardHome from './pages/DashboardHome.jsx';
import DashboardLayout from './layout/DashboardLayout.jsx';
import Profile from './pages/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      
      {
        path: "/all-properties",
        Component: AllProperties,
      },
      {
        path: "/property-details/:id",
        Component: PropertyDetails,
      },
    
     
    ],
  },

  // ================= DASHBOARD ROUTES =================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-properties",
        Component: MyProperties,
      },
      {
        path: "my-ratings",
        Component: MyRatings,
      },
      {
        path: "add-property",
        Component: AddProperty,
      },
      {
        path: "profile",
        Component: Profile,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
     <RouterProvider router={router} />
  </AuthProvider>
  </StrictMode>,
)
