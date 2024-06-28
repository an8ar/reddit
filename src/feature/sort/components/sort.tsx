'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { SortBy } from './sort-by';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

export function Sort() {
  const router = useRouter();

  const t = useTranslations('Sort');

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const currentSort = params.get('sortBy');

  const currentOrder = params.get('order');

  const handleSortChange = (newOrder: string) => {
    const [sortBy, order] = newOrder.split('|');

    if (currentSort === sortBy && currentOrder === order) {
      params.delete('sortBy');

      params.delete('order');
    } else {
      params.set('sortBy', sortBy);

      params.set('order', order);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <article>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="ring-0">
          <Button
            variant="outline"
            className="border-0 text-xs ring-0 px-3 py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {t('button')}
            <span className="ml-1">
              <Icon icon="mingcute:down-line" className="size-3" />
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={`${currentSort}|${currentOrder}`}
            onValueChange={handleSortChange}
          >
            <DropdownMenuLabel>{t('title')}</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <SortBy
              sortBy="date"
              options={[
                { value: 'date|asc', label: t('date.new') },
                { value: 'date|desc', label: t('date.old') },
              ]}
            />
            <DropdownMenuSeparator />

            <SortBy
              sortBy="name"
              options={[
                { value: 'name|asc', label: t('name.alphabetical') },
                { value: 'name|desc', label: t('name.reverse_alphabetical') },
              ]}
            />
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  );
}
