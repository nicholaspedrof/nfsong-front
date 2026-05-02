import { useState } from "react";
import { searchMusic } from "../services/api";
import { SearchBar } from "../components/SearchBar";
import { MusicCard } from "../components/MusicCard";
import { Navbar } from "../components/Navbar";
import "../styles/styles.css";

export function Home() {
  const [musics, setMusics] = useState([]);

  async function handleSearch(query) {
    if (query === "") {
      setMusics([]);
      return;
    }
    const results = await searchMusic(query);
    setMusics(results);
  }

  return (
    <div className="page-wrapper">

      <Navbar />

      {/* HEADER / HERO */}
      <header className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="pulse-dot" />
            <span>Descoberta musical</span>
          </div>
          <h1 className="hero-title">NFSong</h1>
          <h3 className="hero-sub">sua música mais perto de você</h3>
          <p className="hero-desc">
            Através do nosso banco de dados, entregamos informações completas sobre
            as músicas que você deseja apenas escrevendo o nome, artista ou álbum.
            Artista, álbum, faixa e um preview de 30 segundos, além de títulos semelhantes.
          </p>
          <div className="hero-wave" aria-hidden="true">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </header>

      {/* BUSCA */}
      <section className="search-section">
        <p className="search-label">O que você quer ouvir hoje?</p>
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* RESULTADOS */}
      {musics.length > 0 && (
        <section className="results-section">
          <div className="results-header">
            <span className="results-count">{musics.length} resultado{musics.length !== 1 ? "s" : ""}</span>
            <div className="divider-line" />
          </div>
          <div className="grid">
            {musics.map((music) => (
              <MusicCard key={music.id} music={music} />
            ))}
          </div>
        </section>
      )}

      {/* ESTADO VAZIO */}
      {musics.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">♪</div>
          <p>Pesquise uma música, artista ou álbum para começar</p>
        </div>
      )}

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
            Se gostou do projeto e tem interesse em conhecer mais, entre em contato
            pelas redes sociais abaixo.
          </p>
          <div className="contact-buttons">
            <a
              href="https://www.linkedin.com/in/nicholas-pedro-ferreira-da-silva"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/NicholasPedroF"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub
            </a>
            <a
              href="https://www.instagram.com/nc.ferreiraps/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT / HISTÓRIA */}
      <section className="about" id="historia">
        <div className="about-inner">
          <div className="section-label">
            <span className="label-line" />
            <span>Nossa história</span>
            <span className="label-line" />
          </div>
          <h2>History</h2>
          <p>
            A NFSong surgiu a partir de uma grande paixão por música, que hoje é uma das melhores
            formas de expressar a arte. E através de facilitadores tecnológicos, como a internet,
            esse projeto veio com a intenção de levar a experiência musical para mais pessoas, de
            forma simples e acessível. Apenas pesquisando algo sobre a música, você terá acesso ao
            nosso grande banco de dados, e poderá conhecer mais sobre a música, o artista, o álbum
            e ainda ouvir um preview de 30 segundos. E claro, se gostar, poderá ouvir a música
            completa em outras plataformas. NFSong veio para espalhar uma arte que, desde a
            antiguidade, tem sido uma das formas mais poderosas de expressão humana.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <p className="footer-brand">NFSong</p>
        <p className="footer-copy">© {new Date().getFullYear()} NFSong — Música para todos</p>
      </footer>

    </div>
  );
}
