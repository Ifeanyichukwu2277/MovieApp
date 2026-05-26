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
      <div className="relative">
        <img
          src={src}
          alt={title}
          loading="lazy"
          onError={() => setSrc(FALLBACK_POSTER)}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="movie-card__rating absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-sm font-semibold text-amber-200 backdrop-blur">
          ⭐ {rating}
        </span>
        <div className="movie-card__title-overlay absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-sm font-bold text-white line-clamp-1">{title}</h3>
        </div>
      </div>

      <div className="movie-card__details space-y-2 p-4">
        <p
          className="line-clamp-3 h-[3lh] text-sm text-slate-300"
          title={description}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;