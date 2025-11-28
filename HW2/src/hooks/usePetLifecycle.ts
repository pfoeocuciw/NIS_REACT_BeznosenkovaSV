import { useEffect, useReducer } from 'react';
import { Mood, Pet, PetState } from '../components/PetCard/types';

type PetAction =
    | { type: 'FEED' }
    | { type: 'LEVEL_UP' }
    | { type: 'CHEER' }
    | { type: 'RESET' }
    | { type: 'TICK' };

const MAX_ENERGY = 100;
const FEED_AMOUNT = 20;
const TICK_AMOUNT = 5;

const deriveMood = (energy: number): Mood => {
    if (energy <= 0) return 'offline';
    if (energy <= 20) return 'sad';
    if (energy <= 40) return 'tired';
    if (energy >= 80) return 'happy';
    return 'neutral';
};

interface UsePetLifecycleOptions {
    tickIntervalMs?: number;
}

export const usePetLifecycle = (
    initialPet: Pet,
    options?: UsePetLifecycleOptions
) => {
    const { tickIntervalMs = 5000 } = options ?? {};

    const createInitialState = (): PetState => {
        const energy = initialPet.energy;
        const mood = deriveMood(energy);
        return {
            ...initialPet,
            energy,
            mood,
            isDisabled: energy <= 0,
        };
    };

    const reducer = (state: PetState, action: PetAction): PetState => {
        switch (action.type) {
            case 'FEED': {
                const energy = Math.min(MAX_ENERGY, state.energy + FEED_AMOUNT);
                const mood = deriveMood(energy);
                return { ...state, energy, mood, isDisabled: energy <= 0 };
            }
            case 'LEVEL_UP': {
                if (state.isDisabled) return state;
                return { ...state, level: state.level + 1 };
            }
            case 'CHEER': {
                if (state.isDisabled) return state;
                return { ...state, mood: 'happy' };
            }
            case 'RESET': {
                return createInitialState();
            }
            case 'TICK': {
                if (state.isDisabled) return state;
                const energy = Math.max(0, state.energy - TICK_AMOUNT);
                const mood = deriveMood(energy);
                return {
                    ...state,
                    energy,
                    mood,
                    isDisabled: energy <= 0,
                };
            }
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

    useEffect(() => {
        if (state.isDisabled) {
            return;
        }

        const id = window.setInterval(() => {
            dispatch({ type: 'TICK' });
        }, tickIntervalMs);

        return () => window.clearInterval(id);
    }, [tickIntervalMs, state.isDisabled]);

    return { state, dispatch };
};
