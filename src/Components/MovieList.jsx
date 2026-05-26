import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="rounded-2xl border border-white/15 bg-slate-900/50 p-8 text-center text-slate-300">
        No movies match your filters yet.
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 text-sm text-slate-300">
        Showing <span className="font-bold text-cyan-300">{movies.length}</span>{" "}
        movie{movies.length === 1 ? "" : "s"}
      </div>
      <div className="movie-list grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            description={movie.description}
            posterURL={movie.posterURL}
            rating={movie.rating}
          />
        ))}
      </div>
    </>
  );
};

export default MovieList;