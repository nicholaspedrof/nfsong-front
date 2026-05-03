import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "@/styles/styles.css";

const SESSION_KEY = "nfsong_session";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadSession();

    function handleStorageChange() {
      loadSession();
    }

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChanged", handleStorageChange);
    };
  }, []);

  function loadSession() {
    const sessionData = localStorage.getItem(SESSION_KEY);

    if (!sessionData) {
      setUser(null);
      return;
    }

    try {
      const session = JSON.parse(sessionData);

      if (session?.expiresAt && Date.now() < session.expiresAt) {
        setUser(session.user);
      } else {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
      setUser(null);
    }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);

    window.dispatchEvent(new Event("authChanged"));

    navigate("/");
  }

  function scrollTo(id) {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);

      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const isHome = location.pathname === "/";
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isProfile = location.pathname === "/profile";

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src="/logo-nf.png" alt="NFSong" />
      </div>

      {/* LINKS */}
      <div className="navbar-links">
        <Link
          to="/"
          className={`navbar-link${isHome ? " active" : ""}`}
        >
          Home
        </Link>

        <button className="navbar-link" onClick={() => scrollTo("contato")}>
          Contato
        </button>

        <button className="navbar-link" onClick={() => scrollTo("historia")}>
          Nossa história
        </button>

        {user && (
          <Link
            to="/profile"
            className={`navbar-link${isProfile ? " active" : ""}`}
          >
            Perfil
          </Link>
        )}
      </div>

      {/* AUTH */}
      <div className="navbar-auth">
        {!user ? (
          <>
            {!isLogin && (
              <button className="btn-login" onClick={() => navigate("/login")}>
                Entrar
              </button>
            )}

            {!isRegister && (
              <button
                className="btn-cadastro"
                onClick={() => navigate("/register")}
              >
                Cadastrar
              </button>
            )}
          </>
        ) : (
          <>
            <span className="navbar-user-name">
              {user.nome || user.name || "Usuário"}
            </span>

            <button className="btn-login" onClick={logout}>
              Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
}