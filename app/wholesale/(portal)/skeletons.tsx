import { Skeleton } from "@/components/ui/skeleton";

// Shared building blocks for the wholesale portal's loading.tsx files --
// shaped to match the plain white-card-on-gradient style used throughout
// app/wholesale/(portal)/**, not shadcn's Card component (this portal never
// adopted that, it hand-rolls "rounded-xl border bg-white p-* shadow-sm").

export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-3 rounded-xl border bg-white p-6 shadow-sm ${className}`}>
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border bg-white p-4 shadow-sm">
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function RowListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: rows }).map((_, i) => (
        <RowSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4 rounded-xl border bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
