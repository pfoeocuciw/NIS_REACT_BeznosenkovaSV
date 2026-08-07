import { useEffect } from "react";
import { useLazyMeQuery } from "@/shared/api/authApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectToken } from "@/entities/user/model/selectors";
import { setUser, logout } from "@/entities/user/model/authSlice";

export function App() {
    const token = useAppSelector(selectToken);
    const dispatch = useAppDispatch();
    const [me] = useLazyMeQuery();

    useEffect(() => {
        const run = async () => {
            if (!token) return;
            try {
                const user = await me().unwrap();
                dispatch(setUser(user));
            } catch {
                dispatch(logout());
            }
        };
        void run();
    }, [token, me, dispatch]);

    return null;
}