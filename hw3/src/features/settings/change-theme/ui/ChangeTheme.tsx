import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Select } from "@/shared/ui/Select/Select";
import { setTheme } from "@/features/settings/model/settingsSlice";
import { useTranslation } from "react-i18next";

export function ChangeTheme() {
    const { t } = useTranslation();
    const theme = useAppSelector((s) => s.settings.theme);
    const dispatch = useAppDispatch();

    return (
        <div style={{ display: "grid", gap: 8 }}>
            <div style={{ color: "var(--muted)" }}>{t("settings.theme")}</div>
            <Select value={theme} onChange={(e) => dispatch(setTheme(e.target.value as "light" | "dark"))}>
                <option value="light">light</option>
                <option value="dark">dark</option>
            </Select>
        </div>
    );
}