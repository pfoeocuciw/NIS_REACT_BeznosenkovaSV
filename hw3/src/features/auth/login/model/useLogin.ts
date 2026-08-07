import { useLoginMutation, useLazyMeQuery } from "@/shared/api/authApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { setToken, setUser } from "@/entities/user/model/authSlice";

export function useLogin() {
    const dispatch = useAppDispatch();
    const [login, loginState] = useLoginMutation();
    const [me] = useLazyMeQuery();

    const submit = async (username: string, password: string) => {
        const res = await login({ username, password }).unwrap();

        const token = res.token ?? res.accessToken;
        dispatch(setToken(token));

        const user = await me().unwrap();
        dispatch(setUser(user));
    };

    return { submit, loginState };
}