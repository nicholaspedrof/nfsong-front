import { useState } from "react";

export function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(query);
    }

    function handleLimpar() {
        setQuery("");      
        onSearch("");      
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Busque sua música"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Pesquisar</button>
            {query && (
                <button type="button" onClick={handleLimpar}>
                    Limpar
                </button>
            )}
        </form>
    );
}