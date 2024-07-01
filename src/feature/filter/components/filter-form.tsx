'use client';

import React from 'react';
import { FormProvider, RHFCheckbox } from '~/components/hook-form';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

type FormValuesProps = {
  isText: boolean;
  isImage: boolean;
  isLink: boolean;
};

export const filterKeys: (keyof FormValuesProps)[] = ['isText', 'isImage', 'isLink'];

export function FilterForm() {
  const t = useTranslations('Filter');

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const defaultValues: FormValuesProps = filterKeys.reduce((acc, key) => {
    acc[key] = searchParams.get(key) === 'true';
    return acc;
  }, {} as FormValuesProps);

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { setValue, getValues } = methods;

  const params = new URLSearchParams(searchParams.toString());

  const updateFilters = () => {
    const values = getValues();

    filterKeys.forEach((key) => {
      if (values[key]) {
        params.set(key, 'true');
      } else {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  const toggleAllFilters = () => {
    const allSelected = filterKeys.every((key) => getValues(key));
    const newValue = !allSelected;

    filterKeys.forEach((key) => {
      setValue(key, newValue, { shouldDirty: true });
      if (newValue) {
        params.set(key, 'true');
      } else {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  const allFieldsSelected = () => {
    return filterKeys.every((key) => getValues(key));
  };

  return (
    <FormProvider methods={methods} className="m-2 flex flex-col gap-2" id={'filter-form'}>
      <RHFCheckbox
        key="toggleAll"
        name="toggleAll"
        label="Toggle"
        onChange={toggleAllFilters}
        withIndicator={false}
        className="bg-black text-white"
        icon={allFieldsSelected() ? 'material-symbols:remove' : 'lets-icons:done-all-alt-round'}
      />

      {filterKeys.map((key) => (
        <RHFCheckbox
          key={key}
          name={key}
          label={t(key.replace('is', '').toLowerCase())}
          onChange={updateFilters}
          withIndicator={true}
          icon="ic:outline-check"
        />
      ))}
    </FormProvider>
  );
}
