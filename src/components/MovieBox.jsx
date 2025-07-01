import React from "react";
import { Link } from "react-router-dom";

export default function MovieBox(props) {
  const { title, director, metascore } = props.movie;
  const { id } = props.movie;

  // MovieBox componenti, props olarak aldığı movie objesinden title, director ve metascore değerlerini kullanıyor.
  // Ayrıca id değerini de kullanarak Link oluşturacak.

  return (
    <Link to={`/filmler/${id}`} className="movie-card">
      <div className="movie-card-content">
        {/*
        filme tıklanınca /filmler/:id route'una yönlenmeli.
        İpucu: ekleyeceğin tıklanacak şey:
          - movie-card içinde olmalı
          - alttaki h3 ve p'leri kapsamalı.
      */}

        <h3>{title}</h3>
        <p>
          <strong>Director:</strong> {director}
        </p>
        <p>
          <strong>Metascore:</strong> {metascore}
        </p>
      </div>
    </Link>
  );
}
