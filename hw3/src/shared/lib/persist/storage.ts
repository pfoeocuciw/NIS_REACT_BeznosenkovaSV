export function loadState<T>(keys: string[]): Partial<T> | undefined {
    try {
        const raw = localStorage.getItem("app_state_v1");
        if (!raw) return undefined;
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        const picked: Record<string, unknown> = {};
        keys.forEach((k) => {
            if (k in parsed) picked[k] = parsed[k];
        });
        return picked as Partial<T>;
    } catch {
        return undefined;
    }
}

export function saveState(state: unknown): void {
    try {
        localStorage.setItem("app_state_v1", JSON.stringify(state));
    } catch {
        // ignore
    }
}