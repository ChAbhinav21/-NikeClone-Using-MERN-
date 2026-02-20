import React, { useEffect } from 'react';
import LandingpPage from './pages/LandingPage';
import Home from './pages/Home';
import AdminProducPage from './pages/admin/AdminProducPage';
import ProductOverviewPage from './pages/ProductOverviewPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserAsync, selectStatus } from './features/auth/AuthSlice';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchCurrentUserAsync());
  }, [dispatch]);

  // Show loading screen while checking for existing user
  if (status === 'loading') {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  const router = createBrowserRouter([
    { path: '/', element: <LandingpPage /> },
    { path: '/home', element: <ProtectedRoute>
        <Home />
      </ProtectedRoute>
 },
    { path: '/admin/productForm', element: <AdminProducPage /> },
    { path: '/productOverview/:id', element: <ProductOverviewPage /> },
    {
      path: '/signup',
      element: (
        <ProtectedRoute redirectIfAuth={true}>
          <SignupPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element: (
        <ProtectedRoute redirectIfAuth={true}>
          <LoginPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
