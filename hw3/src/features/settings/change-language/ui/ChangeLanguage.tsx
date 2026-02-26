import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Select } from "@/shared/ui/Select/Select";
import { setLang } from "@/features/settings/model/settingsSlice";
import { useTranslation } from "react-i18next";

export function ChangeLanguage() {
    const { t } = useTranslation();
    const lang = useAppSelector((s) => s.settings.lang);
    const dispatch = useAppDispatch();

    return (
        <div style={{ display: "grid", gap: 8 }}>
            <div style={{ color: "var(--muted)" }}>{t("settings.lang")}</div>
            <Select value={lang} onChange={(e) => dispatch(setLang(e.target.value as "ru" | "en"))}>
                <option value="ru">RU</option>
                <option value="en">EN</option>
            </Select>
        </div>
    );
}