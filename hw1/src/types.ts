export type ViewMode = "grid" | "list";
export type Filter = "all" | "favorites";


export interface Movie {
    id: number;
    title: string;
    year: number;
    posterUrl: string;
    isFavorite: boolean;
}