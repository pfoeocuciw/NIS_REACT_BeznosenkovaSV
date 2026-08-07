import { NavLink } from "react-router-dom";
import { routes } from "@/shared/config/routes";
import { useTranslation } from "react-i18next";

export function Sidebar() {
    const { t } = useTranslation();

    return (
        <aside className="sidebar">
            <div style={{ fontWeight: 700 }}>{t("app.title")}</div>
            <nav className="nav">
                <NavLink to={routes.dashboard}>{t("nav.dashboard")}</NavLink>
                <NavLink to={routes.products}>{t("nav.products")}</NavLink>
                <NavLink to={routes.profile}>{t("nav.profile")}</NavLink>
                <NavLink to={routes.settings}>{t("nav.settings")}</NavLink>
                <NavLink to={routes.logout}>{t("nav.logout")}</NavLink>
            </nav>
        </aside>
    );
}