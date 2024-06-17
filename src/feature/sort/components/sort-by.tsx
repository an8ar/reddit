'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { DropdownMenuRadioItem } from '~/components/ui/dropdown-menu';

interface SortByProps {
  sortBy: string;
  options: { value: string; label: string }[];
}

export function SortBy({ options }: SortByProps) {
  const t = useTranslations('Sort');

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
