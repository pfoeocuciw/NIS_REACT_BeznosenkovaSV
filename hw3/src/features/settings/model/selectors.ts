import type { RootState } from "@/app/store/store";

export const selectTheme = (s: RootState) => s.settings.theme;
export const selectLang = (s: RootState) => s.settings.lang;
export const selectPageSize = (s: RootState) => s.settings.pageSize;