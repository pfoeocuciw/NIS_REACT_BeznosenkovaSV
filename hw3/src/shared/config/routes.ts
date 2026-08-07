export const routes = {
    login: "/login",
    register: "/register",
    dashboard: "/",
    products: "/products",
    product: (id: number | string) => `/products/${id}`,
    profile: "/profile",
    settings: "/settings",
    logout: "/logout",
} as const;