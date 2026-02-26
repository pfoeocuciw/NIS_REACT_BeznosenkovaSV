import { useEffect } from "react";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useAppSelector((s) => s.settings.theme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    return <>{children}</>;
}