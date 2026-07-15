import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton, RowListSkeleton } from "./skeletons";

export default function WholesaleDashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-56" />
      </div>
      <CardSkeleton />
      <Skeleton className="h-10 w-full sm:w-40" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <RowListSkeleton rows={4} />
      </div>
    </div>
  );
}
