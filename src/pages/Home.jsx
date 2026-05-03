import { useState } from "react";
import { searchMusic } from "../services/api";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { MusicCard } from "../components/MusicCard";
import { MusicModal } from "../components/MusicModal";
import "@/styles/styles.css";

export default function Home() {
  const [musics, setMusics] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(query) {
    const cleanQuery = query.trim();

    setError("");

    if (cleanQuery === "") {
      setMusics([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      setSearched(true);

      const results = await searchMusic(cleanQuery);
      setMusics(results || []);
    } catch (err) {
      console.error("Erro ao buscar músicas:", err);
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

  return (
    <div className="page-wrapper">
      <Navbar />

      <MusicModal music={selectedMusic} onClose={handleCloseModal} />

      {/* HOME */}
      <header className="hero" id="home">
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
            completas, incluindo capa, artista, álbum, preview de 30 segundos
            e sugestões relacionadas.
          </p>

          <div className="hero-actions">
            <button
              className="btn-cadastro"
              onClick={() =>
                document.getElementById("buscar")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Começar busca
            </button>

            <button
              className="btn-login"
              onClick={() =>
                document.getElementById("historia")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Conhecer projeto
            </button>
          </div>

          <div className="hero-wave" aria-hidden="true">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="wave-bar"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </header>

      {/* INFORMAÇÕES */}
      <section className="info-section">
        <div className="info-card">
          <span>01</span>
          <h3>Pesquise</h3>
          <p>Digite o nome de uma música, artista ou álbum.</p>
        </div>

        <div className="info-card">
          <span>02</span>
          <h3>Explore</h3>
          <p>Veja capa, artista, álbum e informações principais.</p>
        </div>

        <div className="info-card">
          <span>03</span>
          <h3>Ouça</h3>
          <p>Reproduza um preview de 30 segundos quando disponível.</p>
        </div>
      </section>

      {/* BUSCA */}
      <section className="search-section" id="buscar">
        <div className="section-label">
          <span className="label-line" />
          <span>Buscar músicas</span>
          <span className="label-line" />
        </div>

        <h2 className="search-title">O que você quer ouvir hoje?</h2>

        <p className="search-description">
          Use a busca abaixo para consultar músicas através da API e visualizar
          os resultados em tempo real.
        </p>

        <SearchBar onSearch={handleSearch} />

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

      {/* HISTÓRIA */}
      <section className="about" id="historia">
        <div className="about-inner">
          <div className="section-label">
            <span className="label-line" />
            <span>Nossa história</span>
            <span className="label-line" />
          </div>

          <h2>Sobre o projeto</h2>

          <p>
            A NFSong nasceu da paixão por música e tecnologia. A proposta do
            projeto é facilitar o acesso a informações musicais de forma simples,
            moderna e acessível. Com apenas uma pesquisa, o usuário consegue
            encontrar dados sobre faixas, artistas, álbuns e ainda ouvir uma
            prévia da música.
          </p>
        </div>
      </section>

      {/* CONTATO */}
      <section className="contact-section" id="contato">
        <div className="section-label">
          <span className="label-line" />
          <span>Fale conosco</span>
          <span className="label-line" />
        </div>

        <div className="contact-card">
          <h2>Contato</h2>

          <p>
            Gostou do projeto? Acesse as redes abaixo para conhecer mais sobre
            o desenvolvimento e acompanhar novas atualizações.
          </p>

          <div className="contact-buttons">
            <a
              href="https://www.linkedin.com/in/nicholas-pedro-ferreira-da-silva"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/NicholasPedroF"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              GitHub
            </a>

            <a
              href="https://www.instagram.com/nc.ferreiraps/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              Instagram
            </a>
          </div>
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