import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { logout as logoutAction } from "@/entities/user/model/authSlice";
import { baseApi } from "@/shared/api/baseApi";
import { routes } from "@/shared/config/routes";

export default function LogoutPage() {
    const dispatch = useAppDispatch();
    const nav = useNavigate();

    useEffect(() => {
        dispatch(logoutAction());
        dispatch(baseApi.util.resetApiState());
        nav(routes.login, { replace: true });
    }, [dispatch, nav]);

    return null;
}