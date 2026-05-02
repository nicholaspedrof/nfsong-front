import "@/styles/styles.css";

export function MusicCard({ music, onOpen }) {
  return (
    <div className="card" onClick={() => onOpen(music)}>
      <img src={music.album.cover_medium} alt={music.title} />
      <h3>{music.title}</h3>
      <p>{music.artist.name}</p>
      <div className="card-play-hint">▶ Ver detalhes</div>
    </div>
  );
}