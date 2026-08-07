import { useTranslation } from "react-i18next";
import { ChangeLanguage } from "@/features/settings/change-language/ui/ChangeLanguage";
import { ChangeTheme } from "@/features/settings/change-theme/ui/ChangeTheme";
import { ChangePageSize } from "@/features/settings/change-page-size/ui/ChangePageSize";

export default function SettingsPage() {
    const { t } = useTranslation();

    return (
        <div className="container">
            <h1>{t("settings.title")}</h1>

            <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
                <ChangeLanguage />
                <ChangeTheme />
                <ChangePageSize />
            </div>
        </div>
    );
}