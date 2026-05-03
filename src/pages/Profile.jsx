import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "@/styles/styles.css";

const SESSION_KEY = "nfsong_session";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionData = localStorage.getItem(SESSION_KEY);

    if (!sessionData) {
      navigate("/login");
      return;
    }

    try {
      const session = JSON.parse(sessionData);

      if (!session.expiresAt || Date.now() > session.expiresAt) {
        localStorage.removeItem(SESSION_KEY);
        navigate("/login");
        return;
      }

      setUser(session.user);
    } catch {
      localStorage.removeItem(SESSION_KEY);
      navigate("/login");
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    navigate("/login");
  }

  if (!user) return null;

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="profile-page">
        <section className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.nome?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="profile-label">Minha conta</p>
              <h1 className="profile-title">Perfil</h1>
            </div>
          </div>

          <div className="profile-divider" />

          <div className="profile-info">
            <div className="profile-info-item">
              <span>Nome</span>
              <strong>{user.nome}</strong>
            </div>

            <div className="profile-info-item">
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div className="profile-info-item">
              <span>Data de nascimento</span>
              <strong>{user.dataNascimento}</strong>
            </div>
          </div>

          <button className="profile-logout-btn" onClick={handleLogout}>
            Sair da conta
          </button>
        </section>
      </main>
    </div>
  );
}