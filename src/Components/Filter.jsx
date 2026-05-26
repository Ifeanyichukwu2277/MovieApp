import MovieCard from "./MovieCard";

const Filter = ({ movies, title, rating }) => {
  const filteredMovies = (movies || []).filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(title.toLowerCase());
    const matchesRating = Number(movie.rating) >= Number(rating || 0);
    return matchesTitle && matchesRating;
  });

  if (!filteredMovies.length) {
    return (
      <div className="rounded-2xl border border-fuchsia-400/20 bg-slate-900/70 p-8 text-center text-slate-300 shadow-lg shadow-slate-950/30 backdrop-blur-md">
        <p className="text-lg font-semibold text-white">No movies found</p>
        <p className="mt-2 text-sm text-slate-400">
          Try another title or lower the minimum rating.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 text-sm text-slate-300">
        Showing{" "}
        <span className="font-bold text-cyan-300">{filteredMovies.length}</span>{" "}
        movie{filteredMovies.length === 1 ? "" : "s"}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMovies.map((movie) => (
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

export default Filter;