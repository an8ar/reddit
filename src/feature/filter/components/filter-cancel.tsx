'use client';

import { Badge } from '~/components/ui/badge';
import { Icon } from '@iconify/react/dist/iconify.js';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { filterKeys } from './filter-form';

export function FilterCancel() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const params = new URLSearchParams(searchParams.toString());

  const hasFilters = filterKeys.some((key) => params.get(key));

  const handleClick = () => {
    filterKeys.forEach((key) => {
      if (params.get(key)) {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  if (!hasFilters) return <></>;

  return (
    <Badge
      variant={'secondary'}
      className="flex gap-1 items-center active:animate-clickAnimation"
      onClick={handleClick}
    >
      Filter <Icon icon="iconoir:cancel" />
    </Badge>
  );
}
