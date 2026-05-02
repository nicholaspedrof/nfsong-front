export function MusicCard({ music }) {
    return(
        <div className="card">
            <img src={music.album.cover_medium} alt={music.title} />
            <h3>{music.title}</h3>
            <p>{music.artist.name}</p>

            <audio controls src={music.preview}></audio>
        </div>
    );
}