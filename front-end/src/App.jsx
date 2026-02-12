import { useState } from 'react'
 
import LandingpPage from './pages/LandingPage'
// import Home from './components/Home'
import Home from './pages/Home' 
import './App.css'
import AdminProducPage from './pages/admin/AdminProducPage'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductOverviewPage from './pages/ProductOverviewPage'
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingpPage></LandingpPage>,
  },
  {
    path:'/home',
    element:<Home></Home>
  },
  {
    path: "/admin/productForm",
    element: <AdminProducPage></AdminProducPage>,
  },
   
  {
    path: "/productOverview/:id",
    element: <ProductOverviewPage></ProductOverviewPage>,

  },
  // {
  //   path: "/shoppingCart",
  //   element: <ShoppingCartPage></ShoppingCartPage>,
  // },
  // {
  //   path: "/shoppingFavourite",
  //   element: <ShoppingFavouritePage></ShoppingFavouritePage>,
  // },
  // {
  //   path: "/admin/productForm/:id",
  //   element: <AdminProductFormPage></AdminProductFormPage>,
  // },
  // {
  //   path: "/admin/home",
  //   element: <AdminHome></AdminHome>,
  // },
  // {
  //   path: "/signup",
  //   element: <SignupPage></SignupPage>,
  // },
  // {
  //   path: "/login",
  //   element: <LoginPage></LoginPage>,
  // },
]);
function App() {
      
  return < > 
    <RouterProvider router={router} />

  </ >
}

export default App
