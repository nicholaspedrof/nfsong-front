import "@/styles/styles.css";

export function MusicModal({ music, onClose }) {
  if (!music) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-cover-wrap">
          <img src={music.album.cover_xl || music.album.cover_medium} alt={music.title} className="modal-cover" />
          <div className="modal-cover-glow" />
        </div>

        <div className="modal-info">
          <p className="modal-album">{music.album.title}</p>
          <h2 className="modal-title">{music.title}</h2>
          <p className="modal-artist">{music.artist.name}</p>

          <div className="modal-divider" />

          <p className="modal-preview-label">Preview · 30s</p>
          <audio controls src={music.preview} className="modal-audio" />

          <a
            href={music.link}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-deezer-btn"
          >
            Ouvir no Deezer
          </a>
        </div>

      </div>
    </div>
  );
}