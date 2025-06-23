export default function MovieBox(props) {
  const { title, director, metascore } = props.movie;

  return (
    <div className="movie-card">
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
  );
}
