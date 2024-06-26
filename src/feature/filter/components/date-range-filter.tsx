'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Icon } from '@iconify/react/dist/iconify.js';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { useDateRangeFilter } from '../hooks/use-date-range-filter';

export function DateRangeFilter({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { date, handleDateSelect } = useDateRangeFilter();

  return (
    <div className={cn('grid gap-2 text-sm', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal text-xs',
              !date && 'text-muted-foreground',
            )}
          >
            <Icon icon="solar:calendar-broken" className="mr-2 h-4 w-4" />
            {date?.from && date?.to ? (
              <>
                {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              <span className="text-xs text-black">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
