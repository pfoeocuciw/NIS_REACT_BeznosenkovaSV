import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoginForm } from "@/features/auth/login/ui/LoginForm";
import { routes } from "@/shared/config/routes";

export default function LoginPage() {
    const { t } = useTranslation();
    const nav = useNavigate();

    return (
        <div className="container" style={{ maxWidth: 480, marginTop: 40 }}>
            <h1>{t("auth.login")}</h1>
            <LoginForm onSuccess={() => nav(routes.dashboard, { replace: true })} />
            <div style={{ marginTop: 12 }}>
                <Link to={routes.register}>{t("auth.register")}</Link>
            </div>

            <div style={{ marginTop: 14, color: "var(--muted)", fontSize: 14 }}>
                DummyJSON тестовые логины есть на их сайте. Обычно подходит пользователь типа <b>kminchelle</b>.
            </div>
        </div>
    );
}