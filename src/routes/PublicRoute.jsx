import { Navigate } from "react-router-dom";

const SESSION_KEY = "nfsong_session";

export function PublicRoute({ children }) {
  const sessionData = localStorage.getItem(SESSION_KEY);

  if (sessionData) {
    try {
      const session = JSON.parse(sessionData);

      if (session.expiresAt && Date.now() < session.expiresAt) {
        return <Navigate to="/" replace />;
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  }

  return children;
}