import { memo, useCallback, useEffect, useRef } from 'react';
import styles from './PetCard.module.scss';
import { Pet } from './types';
import { ActionButton } from '../PetActions/ActionButton.styled';
import { usePetLifecycle } from '../../hooks/usePetLifecycle';
import { useEventLog } from '../../hooks/useEventLog';

interface PetCardProps {
    pet: Pet;
}

const formatTime = () => {
    const date = new Date();
    return date.toLocaleTimeString();
};

const PetCardComponent = ({ pet }: PetCardProps) => {
    const { state, dispatch } = usePetLifecycle(pet);
    const { addEvent } = useEventLog();
    const avatarRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!avatarRef.current) return;

        avatarRef.current.animate(
            [
                { transform: 'scale(1)' },
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' },
            ],
            { duration: 250 }
        );
    }, [state.energy, state.mood]);

    const log = useCallback(
        (message: string) => {
            const entry = `[${formatTime()}] ${message}`;
            addEvent(entry);
        },
        [addEvent]
    );

    const handleFeed = useCallback(() => {
        dispatch({ type: 'FEED' });
        log(`🧪 ${state.name} was fed (+${20} energy).`);
    }, [dispatch, log, state.name]);

    const handleLevelUp = useCallback(() => {
        dispatch({ type: 'LEVEL_UP' });
        log(`⚙️ ${state.name} leveled up to ${state.level + 1}.`);
    }, [dispatch, log, state.level, state.name]);

    const handleCheer = useCallback(() => {
        dispatch({ type: 'CHEER' });
        log(`💬 You cheered ${state.name}. Mood boosted.`);
    }, [dispatch, log, state.name]);

    const handleReset = useCallback(() => {
        dispatch({ type: 'RESET' });
        log(`🔁 ${state.name} was reset to factory settings.`);
    }, [dispatch, log, state.name]);

    const shadowColor =
        state.mood === 'happy'
            ? '0 0 18px rgba(45, 212, 191, 0.9)'
            : state.mood === 'sad'
                ? '0 0 14px rgba(248, 113, 113, 0.8)'
                : state.mood === 'tired'
                    ? '0 0 14px rgba(250, 204, 21, 0.7)'
                    : '0 0 10px rgba(148, 163, 184, 0.6)';

    return (
        <div
            className={styles.card}
            style={{
                boxShadow: shadowColor,
                opacity: state.isDisabled ? 0.5 : 1,
                filter: state.isDisabled ? 'grayscale(0.4)' : 'none',
            }}
        >
            <div className={styles.header}>
                <div className={styles.avatarWrapper}>
                    <img
                        ref={avatarRef}
                        src={state.avatar}
                        alt={state.name}
                        className={styles.avatar}
                    />
                    <span className={styles.badge}>Lv.{state.level}</span>
                </div>

                <div className={styles.headerInfo}>
                    <div className={styles.nameRow}>
                        <div>
                            <div className={styles.name}>{state.name}</div>
                            <div className={styles.species}>{state.species}</div>
                        </div>
                        <div className={styles.mood}>
                            Mood:&nbsp;
                            <strong>{state.mood}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.stats}>
                <div>
                    <div className={styles.statLabel}>Energy</div>
                    <div className={styles.statValue}>{state.energy}%</div>
                </div>
                <div>
                    <div className={styles.statLabel}>Status</div>
                    <div className={styles.statValue}>
                        {state.isDisabled ? 'Offline' : 'Online'}
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <ActionButton onClick={handleFeed} disabled={state.isDisabled}>
                    Feed
                </ActionButton>
                <ActionButton
                    onClick={handleLevelUp}
                    disabled={state.isDisabled}
                    $variant="secondary"
                >
                    Level Up
                </ActionButton>
                <ActionButton
                    onClick={handleCheer}
                    disabled={state.isDisabled}
                    $variant="secondary"
                >
                    Cheer
                </ActionButton>
                <ActionButton onClick={handleReset}>Reset</ActionButton>
            </div>
        </div>
    );
};

export const PetCard = memo(PetCardComponent);
