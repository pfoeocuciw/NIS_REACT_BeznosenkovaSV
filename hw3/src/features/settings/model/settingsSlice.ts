import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";
export type Lang = "ru" | "en";

export interface SettingsState {
    theme: ThemeMode;
    lang: Lang;
    pageSize: number;
}

const initialState: SettingsState = {
    theme: "light",
    lang: "ru",
    pageSize: 10,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme(s, a: PayloadAction<ThemeMode>) {
            s.theme = a.payload;
        },
        setLang(s, a: PayloadAction<Lang>) {
            s.lang = a.payload;
        },
        setPageSize(s, a: PayloadAction<number>) {
            s.pageSize = a.payload;
        },
    },
});

export const { setTheme, setLang, setPageSize } = settingsSlice.actions;
export default settingsSlice.reducer;