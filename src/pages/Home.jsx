import { useNavigate } from "react-router-dom";
import "@/styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* ── VÍDEO DE FUNDO ── */}
      <video
        className="home-video-bg"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* ── OVERLAY GRADIENTE ── */}
      <div className="home-overlay" />

      {/* ── CONTEÚDO ── */}
      <main className="home-center">

        <div className="home-eyebrow">
          <span className="home-pulse" />
          <span>Descoberta musical inteligente</span>
        </div>

        <h1 className="home-title">NFSong</h1>

        <p className="home-tagline">
          Encontre músicas, artistas e álbuns em poucos segundos.
        </p>

        <div className="home-actions">
          <button className="btn-cadastro" onClick={() => navigate("/register")}>
            Criar conta
          </button>
          <button className="btn-login" onClick={() => navigate("/login")}>
            Entrar
          </button>
        </div>

      </main>

      <footer className="home-footer">
        <span>© {new Date().getFullYear()} NFSong — Música para todos</span>
      </footer>

    </div>
  );
}