import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

export function SelectLanguage() {
  const router = useRouter();

  const t = useTranslations('LocaleSwitcher');

  const searchParams = useSearchParams().toString();

  const locale = useLocale();

  const handleLanguageChange = (value: string) => {
    router.replace(`/${value}?${searchParams}`);
  };

  return (
    <Select defaultValue={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue defaultValue={locale} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('title')}</SelectLabel>
          <SelectItem value="en"> {t('locale', { locale: 'en' })}</SelectItem>
          <SelectItem value="ru">{t('locale', { locale: 'ru' })}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
