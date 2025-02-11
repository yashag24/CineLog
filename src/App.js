import { useState, useCallback } from "react";
import "./index.css";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { Navbar } from "./components/navbar";
import { Box } from "./components/box";
import { Main } from "./components/main";
import { Loader } from "./components/loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { Movielist } from "./components/MovieList";
import { MovieDetails } from "./components/MovieDetails";
import { WatchedList } from "./components/WatchedList";
import { Summary } from "./components/Summary";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [selectedId, setSelectedId] = useState(null);

  // ✅ Fix: Memoized function to prevent ESLint warning
  const handleCloseMovie = useCallback(() => {
    setSelectedId(null);
  }, []);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  function handleSelectMovie(id) {
    setSelectedId((prevId) => (id === prevId ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((prevWatched) =>
      prevWatched.some((m) => m.imdbID === movie.imdbID)
        ? prevWatched
        : [...prevWatched, movie]
    );
  }

  function handleDeleteWatched(id) {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== id)
    );
  }

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <Movielist movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
              movies={movies}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
