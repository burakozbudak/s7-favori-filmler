import { useParams, useNavigate, useLocation } from "react-router-dom";
import movies from "../movies.js";

export default function MovieDetails({ onSave, savedMovies }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Film bulma işlemi
  const movie =
    movies.find((m) => m.id.toString() === id) || location.state?.movie;

  // Geri dönme fonksiyonu
  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya dön
  };

  // Kaydetme fonksiyonu
  const handleSave = () => {
    if (onSave && movie && !savedMovies.some((m) => m.id === movie.id)) {
      onSave(movie);
    }
  };

  // Film bulunamazsa hata sayfası göster
  if (!movie) {
    return (
      <div className="error-page">
        <h2>Film bulunamadı!</h2>
        <button onClick={() => navigate("/")}>Ana Sayfaya Dön</button>
      </div>
    );
  }

  // Film bilgilerini ayır
  const { title, director, metascore, stars, description } = movie;

  // Film detaylarını göster
  return (
    <div className="movie-details">
      <h2>{title}</h2>
      <div className="details-content">
        <p>
          <strong>Yönetmen:</strong> {director}
        </p>
        {metascore && (
          <p>
            <strong>Puan:</strong> {metascore}
          </p>
        )}
        <p>
          <strong>Oyuncular:</strong> {stars.join(", ")}
        </p>
        {description && (
          <p>
            <strong>Konu:</strong> {description}
          </p>
        )}
      </div>
      <div className="action-buttons">
        <button onClick={handleGoBack} data-testid="goBackBtn">
          Geri Dön
        </button>
        {!savedMovies.some((m) => m.id === movie.id) && (
          <button onClick={handleSave}>Kaydet</button>
        )}
      </div>
    </div>
  );
}
