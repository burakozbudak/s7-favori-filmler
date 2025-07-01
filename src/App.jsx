import React, { useState } from "react";
import "./App.css";
import SavedList from "./components/SavedList";
import movies from "./movies";
import { Route, Routes } from "react-router-dom";
import MovieBox from "./components/MovieBox";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";

function App() {
  // Film listesi ve kaydedilmiş filmler için state'ler
  const [moviesList, setMoviesList] = useState(movies);
  const [savedMovies, setSavedMovies] = useState([]);

  const handleSave = (movie) => {
    // Aynı filmi 2. kez eklememek için kontrol
    if (!savedMovies.some((savedMovie) => savedMovie.id === movie.id)) {
      setSavedMovies([...savedMovies, movie]);
    }
  };

  return (
    <div className="app">
      {/* SavedList komponenti - kaydedilmiş filmler için */}
      <SavedList savedMovies={savedMovies} />

      <Routes>
        {/* Ana sayfa - film listesi */}
        <Route path="/" element={<MoviesList movies={moviesList} />} />

        {/* Film detay sayfası */}
        <Route
          path="/filmler/:id"
          element={
            <MovieDetails onSave={handleSave} savedMovies={savedMovies} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
