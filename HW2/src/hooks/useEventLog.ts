import { useContext } from 'react';
import { EventContext, EventContextValue } from '../context/EventContext';

export const useEventLog = (): EventContextValue => {
    const ctx = useContext(EventContext);

    if (!ctx) {
        throw new Error('useEventLog must be used within EventProvider');
    }

    return ctx;
};
