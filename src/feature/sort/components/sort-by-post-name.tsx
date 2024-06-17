'use client';
import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '~/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function SortByName() {
  const t = useTranslations('Sort');

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    const currentSort = params.get('sortBy');

    const currentOrder = params.get('order');

    if (currentSort === 'name' && currentOrder === 'asc') {
      params.set('sortBy', 'name');
      params.set('order', 'desc');
    } else if (currentSort === 'name' && currentOrder === 'desc') {
      params.delete('sortBy');
      params.delete('order');
    } else {
      params.set('sortBy', 'name');
      params.set('order', 'asc');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const getSortIcon = () => {
    const currentSort = searchParams.get('sortBy');
    const currentOrder = searchParams.get('order');

    if (currentSort === 'name') {
      if (currentOrder === 'asc') {
        return <Icon icon="ant-design:sort-ascending-outlined" className=" size-5" />;
      }
      if (currentOrder === 'desc') {
        return <Icon icon="fluent:text-sort-descending-20-filled" className="size-5" />;
      }
    }
    return <Icon icon="system-uicons:sort" className="size-5" />;
  };

  return (
    <div className="flex items-center gap-2 border px-2 py-1">
      <span>{t('name')}</span>
      <Button
        variant="outline"
        size="icon"
        className="relative transition-transform duration-500 ease-in-out flex border-0"
        onClick={handleClick}
      >
        <span className="flex items-center justify-center transition-transform duration-500 hover:rotate-360">
          {getSortIcon()}
        </span>
      </Button>
    </div>
  );
}
