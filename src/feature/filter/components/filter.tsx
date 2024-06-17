'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
} from '~/components/ui/dropdown-menu';
import { Icon } from '@iconify/react/dist/iconify.js';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export function Filter() {
  const router = useRouter();
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
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);
  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-0 text-xs ring-0 px-3 py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Filter
            <span className="ml-2">
              <Icon icon="mage:filter" className="size-3" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
              disabled
            >
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
