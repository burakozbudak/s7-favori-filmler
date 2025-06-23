/* bu dosyayı değiştirmene gerek yok */
export default function SavedList(props) {
  return (
    <div className="favs box">
      <h2>Kaydedilen Filmler</h2>
      {props.savedList.map((movie, index) => (
        <div
          key={index}
          className="movie-card"
          data-testid={"saved_" + movie.id}
        >
          {movie.title}
        </div>
      ))}
    </div>
  );
}
/* bu dosyayı değiştirmene gerek yok */
