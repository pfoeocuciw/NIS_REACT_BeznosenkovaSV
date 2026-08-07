import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetProductByIdQuery } from "@/shared/api/productsApi";
import { routes } from "@/shared/config/routes";
import { Alert } from "@/shared/ui/Alert/Alert";

export default function ProductDetailsPage() {
    const { t } = useTranslation();
    const id = Number(useParams().id);

    const { data, isLoading, isError } = useGetProductByIdQuery(id, {
        skip: Number.isNaN(id),
    });

    return (
        <div className="container">
            <Link to={routes.products}>← {t("nav.products")}</Link>

            {isLoading && <div style={{ marginTop: 12 }}>{t("common.loading")}</div>}

            {isError && (
                <div style={{ marginTop: 12 }}>
                    <Alert>{t("common.error")}</Alert>
                </div>
            )}

            {!isLoading && data && (
                <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
                    <h1 style={{ margin: 0 }}>{data.title}</h1>
                    <div style={{ color: "var(--muted)" }}>{data.description}</div>

                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                        <span>{t("products.price")}: {data.price}</span>
                        <span>{t("products.rating")}: {data.rating}</span>
                        <span>{t("products.category")}: {data.category}</span>
                    </div>

                    {data.thumbnail ? (
                        <img
                            src={data.thumbnail}
                            alt={data.title}
                            width={320}
                            style={{ borderRadius: 12, border: `1px solid var(--border)` }}
                        />
                    ) : null}
                </div>
            )}
        </div>
    );
}