import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { routes } from "@/shared/config/routes";

export default function NotFoundPage() {
    const { t } = useTranslation();
    return (
        <div className="container">
            <h1>404</h1>
            <p style={{ color: "var(--muted)" }}>{t("common.notFound")}</p>
            <Link to={routes.dashboard}>{t("nav.dashboard")}</Link>
        </div>
    );
}