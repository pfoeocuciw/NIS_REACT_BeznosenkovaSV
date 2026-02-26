import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routes } from "@/shared/config/routes";

export default function RegisterPage() {
    const { t } = useTranslation();

    return (
        <div className="container" style={{ maxWidth: 520, marginTop: 40 }}>
            <h1>{t("auth.register")}</h1>
            <p style={{ color: "var(--muted)" }}>
                DummyJSON не поддерживает полноценную регистрацию — это UI-заглушка.
            </p>
            <Link to={routes.login}>{t("auth.login")}</Link>
        </div>
    );
}