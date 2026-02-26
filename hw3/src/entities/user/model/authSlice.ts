import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./types";

const initialState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(s, a: PayloadAction<string | null>) {
            s.token = a.payload;
        },
        setUser(s, a: PayloadAction<User | null>) {
            s.user = a.payload;
        },
        logout(s) {
            s.token = null;
            s.user = null;
        },
    },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;