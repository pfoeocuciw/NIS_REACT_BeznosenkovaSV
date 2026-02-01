import React from "react";
import { Movie, ViewMode } from "../types";


interface MovieCardProps {
    movie: Movie;
    view: ViewMode;
    onToggleFavorite: (id: number) => void;
}


export const MovieCard: React.FC<MovieCardProps> = ({ movie, view, onToggleFavorite }) => {
    const isGrid = view === "grid";


    return (
        <div
            className={
                "rounded-2xl shadow p-4 border border-gray-200 bg-white flex " +
                (isGrid ? "flex-col" : "flex-row gap-4 items-center")
            }
            data-testid={`movie-${movie.id}`}
        >
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className={
                    (isGrid ? "w-full h-64 object-cover" : "w-28 h-40 object-cover") +
                    " rounded-xl"
                }
            />


            <div className={isGrid ? "mt-3" : "flex-1"}>
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-semibold leading-tight">{movie.title}</h3>
                        <p className="text-sm text-gray-500">{movie.year}</p>
                    </div>
                    <button
                        aria-label={movie.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                        onClick={() => onToggleFavorite(movie.id)}
                        className={
                            "px-3 py-2 rounded-xl border transition active:scale-95 " +
                            (movie.isFavorite
                                ? "bg-yellow-100 border-yellow-300"
                                : "hover:bg-gray-50 border-gray-200")
                        }
                        title="В избранное"
                    >
                        <span className={movie.isFavorite ? "" : "opacity-50"}>⭐</span>
                    </button>
                </div>
            </div>
        </div>
    );
};