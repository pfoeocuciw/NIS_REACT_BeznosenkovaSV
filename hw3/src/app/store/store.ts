import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "@/shared/api/baseApi";
import authReducer from "@/entities/user/model/authSlice";
import settingsReducer from "@/features/settings/model/settingsSlice";
import { loadState, saveState } from "@/shared/lib/persist/storage";

const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const preloadedState = loadState<Pick<RootState, "settings" | "auth">>(["settings", "auth"]);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(baseApi.middleware),
    preloadedState,
});

store.subscribe(() => {
    const state = store.getState();
    saveState({
        settings: state.settings,
        auth: { token: state.auth.token, user: state.auth.user }, // хранить минимум
    });
});

export type AppDispatch = typeof store.dispatch;