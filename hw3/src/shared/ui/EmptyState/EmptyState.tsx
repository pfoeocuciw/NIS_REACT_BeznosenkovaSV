export function EmptyState({ title }: { title: string }) {
    return (
        <div
            style={{
                padding: 16,
                borderRadius: 12,
                border: `1px dashed var(--border)`,
                color: "var(--muted)",
            }}
        >
            {title}
        </div>
    );
}