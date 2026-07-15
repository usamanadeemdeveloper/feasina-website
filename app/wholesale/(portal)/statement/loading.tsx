import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton, RowListSkeleton } from "../skeletons";

export default function WholesaleStatementLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-4 w-72" />
      </div>
      <CardSkeleton />
      <RowListSkeleton rows={5} />
    </div>
  );
}
