import type { SelectHTMLAttributes } from "react";

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
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