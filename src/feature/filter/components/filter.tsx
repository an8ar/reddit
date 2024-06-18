'use client';

import React from 'react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Icon } from '@iconify/react/dist/iconify.js';
import { FilterForm } from './filter-form';

export function Filter() {
  return (
    <article>
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
          <DropdownMenuLabel>Post type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <FilterForm />
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  );
}
