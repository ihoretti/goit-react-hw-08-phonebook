import { useAuth } from 'hooks/useAuth';
//import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom';

export const RestrictedRoute = ({ component, redirectTo = '/' }) => {
  //const isLoggedIn  = useSelector(state => state.auth.isLoggedIn)
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};
