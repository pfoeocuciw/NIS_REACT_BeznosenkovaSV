import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetProductsQuery } from "@/shared/api/productsApi";
import { routes } from "@/shared/config/routes";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Alert } from "@/shared/ui/Alert/Alert";
import { EmptyState } from "@/shared/ui/EmptyState/EmptyState";

export default function ProductsPage() {
    const { t } = useTranslation();
    const [sp, setSp] = useSearchParams();

    const defaultLimit = useAppSelector((s) => s.settings.pageSize);

    const qRaw = sp.get("q") ?? "";
    const q = useDebounce(qRaw, 300);

    const skip = Number(sp.get("skip") ?? "0");
    const limit = Number(sp.get("limit") ?? String(defaultLimit));

    const params = useMemo(
        () => ({ q: q.trim() ? q : undefined, skip: Number.isFinite(skip) ? skip : 0, limit: Number.isFinite(limit) ? limit : defaultLimit }),
        [q, skip, limit, defaultLimit]
    );

    const { data, isLoading, isError, refetch } = useGetProductsQuery(params);

    const setQuery = (next: Partial<{ q: string; skip: number; limit: number }>) => {
        const n = new URLSearchParams(sp);
        if (next.q !== undefined) n.set("q", next.q);
        if (next.skip !== undefined) n.set("skip", String(next.skip));
        if (next.limit !== undefined) n.set("limit", String(next.limit));
        setSp(n, { replace: true });
    };

    return (
        <div className="container">
            <h1>{t("products.title")}</h1>

            <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
                <Input
                    value={qRaw}
                    placeholder={t("products.search")}
                    onChange={(e) => setQuery({ q: e.target.value, skip: 0 })}
                />
            </div>

            <div style={{ marginTop: 14 }}>
                {isLoading && <div>{t("common.loading")}</div>}

                {isError && (
                    <Alert>
                        {t("common.error")}{" "}
                        <Button type="button" onClick={() => refetch()} style={{ marginLeft: 8 }}>
                            {t("common.retry")}
                        </Button>
                    </Alert>
                )}

                {!isLoading && data && data.products.length === 0 && (
                    <div style={{ marginTop: 12 }}>
                        <EmptyState title={t("products.empty")} />
                    </div>
                )}

                {data && data.products.length > 0 && (
                    <>
                        <ul style={{ listStyle: "none", padding: 0, marginTop: 16, display: "grid", gap: 10 }}>
                            {data.products.map((p) => (
                                <li
                                    key={p.id}
                                    style={{
                                        border: `1px solid var(--border)`,
                                        background: "var(--card)",
                                        borderRadius: 12,
                                        padding: 12,
                                        display: "grid",
                                        gap: 6,
                                    }}
                                >
                                    <Link to={routes.product(p.id)} style={{ fontWeight: 700 }}>
                                        {p.title}
                                    </Link>
                                    <div style={{ color: "var(--muted)" }}>{p.description}</div>
                                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                                        <span>{t("products.price")}: {p.price}</span>
                                        <span>{t("products.rating")}: {p.rating}</span>
                                        <span>{t("products.category")}: {p.category}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 16 }}>
                            <Button
                                type="button"
                                disabled={skip <= 0}
                                onClick={() => setQuery({ skip: Math.max(0, skip - limit) })}
                            >
                                {"<"}
                            </Button>

                            <div style={{ color: "var(--muted)" }}>
                                {skip + 1}–{Math.min(skip + limit, data.total)} / {data.total}
                            </div>

                            <Button
                                type="button"
                                disabled={skip + limit >= data.total}
                                onClick={() => setQuery({ skip: skip + limit })}
                            >
                                {">"}
                            </Button>

                            <div style={{ marginLeft: "auto", width: 180 }}>
                                <div style={{ color: "var(--muted)", fontSize: 12 }}>limit</div>
                                <Input
                                    value={String(limit)}
                                    onChange={(e) => {
                                        const v = Number(e.target.value);
                                        if (Number.isFinite(v) && v > 0) setQuery({ limit: v, skip: 0 });
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}