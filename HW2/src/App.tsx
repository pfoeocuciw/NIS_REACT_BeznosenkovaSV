import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { EventProvider } from './context/EventContext';
import { Dashboard } from './pages/Dashboard';
import './styles/global.scss';


const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <EventProvider>
                <div className="app-root">
                    <header className="app-header">
                        <div>
                            <div className="app-header-title">CyberZoo </div>
                            <div className="app-header-subtitle">
                                AI-driven virtual pet monitoring console
                            </div>
                        </div>
                    </header>
                    <main className="app-main">
                        <Dashboard />
                    </main>
                </div>
            </EventProvider>
        </ThemeProvider>
    );
};
