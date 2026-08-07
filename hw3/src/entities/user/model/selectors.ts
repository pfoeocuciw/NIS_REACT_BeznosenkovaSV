import type { RootState } from "@/app/store/store";

export const selectToken = (s: RootState) => s.auth.token;
export const selectUser = (s: RootState) => s.auth.user;
export const selectIsAuth = (s: RootState) => Boolean(s.auth.token);