import { useTranslation } from "react-i18next";
import { useMeQuery } from "@/shared/api/authApi";
import { Link } from "react-router-dom";
import { routes } from "@/shared/config/routes";
import { Alert } from "@/shared/ui/Alert/Alert";

export default function ProfilePage() {
    const { t } = useTranslation();
    const { data, isLoading, isError } = useMeQuery();

    if (isLoading) return <div className="container">{t("common.loading")}</div>;

    if (isError || !data) {
        return (
            <div className="container">
                <Alert>{t("common.error")}</Alert>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>{t("nav.profile")}</h1>

            <div style={{ display: "grid", gap: 8, maxWidth: 520 }}>
                <div>
                    <div style={{ color: "var(--muted)" }}>Name</div>
                    <div>{data.firstName} {data.lastName}</div>
                </div>

                <div>
                    <div style={{ color: "var(--muted)" }}>Email</div>
                    <div>{data.email}</div>
                </div>

                <Link to={routes.logout}>{t("nav.logout")}</Link>
            </div>
        </div>
    );
}