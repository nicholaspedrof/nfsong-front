import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeadphones, FaTrash } from "react-icons/fa";
import { Navbar } from "../components/Navbar";
import { MusicModal } from "../components/MusicModal";
import "@/styles/Profile.css";

const SESSION_KEY = "nfsong_session";
const SAVED_KEY   = "nfsong_saved_musics";

export default function Profile() {
  const navigate = useNavigate();

  const [user,          setUser]          = useState(null);
  const [savedMusics,   setSavedMusics]   = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [filterQuery,   setFilterQuery]   = useState("");

  useEffect(() => {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) { navigate("/login"); return; }
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

  const filteredMusics = savedMusics.filter((m) => {
    const q = filterQuery.toLowerCase();
    return (
      m.title?.toLowerCase().includes(q) ||
      m.artist?.name?.toLowerCase().includes(q) ||
      m.album?.title?.toLowerCase().includes(q)
    );
  });

  function handleRemove(e, musicId) {
    e.stopPropagation();
    const updated = savedMusics.filter((m) => m.id !== musicId);
    setSavedMusics(updated);
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    navigate("/");
  }

  if (!user) return null;

  return (
    <div className="page-wrapper">
      <Navbar />
      <MusicModal music={selectedMusic} onClose={() => setSelectedMusic(null)} />

      {/* profile-page só serve de área de padding/background */}
      <main className="profile-page">

        {/* ← ESTE é o wrapper que faz as duas colunas → */}
        <div className="profile-layout">

          {/* ══ SIDEBAR ESQUERDA ══ */}
          <aside className="profile-sidebar">
            <div className="profile-avatar">
              {user.nome?.charAt(0).toUpperCase()}
            </div>

            <p className="profile-label">Minha conta</p>
            <h1 className="profile-title">Perfil</h1>

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
                <span>Nascimento</span>
                <strong>{user.dataNascimento}</strong>
              </div>
            </div>

            <div className="profile-saved-count">
              <FaHeadphones />
              <span>
                {savedMusics.length}{" "}
                {savedMusics.length === 1 ? "música salva" : "músicas salvas"}
              </span>
            </div>

            <button className="profile-logout-btn" onClick={handleLogout}>
              Sair da conta
            </button>
          </aside>

          {/* ══ MAIN — lista de músicas ══ */}
          <section className="profile-main">
            <div className="section-label">
              <span className="label-line" />
              <span>Músicas salvas</span>
              <span className="label-line" />
            </div>

            {savedMusics.length > 0 && (
              <div className="saved-search-wrapper">
                <div className="saved-search-inner">
                  <FaSearch className="saved-search-icon" />
                  <input
                    type="text"
                    className="saved-search-input"
                    placeholder="Pesquisar nas suas músicas salvas..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                  />
                  {filterQuery && (
                    <button
                      className="saved-search-clear"
                      onClick={() => setFilterQuery("")}
                      title="Limpar"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {filterQuery && (
                  <p className="saved-search-result-info">
                    {filteredMusics.length}{" "}
                    {filteredMusics.length === 1 ? "resultado" : "resultados"}{" "}
                    para <strong>"{filterQuery}"</strong>
                  </p>
                )}
              </div>
            )}

            {savedMusics.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">♪</div>
                <p>Você ainda não salvou nenhuma música.</p>
              </div>
            )}

            {savedMusics.length > 0 && filteredMusics.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">♪</div>
                <p>Nenhuma música encontrada para essa pesquisa.</p>
              </div>
            )}

            {filteredMusics.length > 0 && (
              <div className="music-list">
                {filteredMusics.map((music, index) => (
                  <div
                    key={music.id}
                    className="music-list-item"
                    onClick={() => setSelectedMusic(music)}
                  >
                    <span className="music-list-index">{index + 1}</span>

                    <img
                      className="music-list-cover"
                      src={music.album.cover_medium}
                      alt={music.title}
                    />

                    <div className="music-list-info">
                      <span className="music-list-title">{music.title}</span>
                      <span className="music-list-artist">{music.artist.name}</span>
                    </div>

                    <span className="music-list-album">{music.album.title}</span>

                    <span className="music-list-play-hint">▶ Ver</span>

                    <button
                      className="music-list-remove-btn"
                      onClick={(e) => handleRemove(e, music.id)}
                      title="Remover dos salvos"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>{/* fim .profile-layout */}
      </main>
    </div>
  );
}