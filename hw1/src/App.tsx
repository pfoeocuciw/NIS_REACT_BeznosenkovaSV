// src/App.tsx
import React, { useMemo, useRef, useState } from "react";
import type { Movie, Filter, ViewMode } from "./types";          // если types.ts в src/
import { initialMovies } from "./data/movies";                    // если movies.ts в src/data/
import { Toolbar } from "./components/Toolbar";
import { MovieCard } from "./components/MovieCard";

const App: React.FC = () => {
  // состояния
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<ViewMode>("grid");

  // значение поиска держим в ref, перерендерим через tick
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTick, setSearchTick] = useState(0);
  const bump = () => setSearchTick((x) => x + 1);

  const toggleFavorite = (id: number) => {
    setMovies((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
    );
  };

  const filtered = useMemo(() => {
    const term = (searchInputRef.current?.value ?? "").trim().toLowerCase();

    return movies
        .filter((m) => (filter === "favorites" ? m.isFavorite : true))
        .filter((m) => (term ? m.title.toLowerCase().includes(term) : true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, filter, searchTick]); // реагируем на bump(), а не на ref.value напрямую

  return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">🎬 Фильмы</h1>

          <Toolbar
              filter={filter}
              setFilter={setFilter}
              view={view}
              setView={setView}
              searchInputRef={searchInputRef}
              onSearchInput={bump}
          />

          <div className="mt-6">
            {filtered.length === 0 ? (
                <p className="text-gray-500">Фильмов нет</p>
            ) : (
                <div
                    className={
                      view === "grid"
                          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                          : "flex flex-col gap-3"
                    }
                >
                  {filtered.map((movie) => (
                      <MovieCard
                          key={movie.id}
                          movie={movie}
                          view={view}
                          onToggleFavorite={toggleFavorite}
                      />
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default App;
