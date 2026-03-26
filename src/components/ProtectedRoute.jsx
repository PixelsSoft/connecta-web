import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute component that:
 * 1. Redirects unauthenticated users to login
 * 2. Redirects users to correct dashboard based on their role
 * 3. Prevents professionals from accessing customer routes and vice versa
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no role restrictions, allow access
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user's role is allowed
  const userRole = user?.user_type;
  if (!allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on user type
    if (userRole === 'professional') {
      return <Navigate to="/recruiter/posted-jobs" replace />;
    } else {
      return <Navigate to="/user/saved-leads" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
