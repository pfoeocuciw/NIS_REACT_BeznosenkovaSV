import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: unknown) {
        console.error("App error:", error);
    }

    render() {
        if (this.state.hasError) {
            return <div className="container">Something went wrong</div>;
        }
        return this.props.children;
    }
}