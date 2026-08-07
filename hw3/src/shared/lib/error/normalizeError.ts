import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function isFetchError(e: unknown): e is FetchBaseQueryError {
    return typeof e === "object" && e !== null && "status" in e;
}

export function normalizeError(err: unknown, t: (k: string) => string): string | null {
    if (!err) return null;

    if (isFetchError(err)) {
        if (err.status === 401) return t("auth.invalid");
        return t("common.error");
    }

    if (err instanceof Error) return err.message;
    return t("common.error");
}