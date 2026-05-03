import { Navigate } from "react-router-dom";

const SESSION_KEY = "nfsong_session";

export function PrivateRoute({ children }) {
  const sessionData = localStorage.getItem(SESSION_KEY);

  if (!sessionData) {
    return <Navigate to="/login" replace />;
  }

  try {
    const session = JSON.parse(sessionData);

    if (!session.expiresAt || Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return <Navigate to="/login" replace />;
  }
}