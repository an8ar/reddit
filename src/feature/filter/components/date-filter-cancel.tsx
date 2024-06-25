'use client';

import { Badge } from '~/components/ui/badge';
import { Icon } from '@iconify/react/dist/iconify.js';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function DateFilterCancel() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const params = new URLSearchParams(searchParams.toString());

  const hasDateRangeFilter = params.get('date');

  const handleClick = () => {
    if (params.get('date')) {
      params.delete('date');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };
  if (!!!hasDateRangeFilter) return <></>;
  return (
    <Badge
      variant={'secondary'}
      className="flex gap-1 items-center active:animate-clickAnimation"
      onClick={handleClick}
    >
      Date range <Icon icon="iconoir:cancel" />
    </Badge>
  );
}
