import type { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid var(--border)`,
                background: "transparent",
                color: "var(--text)",
                outline: "none",
            }}
        />
    );
}