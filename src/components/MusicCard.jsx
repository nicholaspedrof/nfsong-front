import { useState } from "react";
import "@/styles/styles.css";

const SAVED_KEY = "nfsong_saved_musics";

function getSaved() {
  return JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
}

function isSaved(musicId) {
  return getSaved().some((m) => m.id === musicId);
}

function toggleSave(music) {
  const saved = getSaved();
  const exists = saved.some((m) => m.id === music.id);

  if (exists) {
    const updated = saved.filter((m) => m.id !== music.id);
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
    return false;
  } else {
    saved.push(music);
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    return true;
  }
}

export function MusicCard({ music, onOpen }) {
  const [saved, setSaved] = useState(() => isSaved(music.id));

  function handleSave(e) {
    e.stopPropagation();
    const result = toggleSave(music);
    setSaved(result);
  }

  return (
    <div className="card" onClick={() => onOpen(music)}>
      <img src={music.album.cover_medium} alt={music.title} />

      <h3>{music.title}</h3>
      <p>{music.artist.name}</p>

      <div className="card-footer">
        <div className="card-play-hint">▶ Ver detalhes</div>

        <button
          className={`card-save-btn ${saved ? "saved" : ""}`}
          onClick={handleSave}
          title={saved ? "Remover dos salvos" : "Salvar música"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}