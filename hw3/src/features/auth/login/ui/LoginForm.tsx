import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { Alert } from "@/shared/ui/Alert/Alert";
import { useLogin } from "../model/useLogin";
import { normalizeError } from "@/shared/lib/error/normalizeError";

const schema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
    const { t } = useTranslation();
    const { submit, loginState } = useLogin();

    const { register, handleSubmit, formState } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { username: "", password: "" },
    });

    const onSubmit = async (v: FormValues) => {
        await submit(v.username, v.password);
        onSuccess();
    };

    const apiError = normalizeError(loginState.error, t);

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 12 }}>
            <label style={{ display: "grid", gap: 6 }}>
                <div style={{ color: "var(--muted)" }}>{t("auth.username")}</div>
                <Input {...register("username")} />
                {formState.errors.username && (
                    <div style={{ color: "var(--danger)" }}>{t("common.error")}</div>
                )}
            </label>

            <label style={{ display: "grid", gap: 6 }}>
                <div style={{ color: "var(--muted)" }}>{t("auth.password")}</div>
                <Input type="password" {...register("password")} />
                {formState.errors.password && (
                    <div style={{ color: "var(--danger)" }}>{t("common.error")}</div>
                )}
            </label>

            {apiError && <Alert>{apiError}</Alert>}

            <Button disabled={loginState.isLoading} type="submit">
                {loginState.isLoading ? t("common.loading") : t("auth.submit")}
            </Button>
        </form>
    );
}