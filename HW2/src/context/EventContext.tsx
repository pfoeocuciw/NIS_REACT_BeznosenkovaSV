import React, {
    createContext,
    useCallback,
    useMemo,
    useState,
    PropsWithChildren,
} from 'react';

export interface EventContextValue {
    events: string[];
    addEvent: (event: string) => void;
    clearEvents: () => void;
}

export const EventContext = createContext<EventContextValue | undefined>(
    undefined
);

export const EventProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [events, setEvents] = useState<string[]>([]);

    const addEvent = useCallback((event: string) => {
        setEvents(prev => [event, ...prev]);
    }, []);

    const clearEvents = useCallback(() => {
        setEvents([]);
    }, []);

    const value = useMemo(
        () => ({
            events,
            addEvent,
            clearEvents,
        }),
        [events, addEvent, clearEvents]
    );

    return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
