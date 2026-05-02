import "../styles/styles.css";

export function Navbar() {
  function scrollTo(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="navbar">
      <span className="navbar-brand">NFSong</span>
      <div className="navbar-links">
        <button className="navbar-link" onClick={() => scrollTo("contato")}>
          Contato
        </button>
        <button className="navbar-link" onClick={() => scrollTo("historia")}>
          Nossa história
        </button>
      </div>
    </nav>
  );
}
