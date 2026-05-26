import { useParams, useNavigate } from "react-router-dom";
import movies from "../data";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <p className="text-2xl font-bold">Movie not found.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-xl bg-cyan-500 px-6 py-2 font-semibold text-white hover:bg-cyan-400"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl md:p-10">

        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          ← Back to Home
        </button>

        <div className="flex flex-col gap-6 sm:flex-row">
          <img
            src={movie.posterURL || "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.title}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300x450?text=No+Image")}
            className="h-64 w-44 self-start rounded-2xl object-cover shadow-xl"
          />
          <div className="flex flex-col justify-center gap-3">
            <h1 className="text-3xl font-black text-white">{movie.title}</h1>
            <span className="inline-flex w-fit rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-200">
              ⭐ {movie.rating} / 10
            </span>
            <p className="leading-relaxed text-slate-300">{movie.description}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-cyan-300">Official Trailer</h2>
          <div className="overflow-hidden rounded-2xl border border-white/15 shadow-xl">
            <iframe
              src={movie.trailerURL}
              title={`${movie.title} Trailer`}
              className="h-64 w-full md:h-96"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetail;