'use client';

import React from 'react';
import { DropdownMenuRadioItem } from '~/components/ui/dropdown-menu';

interface SortByProps {
  sortBy: string;
  options: { value: string; label: string }[];
}

export function SortBy({ options }: SortByProps) {
  return (
    <>
      {options.map((option) => (
        <DropdownMenuRadioItem key={option.value} value={option.value}>
          {option.label}
        </DropdownMenuRadioItem>
      ))}
    </>
  );
}
