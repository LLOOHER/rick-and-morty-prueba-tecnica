export function CharacterCardSkeleton() {
    return (
        <div
            aria-hidden="true"
            className="flex animate-pulse flex-col gap-2.5 rounded-md bg-white p-2.5 shadow-card"
        >
            <div className="aspect-square w-full rounded bg-disable/40" />
            <div className="flex h-6 items-center">
                <div className="h-3.5 w-2/3 rounded bg-disable/40" />
            </div>
        </div>
    )
}
