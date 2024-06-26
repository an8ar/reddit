import { Skeleton } from '~/components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className="w-full h-36 bg-slate-200 rounded-2xl" />
        ))}
    </div>
  );
}
