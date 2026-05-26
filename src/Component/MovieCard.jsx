import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FALLBACK_POSTER = 
  "https://via.placeholder.com/400x600?text=No+Image";

const MovieCard = ({
  id,
  title = "Movie Title",
  description = "Movie Description",
  posterURL = "",
  rating = 0,
}) => {
  const navigate = useNavigate();
  const [src, setSrc] = useState(posterURL || FALLBACK_POSTER);

  return (
    <div
      onClick={() => navigate(`/movie/${id}`)}
      className="movie-card group cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-slate-900/70 shadow-xl shadow-slate-950/40 transition hover:-translate-y-1 hover:border-cyan-400/50"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/movie/${id}`)}
    >
      <div className="relative poster-wrap">
        <img
          src={src}
          alt={title}
          loading="lazy"
          onError={() => setSrc(FALLBACK_POSTER)}
          className="movie-card__poster"
        />
        <span className="movie-card__rating absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-sm font-semibold text-amber-200 backdrop-blur">
          ⭐ {rating}
        </span>
      </div>

      <div className="movie-card__details space-y-2 p-4">
        <div className="movie-card__header">
          <h3 className="movie-card__title" title={title}>{title}</h3>
        </div>
        <p className="movie-card__description" title={description}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;