import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spinner } from "@/shared/ui/Spinner/Spinner";
import { ProtectedRoute } from "@/shared/lib/router/ProtectedRoute";
import { PublicOnlyRoute } from "@/shared/lib/router/PublicOnlyRoute";
import { AppLayout } from "@/widgets/app-layout/ui/AppLayout";

const LoginPage = lazy(() => import("@/pages/login"));
const RegisterPage = lazy(() => import("@/pages/register"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const ProductsPage = lazy(() => import("@/pages/products"));
const ProductDetailsPage = lazy(() => import("@/pages/product-details"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const SettingsPage = lazy(() => import("@/pages/settings"));
const LogoutPage = lazy(() => import("@/pages/logout"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
import type { ReactElement } from "react";

const wrap = (el: ReactElement) => <Suspense fallback={<Spinner />}>{el}</Suspense>;

export const router = createBrowserRouter([
    {
        element: <PublicOnlyRoute />,
        children: [
            { path: "/login", element: wrap(<LoginPage />) },
            { path: "/register", element: wrap(<RegisterPage />) },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    { path: "/", element: wrap(<DashboardPage />) },
                    { path: "/products", element: wrap(<ProductsPage />) },
                    { path: "/products/:id", element: wrap(<ProductDetailsPage />) },
                    { path: "/profile", element: wrap(<ProfilePage />) },
                    { path: "/settings", element: wrap(<SettingsPage />) },
                    { path: "/logout", element: wrap(<LogoutPage />) },
                    { path: "*", element: wrap(<NotFoundPage />) },
                ],
            },
        ],
    },
]);