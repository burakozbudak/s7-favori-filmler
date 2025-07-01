// movies arrayini movies.js dosyasından import et
import { useParams, useHistory } from "react-router-dom";

export default function MovieDetails(props) {
  const { onSave } = props;
  const { movies } = props;
  const { id } = useParams();
  const history = useHistory();

  /*
    - useParams hook'unu kullanarak URL'den id'yi al.
    - useHistory hook'unu kullanarak geri dönmek için history nesnesini al.
  */
  /*
    - URL'deki id'yi params'dan al (ipucu: react-router-dom@5 dokümantasyonuna bakabilirsin.)
    - movies arrayinde o id ye sahip elemanı alttaki movie değişkenine eşitle
  */
  const movie = movies.find((movie) => movie.id.toString() === id);
  const handleGoBack = () => {
    // Geri dön butonuna tıklandığında bir önceki sayfaya git
    history.goBack();
  };
  const handleSave = () => {
    // Kaydet butonuna tıklandığında bu filmi kaydedilenler filmler state'ine ekle
    if (onSave && movie) {
      onSave(movie);
    }
  };

  if (!movie) {
    return (
      <div className="movies box">
        <h2>Film bilgisi bulunamadı.</h2>
        <div className="movie-footer">
          {/* Geri dön butonuna tıklandığında bir önceki sayfaya gönder */}
          <button onClick={handleGoBack}>Geri dön</button>
        </div>
      </div>
    );
  }

  const { title, director, metascore, stars } = movie;

  return (
    <div className="movies box">
      <h2>{title}</h2>
      <div className="movie-details">
        <p>Film ID: {id}</p>
        <p>
          <strong>Director:</strong> {director}
        </p>
        <p>
          <strong>Metascore:</strong> {metascore}
        </p>
        <p>
          <strong>Actors:</strong> {stars.join(", ")}
        </p>
      </div>
      <div className="movie-footer">
        {/* Geri dön butonuna tıklandığında bir önceki sayfaya gönder */}
        <button onClick={handleGoBack} data-testid="goBackBtn">
          Geri dön
        </button>
        {/* kaydet butonuna tıklandığında bu filmi kaydedilenler filmler state'ine ekle */}
        <button onClick={handleSave}>Kaydet</button>
      </div>
    </div>
  );
}

// bonus: Bu componentta 2 tane return var. Nasıl düzgün çalışabiliyor?
