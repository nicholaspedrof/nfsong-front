import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { MusicModal } from "../components/MusicModal";
import "@/styles/styles.css";

const SESSION_KEY = "nfsong_session";
const SAVED_KEY = "nfsong_saved_musics";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [savedMusics, setSavedMusics] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);

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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
    setSavedMusics(saved);
  }, []);

  function handleRemove(musicId) {
    const updated = savedMusics.filter((m) => m.id !== musicId);
    setSavedMusics(updated);
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    navigate("/login");
  }

  function handleOpenModal(music) {
    setSelectedMusic(music);
  }

  function handleCloseModal() {
    setSelectedMusic(null);
  }

  if (!user) return null;

  return (
    <div className="page-wrapper">
      <Navbar />

      <MusicModal music={selectedMusic} onClose={handleCloseModal} />

      <main className="profile-page">

        {/* CARD DE PERFIL */}
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

        {/* MÚSICAS SALVAS */}
        <section className="saved-section">
          <div className="section-label">
            <span className="label-line" />
            <span>Músicas salvas</span>
            <span className="label-line" />
          </div>

          {savedMusics.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">♪</div>
              <p>Você ainda não salvou nenhuma música.</p>
            </div>
          ) : (
            <div className="grid">
              {savedMusics.map((music) => (
                <div
                  key={music.id}
                  className="card"
                  onClick={() => handleOpenModal(music)}
                >
                  <img src={music.album.cover_medium} alt={music.title} />
                  <h3>{music.title}</h3>
                  <p>{music.artist.name}</p>

                  <div className="card-footer">
                    <div className="card-play-hint">▶ Ver detalhes</div>

                    <button
                      className="card-save-btn saved"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(music.id);
                      }}
                      title="Remover dos salvos"
                    >
                      ♥
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}