import React, { useContext } from 'react';
import { GlobalContext } from './HandleCommonVariables';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthenticationProviderProps {
  children: React.ReactNode; // Improved typing for children
}

const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
  const context = useContext(GlobalContext);
  const location = useLocation();
  const localStorageName = sessionStorage.getItem("tuckiAdminUser");

  // Logic check for authentication
  if (!context?.state.user && !localStorageName) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
  }

  // If the user is authenticated, render the children
  return <>{children}</>;
};

export default AuthenticationProvider;