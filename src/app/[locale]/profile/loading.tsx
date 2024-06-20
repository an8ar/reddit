import { Skeleton } from '~/components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      <div className="my-3 flex gap-4">
        <Skeleton className="w-28 h-28 rounded-full" />

        <div className="flex flex-col gap-1 justify-end mb-4">
          <Skeleton className="h-8 w-[80px]" />
          <Skeleton className="h-6 w-[64px]" />
        </div>
      </div>
      <div className="flex justify-between text-sm font-medium">
        <Skeleton className="h-9 w-[92px]" />
        <Skeleton className="h-9 w-[92px]" />
        <Skeleton className="h-9 w-[92px]" />
        <Skeleton className="h-9 w-[92px]" />
        <Skeleton className="h-9 w-[92px]" />
        <Skeleton className="h-9 w-[92px]" />
        <Skeleton className="h-9 w-[92px]" />
      </div>
    </div>
  );
}
