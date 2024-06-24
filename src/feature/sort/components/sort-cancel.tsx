'use client';

import { Badge } from '~/components/ui/badge';
import { Icon } from '@iconify/react/dist/iconify.js';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function SortCancel() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const params = new URLSearchParams(searchParams.toString());
  const handleClick = () => {
    const sortBy = params.get('sortBy');

    const order = params.get('order');

    if ((!!sortBy && sortBy !== 'date') || (!!order && order !== 'asc')) {
      params.set('sortBy', 'date');
      params.set('order', 'asc');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Badge
      variant={'secondary'}
      className="flex gap-1 items-center active:animate-clickAnimation"
      onClick={handleClick}
    >
      Sort <Icon icon="iconoir:cancel" />
    </Badge>
  );
}
