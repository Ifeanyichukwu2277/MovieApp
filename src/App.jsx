import Filter from "./Components/Filter";
import MovieList from "./Components/MovieList";
import MovieDetail from "./Components/MovieDetails";  // ADD THIS
import movies from "./data";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [movieItems, setMovieItems] = useState(movies);
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMovie = (event) => {
    event.preventDefault();
    const newMovie = {
      id: Date.now(),   // gives each new movie a unique id
      title: formData.title.trim(),
      description: formData.description.trim(),
      posterURL:
        formData.posterURL.trim() ||
        "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg",
      rating: Math.max(0, Math.min(10, Number(formData.rating))),
      trailerURL: "",   // new movies won't have a trailer yet
    };

    if (!newMovie.title || !newMovie.description || Number.isNaN(newMovie.rating)) return;

    setMovieItems((prev) => [newMovie, ...prev]);
    setFormData({ title: "", description: "", posterURL: "", rating: "" });
    closeModal();
  };

  const HomePage = (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-8 text-slate-100 md:px-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl md:p-8">
        <header className="app-header mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Curated Collection</p>
            <h1 className="mt-2 bg-linear-to-r from-white via-cyan-200 to-fuchsia-200 bg-clip-text text-4xl font-black text-transparent">
              Movie Gallery
            </h1>
            <p className="mt-2 text-slate-300">Search, filter and manage your favorite movies.</p>
          </div>
          <button
            className="add-movie-btn rounded-xl bg-linear-to-r from-cyan-500 to-fuchsia-500 px-5 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-[1.02]"
            onClick={openModal}
          >
            + Add Movie
          </button>
        </header>

        <section className="search-bar mb-8 grid gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4 md:grid-cols-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by movie title..."
            className="search-input w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 outline-none ring-cyan-400 transition focus:ring-2"
          />
          <input
            type="number"
            min="0"
            max="10"
            step="0.5"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            placeholder="Minimum rating (0 to 10)"
            className="rating-input w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 outline-none ring-fuchsia-400 transition focus:ring-2"
          />
        </section>

        {searchTerm || minRating ? (
          <Filter movies={movieItems} title={searchTerm} rating={minRating} />
        ) : (
          <MovieList movies={movieItems} />
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <div className="modal-content w-full max-w-lg rounded-3xl border border-white/15 bg-linear-to-br from-slate-900 to-slate-950 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Add New Movie</h2>
              <button onClick={closeModal} className="rounded-lg border border-white/20 px-3 py-1 text-sm text-slate-300 transition hover:bg-white/10">
                Close
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleAddMovie}>
              <input name="title" value={formData.title} onChange={handleFormChange} placeholder="Movie title" className="w-full rounded-xl border border-white/15 bg-slate-800/70 px-4 py-3 outline-none ring-cyan-400 transition focus:ring-2" required />
              <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="Movie description" rows={4} className="w-full rounded-xl border border-white/15 bg-slate-800/70 px-4 py-3 outline-none ring-cyan-400 transition focus:ring-2" required />
              <input name="posterURL" value={formData.posterURL} onChange={handleFormChange} placeholder="Poster URL (optional)" className="w-full rounded-xl border border-white/15 bg-slate-800/70 px-4 py-3 outline-none ring-cyan-400 transition focus:ring-2" />
              <input type="number" name="rating" value={formData.rating} onChange={handleFormChange} min="0" max="10" step="0.1" placeholder="Rating (0 to 10)" className="w-full rounded-xl border border-white/15 bg-slate-800/70 px-4 py-3 outline-none ring-cyan-400 transition focus:ring-2" required />
              <button type="submit" className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-fuchsia-500 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.01]">
                Save Movie
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={HomePage} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
};

export default App;