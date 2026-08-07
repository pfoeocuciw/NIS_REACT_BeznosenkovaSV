import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectUser } from "@/entities/user/model/selectors";

export function Header() {
    const { t } = useTranslation();
    const user = useAppSelector(selectUser);

    return (
        <div className="header">
            <div>{t("app.title")}</div>
            <div style={{ color: "var(--muted)", display: "flex", gap: 10, alignItems: "center" }}>
                {user ? `${user.firstName} ${user.lastName}` : ""}
                {user?.image ? <img src={user.image} alt="avatar" width={28} height={28} style={{ borderRadius: 999 }} /> : null}
            </div>
        </div>
    );
}