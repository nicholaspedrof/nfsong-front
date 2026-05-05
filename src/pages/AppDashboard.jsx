import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch, FaGuitar, FaRocket } from "react-icons/fa";
import { searchMusic } from "../services/api";
import { MusicCard } from "../components/MusicCard";
import { MusicModal } from "../components/MusicModal";
import "@/styles/AppDashboard.css";

const HISTORIA_CARDS = [
  {
    icon: <FaGuitar />,
    titulo: "A Origem",
    texto:
      "A NFSong nasceu de uma grande paixão pela música uma das formas mais antigas de expressão humana. Com o avanço da tecnologia, o acesso à música ficou melhor, mas às vezes confuso demais.tendo em vista essa necessidade, decidimos criar uma plataforma simples que facilite as pessoas a ter acesso a suas músicas favoritas e a descobrir novas.",
  },
  {
    icon: <FaSearch />,
    titulo: "O que fazemos",
    texto:
      "Através do banco de dados da deezer, basta você digitar o nome de uma música, artista ou albúm, que a nossa API, vai buscar 25 resultados com base na sua pesquisa. Além disso, ela traz informações completas sobre cada música, como nome, artista, album, um  preview de 30 segundos, além de um link, para escutar a música na plataforma!",
  },
  {
    icon: <FaRocket />,
    titulo: "Nosso objetivo",
    texto:
      "trazer a música para mais perto das pessoas, de forma rápida, fácil e acessível. Queremos que a NFSong seja o ponto de partida para suas jornadas musicais, ajudando você a redescobrir clássicos, encontrar novos favoritos e se conectar com a música de uma maneira totalmente nova.",
  },
];

const DEVS = [
  {
    nome: "Nicholas Pedro - Dev 1",
    linkedin: "https://www.linkedin.com/in/nicholas-pedro-ferreira-da-silva",
    github: "https://github.com/NicholasPedroF",
    instagram: "https://www.instagram.com/nc.ferreiraps/",
  },
  {
    nome: "Raphael Martins - Dev 2",
    linkedin: "https://www.linkedin.com/in/raphael-martins-15539826a/",
    github: "https://github.com/Raphaelmdev",
    instagram: "#",
  },
];

export default function AppDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("nfsong_session"));

  const [search,        setSearch]        = useState("");
  const [musics,        setMusics]        = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [loading,       setLoading]       = useState(false);
  const [searched,      setSearched]      = useState(false);
  const [error,         setError]         = useState("");

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

  function handleOpenModal(music)  { setSelectedMusic(music); }
  function handleCloseModal()      { setSelectedMusic(null);  }

  function logout() {
    localStorage.removeItem("nfsong_session");
    navigate("/"); // ← volta para a Home com vídeo
  }

  return (
    <div className="page-wrapper">

      {/* ── HEADER ── */}
      <header className="app-header">
        <div className="logo" onClick={() => navigate("/app")}>
          <span>NFSong</span>
        </div>

        <nav className="app-nav">
          <button className="app-nav-link" onClick={() => navigate("/")}>
            Home
          </button>
          <a className="app-nav-link" href="#historia">Nossa História</a>
          <a className="app-nav-link" href="#contato">Contato</a>
        </nav>

        <div className="app-header-right">
          <div className="profile" onClick={() => navigate("/profile")}>
            <FaUserCircle />
            <span>{user?.user?.nome || "Usuário"}</span>
          </div>
          <button className="logout" onClick={logout}>Sair</button>
        </div>
      </header>

      <MusicModal music={selectedMusic} onClose={handleCloseModal} />

      {/* ── HERO ── */}
      <header className="hero" id="home">
        <div className="hero-bg-image" />
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="pulse-dot" />
            <span>Descoberta musical inteligente</span>
          </div>

          <h1 className="hero-title">NFSong</h1>

          <h3 className="hero-sub">
            Encontre músicas, artistas e álbuns em poucos segundos.
          </h3>

          <p className="hero-desc">
            Pesquise pelo nome da música, artista ou álbum e veja informações
            completas, incluindo capa, artista, álbum e preview de 30 segundos.
          </p>

          <div className="hero-wave" aria-hidden="true">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </header>

      {/* ── BUSCA ── */}
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

      {/* ── RESULTADOS ── */}
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
              <MusicCard key={music.id} music={music} onOpen={handleOpenModal} />
            ))}
          </div>
        </section>
      )}

      {/* ── ESTADO VAZIO ── */}
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

      {/* ── NOSSA HISTÓRIA ── */}
      <section className="about" id="historia">
        <div className="section-label">
          <span className="label-line" />
          <span>Nossa história</span>
          <span className="label-line" />
        </div>

        <h2 className="about-inner-title">Project</h2>

        <div className="historia-cards">
          {HISTORIA_CARDS.map((card, i) => (
            <div className="historia-card" key={i}>
              <div className="historia-card-icon">{card.icon}</div>
              <h3 className="historia-card-titulo">{card.titulo}</h3>
              <p className="historia-card-texto">{card.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section className="contact-section" id="contato">
        <div className="section-label">
          <span className="label-line" />
          <span>Fale conosco</span>
          <span className="label-line" />
        </div>

        <div className="contact-card">
          <h2>Contato</h2>
          <p>
            Gostou do projeto? Conheça os desenvolvedores e acompanhe as
            novidades pelas redes sociais.
          </p>

          <div className="contact-devs">
            {DEVS.map((dev, i) => (
              <div className="contact-dev-block" key={i}>
                <span className="contact-dev-nome">{dev.nome}</span>
                <div className="contact-buttons">
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="contact-btn">LinkedIn</a>
                  <a href={dev.github}   target="_blank" rel="noopener noreferrer" className="contact-btn">GitHub</a>
                  <a href={dev.instagram} target="_blank" rel="noopener noreferrer" className="contact-btn">Instagram</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <p className="footer-brand">NFSong</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} NFSong — Música para todos
        </p>
      </footer>

    </div>
  );
}