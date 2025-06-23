// movies arrayini movies.js dosyasından import et

export default function MovieDetails(props) {
  const { onSave } = props;
  /*
    - URL'deki id'yi params'dan al (ipucu: react-router-dom@5 dokümantasyonuna bakabilirsin.)
    - movies arrayinde o id ye sahip elemanı alttaki movie değişkenine eşitle
  */

  const movie = null;

  if (!movie) {
    return (
      <div className="movies box">
        <h2>Film bilgisi bulunamadı.</h2>
        <div className="movie-footer">
          {/* Geri dön butonuna tıklandığında bir önceki sayfaya gönder */}
          <button>Geri dön</button>
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
        <button data-testid="goBackBtn">Geri dön</button>
        {/* kaydet butonuna tıklandığında bu filmi kaydedilenler filmler state'ine ekle */}
        <button>Kaydet</button>
      </div>
    </div>
  );
}

// bonus: Bu componentta 2 tane return var. Nasıl düzgün çalışabiliyor?
