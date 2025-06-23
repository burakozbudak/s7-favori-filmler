/* bu dosyayı değiştirmene gerek yok */
import MovieBox from "./MovieBox.jsx";

export default function MoviesList({ movies }) {
  return (
    <div className="movies box">
      <h2>Tüm Filmler</h2>
      {movies.map((movie) => (
        <MovieBox key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
/* bu dosyayı değiştirmene gerek yok */
