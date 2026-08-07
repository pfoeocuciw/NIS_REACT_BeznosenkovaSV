import { useEffect } from "react";
import i18n from "@/shared/config/i18n/i18n";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";

export function I18nSync() {
    const lang = useAppSelector((s) => s.settings.lang);

    useEffect(() => {
        void i18n.changeLanguage(lang);
    }, [lang]);

    return null;
}