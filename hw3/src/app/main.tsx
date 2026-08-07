import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "@/shared/config/i18n/i18n.ts";
import "@/index.css";

import { store } from "./store/store";
import { router } from "./providers/RouterProvider";
import { ErrorBoundary } from "./providers/ErrorBoundary";
import { ThemeProvider } from "./providers/ThemeProvider";
import { I18nSync } from "./providers/I18nProvider";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <ThemeProvider>
                    <I18nSync />
                    <App />
                    <RouterProvider router={router} />
                </ThemeProvider>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);