import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Select } from "@/shared/ui/Select/Select";
import { setPageSize } from "@/features/settings/model/settingsSlice";
import { useTranslation } from "react-i18next";

export function ChangePageSize() {
    const { t } = useTranslation();
    const pageSize = useAppSelector((s) => s.settings.pageSize);
    const dispatch = useAppDispatch();

    return (
        <div style={{ display: "grid", gap: 8 }}>
            <div style={{ color: "var(--muted)" }}>{t("settings.pageSize")}</div>
            <Select value={pageSize} onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </Select>
        </div>
    );
}