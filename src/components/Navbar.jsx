import { useNavigate, useLocation, Link } from "react-router-dom";
import "@/styles/styles.css";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  function scrollTo(id) {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }

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
          className={`navbar-link${location.pathname === "/" ? " active" : ""}`}
        >
          Home
        </Link>
        <button className="navbar-link" onClick={() => scrollTo("contato")}>
          Contato
        </button>
        <button className="navbar-link" onClick={() => scrollTo("historia")}>
          Nossa história
        </button>
      </div>

      {/* AUTH */}
      <div className="navbar-auth">
        <button className="btn-login" onClick={() => navigate("/login")}>
          Entrar
        </button>
        <button className="btn-cadastro" onClick={() => navigate("/Register")}>
          Cadastrar
        </button>
      </div>

    </nav>
  );
}
