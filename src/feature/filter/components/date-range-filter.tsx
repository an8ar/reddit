'use client';

import * as React from 'react';
import { format, parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Icon } from '@iconify/react/dist/iconify.js';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function DateRangeFilter({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const paramsDateRange = searchParams.get('date');

  const [paramsDateFrom, paramsDateTo] = paramsDateRange
    ? paramsDateRange.split(';')
    : [undefined, undefined];

  const [date, setDate] = React.useState<DateRange | undefined>(
    paramsDateFrom && paramsDateTo
      ? { from: parseISO(paramsDateFrom), to: parseISO(paramsDateTo) }
      : undefined,
  );

  const handleDateSelect = (dateRange: DateRange | undefined) => {
    setDate(dateRange);
    const params = new URLSearchParams(searchParams.toString());

    if (dateRange?.from && dateRange?.to) {
      params.set('date', `${dateRange.from.toISOString()};${dateRange.to.toISOString()}`);
    }
    if (dateRange === undefined) {
      params.delete('date');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

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
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
