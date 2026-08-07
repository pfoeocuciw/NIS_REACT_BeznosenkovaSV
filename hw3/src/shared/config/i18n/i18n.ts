import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./locales/ru.json";
import en from "./locales/en.json";

export const defaultNS = "common";

void i18n
    .use(initReactI18next)
    .init({
        resources: {
            ru: { common: ru },
            en: { common: en },
        },
        ns: [defaultNS],
        defaultNS,
        lng: "ru",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

export default i18n;