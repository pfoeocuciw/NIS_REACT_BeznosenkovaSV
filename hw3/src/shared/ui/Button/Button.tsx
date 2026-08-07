import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={clsx(
                "btn",
                props.className
            )}
            style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid var(--border)`,
                background: "var(--card)",
                color: "var(--text)",
                cursor: props.disabled ? "not-allowed" : "pointer",
            }}
        />
    );
}