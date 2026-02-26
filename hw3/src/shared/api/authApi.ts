import { baseApi } from "./baseApi";
import type { User } from "@/entities/user/model/types";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse extends User {
    accessToken: string;
    token?: string;
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (b) => ({
        login: b.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({ url: "/auth/login", method: "POST", body }),
        }),
        me: b.query<User, void>({
            query: () => ({ url: "/auth/me" }),
            providesTags: ["Me"],
        }),
    }),
});

export const { useLoginMutation, useMeQuery, useLazyMeQuery } = authApi;