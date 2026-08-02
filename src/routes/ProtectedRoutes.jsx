import { Navigate, Outlet } from 'react-router-dom';

// Simple protected route wrapper.
// Usage in routing config:
// <Route element={<ProtectedRoutes />}>
//   <Route path="/dashboard" element={<Dashboard />} />
// </Route>

const isAuthenticated = () => {
  // Customize this to match your auth logic (context, redux, cookie, etc.)
  try {
    const token = localStorage.getItem('authToken');
    return Boolean(token);
  } catch {
    return false;
  }
};

const ProtectedRoutes = ({ redirectPath = '/login' }) => {
  if (isAuthenticated()) {
    return <Outlet />; // render child routes
  }
  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoutes;
