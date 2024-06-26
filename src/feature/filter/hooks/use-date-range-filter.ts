import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';

export function useDateRangeFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paramsDateRange = searchParams.get('date');
  const [paramsDateFrom, paramsDateTo] = paramsDateRange
    ? paramsDateRange.split(';')
    : [undefined, undefined];

  const [date, setDate] = useState<DateRange | undefined>(
    paramsDateFrom && paramsDateTo
      ? { from: parseISO(paramsDateFrom), to: parseISO(paramsDateTo) }
      : undefined,
  );

  useEffect(() => {
    if (paramsDateFrom && paramsDateTo) {
      setDate({ from: parseISO(paramsDateFrom), to: parseISO(paramsDateTo) });
    } else {
      setDate(undefined);
    }
  }, [paramsDateFrom, paramsDateTo]);

  const handleDateSelect = (dateRange: DateRange | undefined) => {
    setDate(dateRange);
    const params = new URLSearchParams(searchParams.toString());

    if (dateRange?.from && dateRange?.to) {
      params.set('date', `${dateRange.from.toISOString()};${dateRange.to.toISOString()}`);
    } else {
      params.delete('date');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { date, handleDateSelect };
}
