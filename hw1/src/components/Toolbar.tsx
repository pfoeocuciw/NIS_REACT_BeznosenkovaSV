import React from "react";
import { Filter, ViewMode } from "../types";


interface ToolbarProps {
    filter: Filter;
    setFilter: (f: Filter) => void;
    view: ViewMode;
    setView: (v: ViewMode) => void;
    searchInputRef: InputRef;
    onSearchInput: () => void;
}
export type InputRef =
    | React.RefObject<HTMLInputElement>
    | React.MutableRefObject<HTMLInputElement | null>;

export const Toolbar: React.FC<ToolbarProps> = ({
                                                    setFilter,
                                                    view,
                                                    filter,
                                                    setView,
                                                    searchInputRef,
                                                    onSearchInput,
                                                }) => {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setFilter("all")}
                    className={
                        "px-3 py-2 rounded-xl border " +
                        (filter === "all" ? "bg-gray-900 text-white" : "bg-white")
                    }
                >
                    Все
                </button>
                <button
                    onClick={() => setFilter("favorites")}
                    className={
                        "px-3 py-2 rounded-xl border " +
                        (filter === "favorites" ? "bg-gray-900 text-white" : "bg-white")
                    }
                >
                    Только избранные
                </button>
            </div>


            <div className="flex items-center gap-2">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Поиск по названию"
                    onInput={onSearchInput}
                    className="px-3 py-2 border rounded-xl w-72"
                />
                <div className="inline-flex rounded-xl overflow-hidden border">
                    <button
                        onClick={() => setView("grid")}
                        className={
                            "px-3 py-2 " + (view === "grid" ? "bg-gray-900 text-white" : "bg-white")
                        }
                        title="Плитка"
                    >
                        ⬛
                    </button>
                    <button
                        onClick={() => setView("list")}
                        className={
                            "px-3 py-2 border-l " + (view === "list" ? "bg-gray-900 text-white" : "bg-white")
                        }
                        title="Список"
                    >
                        ☰
                    </button>
                </div>
            </div>
        </div>
    );
};