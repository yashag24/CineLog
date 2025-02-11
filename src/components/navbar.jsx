import React from "react";

// Logo component
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>CineLog</h1>
    </div>
  );
}

// Search component
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

// NUMresult component
function NUMresult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

// Navbar component
export function Navbar({ query, setQuery, movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <NUMresult movies={movies} />
    </nav>
  );
}