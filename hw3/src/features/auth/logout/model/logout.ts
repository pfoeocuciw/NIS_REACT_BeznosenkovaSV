import { logout } from "@/entities/user/model/authSlice";
import { baseApi } from "@/shared/api/baseApi";
import type { AppDispatch } from "@/app/store/store";

export const performLogout = () => (dispatch: AppDispatch) => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
};