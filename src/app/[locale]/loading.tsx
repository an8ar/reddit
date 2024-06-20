import { Skeleton } from '~/components/ui/skeleton';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div>
      <Skeleton className="w-full h-[20px]" />
      Loading...
    </div>
  );
}
