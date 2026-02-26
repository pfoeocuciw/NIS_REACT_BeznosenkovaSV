import { useMeQuery } from "@/shared/api/authApi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { routes } from "@/shared/config/routes";

export default function ProfilePage() {
    const { t } = useTranslation();
    const { data, isLoading, isError } = useMeQuery();

    if (isLoading) return <div>{t("common.loading")}</div>;
    if (isError || !data) return <div role="alert">{t("common.error")}</div>;

    return (
        <div>
            <h1>{t("nav.profile")}</h1>
            <div>{data.firstName} {data.lastName}</div>
            <div>{data.email}</div>
            <Link to={routes.logout}>{t("nav.logout")}</Link>
        </div>
    );
}