import { useTranslation } from "react-i18next";

export default function DashboardPage() {
    const { t } = useTranslation();
    return (
        <div className="container">
            <h1>{t("nav.dashboard")}</h1>
            <p style={{ color: "var(--muted)" }}>
                Здесь может быть статистика продаж, последние заказы и т.д. (заглушка).
            </p>
        </div>
    );
}