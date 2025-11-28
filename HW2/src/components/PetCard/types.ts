export type Mood = 'happy' | 'neutral' | 'tired' | 'sad' | 'offline';

export interface Pet {
    id: number;
    name: string;
    species: string;
    mood: Mood;
    energy: number;
    level: number;
    avatar: string;
}

export interface PetState extends Pet {
    isDisabled: boolean;
}
