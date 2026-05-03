import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch, FaMusic } from "react-icons/fa";
import "@/styles/styles.css";

export default function AppDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [search, setSearch] = useState("");
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();

    if (!search.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.deezer.com/search?q=${encodeURIComponent(search)}`
      );

      const data = await response.json();
      setMusics(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <main className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <div className="logo" onClick={() => navigate("/app")}>
          <FaMusic />
          <span>NFSong</span>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <FaSearch />
          <input
            type="text"
            placeholder="Pesquisar músicas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="profile" onClick={() => navigate("/profile")}>
          <FaUserCircle />
          <span>{user?.name || "Usuário"}</span>
        </div>

        <button className="logout" onClick={logout}>
          Sair
        </button>
      </header>

      {/* CONTEÚDO */}
      <section className="content">
        <h1>Buscar músicas</h1>

        {loading && <p>Buscando...</p>}

        {!loading && musics.length === 0 && (
          <p>Nenhuma música ainda. Pesquise algo acima.</p>
        )}

        <div className="music-grid">
          {musics.map((music) => (
            <div key={music.id} className="music-card">
              <img src={music.album.cover_medium} alt={music.title} />
              <h3>{music.title}</h3>
              <p>{music.artist.name}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}