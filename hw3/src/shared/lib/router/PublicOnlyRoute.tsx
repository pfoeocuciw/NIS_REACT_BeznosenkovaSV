import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectIsAuth } from "@/entities/user/model/selectors";
import { routes } from "@/shared/config/routes";

export function PublicOnlyRoute() {
    const isAuth = useAppSelector(selectIsAuth);
    return isAuth ? <Navigate to={routes.dashboard} replace /> : <Outlet />;
}