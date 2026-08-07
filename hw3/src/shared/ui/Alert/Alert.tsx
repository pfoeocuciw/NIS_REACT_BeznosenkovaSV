export function Alert({ children }: { children: React.ReactNode }) {
    return (
        <div
            role="alert"
            style={{
                padding: 12,
                borderRadius: 10,
                border: `1px solid var(--border)`,
                background: "rgba(220,38,38,0.08)",
            }}
        >
            {children}
        </div>
    );
}