import React from "react";
import "./App.css";
import SavedList from "./components/SavedList";
// movies arrayini movies.js dosyasından import et
import movies from "./movies.js";
import { Route, Routes } from "react-router-dom";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
// import { BrowserRouter as Router } from "react-router-dom"; // Eğer react-router-dom v6 kullanıyorsanız bu satırı kullanabilirsini

function App() {
  /*
    - kaydedilmiş filmler ve film listesi için 2 tane state tanımla.
    - film listesi için tanımladığın state'in başlangıç değerini movies.js'deki movies objesi olarak belirle.
    - kaydedilmiş filmler için tanımladığın state'in başlangıç değeri boş array olsun. 
    - bunu SavedList componentına prop olarak gönder.
  */
  const [moviesList, setMoviesList] = React.useState(movies);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const handleSave = (movie) => {
    /*
      - bu fonksiyon, parametre olarak aldığı movie'yi kaydedilmiş filmlere eklemeli.
      - aynı filmi 2. kez eklememeli.
      - bu fonksiyonu "Kaydet" butonunun olduğu componente prop olarak gönder.
    */
    if (!savedMovies.includes(movie)) {
      setSavedMovies([...savedMovies, movie]);
    }
  };

  return (
    <div className="page-container">
      <h1 className="grand-hotel-regular">Favori Filmlerim</h1>
      <div className="content">
        {/* 
          2 adet route tanımla:.
            - 1. route '/' olacak, MoviesList componentini görüntüleyecek ve ona film listesini props olarak yollayacak.
            - 2. route `/filmler/` parametresinden sonra `id` parametresini alacak  (örnek: `/filmler/2`, `/filmler/3`)
            - Bu route `MovieDetails` componentini görüntüleyecek.
        */}
        <Routes>
          <Route
            path="/"
            element={<MoviesList movies={moviesList} onSave={handleSave} />}
          />
          <Route
            path="/filmler/:id"
            element={<MovieDetails movies={moviesList} />}
          />
        </Routes>
        <SavedList savedList={savedList} />
      </div>
    </div>
  );
}

export default App;
