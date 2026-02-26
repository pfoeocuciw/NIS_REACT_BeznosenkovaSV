import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectIsAuth } from "@/entities/user/model/selectors";
import { routes } from "@/shared/config/routes";

export function ProtectedRoute() {
    const isAuth = useAppSelector(selectIsAuth);
    return isAuth ? <Outlet /> : <Navigate to={routes.login} replace />;
}