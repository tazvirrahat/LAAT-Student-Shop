/**
 * Loading skeleton for the (shop) layout tree.
 * Shown while any page in the shop route group is streaming/loading.
 * Matches the layout of the homepage to minimize layout shift.
 */
export default function Loading() {
    return (
        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-6 animate-pulse space-y-8">

            {/* Hero banner skeleton */}
            <div className="w-full h-[320px] md:h-[400px] bg-zinc-200 rounded-xl" />

            {/* Section heading skeleton */}
            <div className="flex items-center justify-between">
                <div className="h-6 w-40 bg-zinc-200 rounded-full" />
                <div className="h-4 w-16 bg-zinc-200 rounded-full" />
            </div>

            {/* Product card grid skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="aspect-square bg-zinc-200 rounded-xl w-full" />
                        <div className="h-3 bg-zinc-200 rounded-full w-3/4" />
                        <div className="h-3 bg-zinc-200 rounded-full w-1/2" />
                        <div className="h-5 bg-zinc-200 rounded-full w-2/3" />
                    </div>
                ))}
            </div>

            {/* Category tiles skeleton */}
            <div className="flex gap-3 overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                        <div className="w-24 h-24 bg-zinc-200 rounded-xl" />
                        <div className="h-3 w-16 bg-zinc-200 rounded-full" />
                    </div>
                ))}
            </div>

        </div>
    )
}
