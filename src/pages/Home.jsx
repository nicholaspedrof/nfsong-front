import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "@/styles/styles.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* HERO */}
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

          <div className="hero-actions">
            <button className="btn-cadastro" onClick={() => navigate("/register")}>
              <img src="/logo-nf.png" alt="" />
              Criar conta
            </button>
            <button className="btn-login" onClick={() => navigate("/login")}>
              <img src="/logo-nf.png" alt="" />
              Entrar
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