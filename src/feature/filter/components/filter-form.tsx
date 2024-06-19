'use client';

import React from 'react';
import { FormProvider, RHFCheckbox } from '~/components/hook-form';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function FilterForm() {
  type FormValuesProps = {
    isText: boolean;
    isImage: boolean;
    isLink: boolean;
    isAll: boolean;
    isRemove: boolean;
  };

  const t = useTranslations('Filter');

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filterKeys: (keyof FormValuesProps)[] = [
    'isText',
    'isImage',
    'isLink',
    'isAll',
    'isRemove',
  ];

  const defaultValues: FormValuesProps = filterKeys.reduce((acc, key) => {
    acc[key] = searchParams.get(key) === 'true';
    return acc;
  }, {} as FormValuesProps);

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { setValue, getValues } = methods;

  const params = new URLSearchParams();

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

  const clearAllFilters = () => {
    filterKeys.forEach((key) => {
      setValue(key, false, { shouldDirty: true });
      params.delete(key);
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  const selectAllFilters = () => {
    filterKeys.forEach((key) => {
      if (key !== 'isAll' && key !== 'isRemove') {
        setValue(key, true, { shouldDirty: true });
        params.set(key, 'true');
      }
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  const allFieldsSelected = () => {
    const allSelected = filterKeys.every((key) => {
      if (key === 'isAll' || key === 'isRemove') {
        return true;
      }
      return getValues(key);
    });

    if (!getValues('isAll') && allSelected) {
      setValue('isAll', true);
    }

    return allSelected;
  };

  return (
    <FormProvider methods={methods} className="flex flex-col gap-2 m-2">
      <div className="flex gap-2">
        <RHFCheckbox
          key="isRemove"
          name="isRemove"
          label={t('remove')}
          onChange={clearAllFilters}
          className="bg-gray-300"
          withIndicator={false}
          icon="material-symbols:remove"
        />

        <RHFCheckbox
          key="isAll"
          name="isAll"
          label={t('all')}
          onChange={selectAllFilters}
          disabled={allFieldsSelected()}
          withIndicator={false}
          className="bg-black text-white"
          icon="lets-icons:done-all-alt-round"
        />
      </div>

      {filterKeys
        .filter((key) => key !== 'isAll' && key !== 'isRemove')
        .map((key) => (
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
