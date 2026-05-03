import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import AppDashboard from "./pages/AppDashboard";

<Route
  path="/app"
  element={
    <PrivateRoute>
      <AppDashboard />
    </PrivateRoute>
  }
/>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROTA RAIZ */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ROTAS PÚBLICAS */}

        <Route
          path="/home"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      
        {/* ROTAS PRIVADAS */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <AppDashboard />
              </PrivateRoute>
            }
          />

        {/* ROTA NÃO ENCONTRADA */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;