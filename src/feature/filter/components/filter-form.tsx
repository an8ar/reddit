'use client';

import React from 'react';
import { FormProvider, RHFCheckbox } from '~/components/hook-form';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function FilterForm() {
  type FormValuesProps = { isText: boolean; isImage: boolean; isLink: boolean; isAll: boolean };

  const t = useTranslations('Filter');

  const searchParams = useSearchParams();

  const defaultValues: FormValuesProps = {
    isText: searchParams.get('isText') === 'true',
    isImage: searchParams.get('isImage') === 'true',
    isLink: searchParams.get('isLink') === 'true',
    isAll: searchParams.get('isAll') === 'true',
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const router = useRouter();
  const pathname = usePathname();
  const handleFormChange = () => {
    const values = methods.getValues();
    if (values['isAll']) {
    }

    const params = new URLSearchParams(searchParams.toString());

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        params.set(key, 'true');
      } else {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FormProvider methods={methods} className="flex flex-col gap-2 m-2">
      <RHFCheckbox name="isText" label={t('text')} onChange={handleFormChange} />
      <RHFCheckbox name="isImage" label={t('image')} onChange={handleFormChange} />
      <RHFCheckbox name="isLink" label={t('link')} onChange={handleFormChange} />
      <RHFCheckbox name="all" label="All" onChange={handleFormChange} />
    </FormProvider>
  );
}
