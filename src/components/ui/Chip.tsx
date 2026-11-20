interface ChipProps {
    label: string
    value: string
    className: string
}

export function Chip({ label, value, className }: ChipProps) {
    return (
        <span className={`rounded-xl px-2 py-1 text-xs text-black ${className}`}>
            <strong>{label}:</strong> {value}
        </span>
    )
}
