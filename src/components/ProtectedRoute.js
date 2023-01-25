import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/sign-up" />;
  }
  return children;
}

export default ProtectedRoute;
