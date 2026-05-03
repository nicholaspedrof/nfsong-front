import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch, FaMusic } from "react-icons/fa";
import { searchMusic } from "../services/api";
import { MusicCard } from "../components/MusicCard";
import { MusicModal } from "../components/MusicModal";
import "@/styles/styles.css";

export default function AppDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("nfsong_session"));

  const [search, setSearch] = useState("");
  const [musics, setMusics] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();

    const cleanQuery = search.trim();
    setError("");

    if (!cleanQuery) return;

    try {
      setLoading(true);
      setSearched(true);

      const results = await searchMusic(cleanQuery);
      setMusics(results || []);
    } catch (err) {
      console.error(err);
      setMusics([]);
      setError("Não foi possível buscar as músicas agora. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenModal(music) {
    setSelectedMusic(music);
  }

  function handleCloseModal() {
    setSelectedMusic(null);
  }

  function logout() {
    localStorage.removeItem("nfsong_session");
    navigate("/login");
  }

  return (
    <div className="page-wrapper">
      {/* HEADER */}
      <header className="app-header">
        <div className="logo" onClick={() => navigate("/app")}>
          <FaMusic />
          <span>NFSong</span>
        </div>

        <div className="profile" onClick={() => navigate("/profile")}>
          <FaUserCircle />
          <span>{user?.user?.nome || "Usuário"}</span>
        </div>

        <button className="logout" onClick={logout}>
          Sair
        </button>
      </header>

      <MusicModal music={selectedMusic} onClose={handleCloseModal} />

      {/* HERO COM IMAGEM */}
      <div className="app-hero">
        <div className="app-hero-bg" />
        <div className="app-hero-fade" />
        <div className="app-hero-content">
          <img src="/logo-nf.png" alt="NFSong" className="app-hero-logo" />
          <p className="app-hero-greeting">Seja bem-vindo</p>
        </div>
      </div>

      {/* BUSCA */}
      <section className="search-section" id="buscar">
        <div className="section-label">
          <span className="label-line" />
          <span>Buscar músicas</span>
          <span className="label-line" />
        </div>

        <h2 className="search-title">O que você quer ouvir hoje?</h2>

        <p className="search-description">
          Pesquise pelo nome da música, artista ou álbum e veja os resultados em tempo real.
        </p>

        <form onSubmit={handleSearch}>
          <div className="search-bar-wrapper">
            <div className="search-bar-inner">
              <FaSearch className="search-bar-icon" />
              <input
                className="search-bar-input"
                type="text"
                placeholder="Nome da música, artista ou álbum..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="search-bar-btn">Buscar</button>
            </div>
          </div>
        </form>

        {loading && (
          <div className="empty-state">
            <div className="empty-icon">♪</div>
            <p>Buscando músicas...</p>
          </div>
        )}

        {error && !loading && (
          <div className="empty-state">
            <div className="empty-icon">!</div>
            <p>{error}</p>
          </div>
        )}
      </section>

      {/* RESULTADOS */}
      {!loading && musics.length > 0 && (
        <section className="results-section">
          <div className="results-header">
            <span className="results-count">
              {musics.length} resultado{musics.length !== 1 ? "s" : ""}
            </span>
            <div className="divider-line" />
          </div>

          <div className="grid">
            {musics.map((music) => (
              <MusicCard
                key={music.id}
                music={music}
                onOpen={handleOpenModal}
              />
            ))}
          </div>
        </section>
      )}

      {/* ESTADO INICIAL / SEM RESULTADO */}
      {!loading && !error && musics.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">♪</div>
          {!searched ? (
            <p>Pesquise uma música, artista ou álbum para começar.</p>
          ) : (
            <p>Nenhum resultado encontrado para essa busca.</p>
          )}
        </div>
      )}

      {/* NOSSA HISTÓRIA */}
      <section className="about" id="historia">
        <div className="about-inner">
          <div className="section-label">
            <span className="label-line" />
            <span>Nossa história</span>
            <span className="label-line" />
          </div>

          <h2>Project</h2>

          <p>
            A NFSong surgiu, através de uma grande paixão pela arte da música, que desde a antiguidade tem sido uma forma de expressão humana. E com o avanço da tecnologia, o acesso a música se tornou melhor, porém confuso as vezes. E vendo essa problemática, surgiu a NFSong, um site que te permite pesquisar por músicas, artistas e álbuns de forma rápida e fácil. Colocando apenas o nome, você tem acesso a músicas e titulos semelhantes, além de informações completas sobre cada música, incluindo capa, artista, álbum e um preview de 30 segundos para você ouvir um trecho antes de salvar ou compartilhar. A NFSong é o seu companheiro musical definitivo, tornando a descoberta e o compartilhamento de música mais fácil do que nunca.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <p className="footer-brand">NFSong</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} NFSong — Música para todos
        </p>
      </footer>
    </div>
  );
}