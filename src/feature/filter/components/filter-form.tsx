'use client';

import React, { useEffect } from 'react';

import { FormProvider, RHFCheckbox } from '~/components/hook-form';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function FilterForm() {
  type FormValuesProps = { isText: boolean; isImage: boolean; isLink: boolean };

  const searchParams = useSearchParams();

  const defaultValues: FormValuesProps = {
    isText: searchParams.get('isText') === 'true',
    isImage: searchParams.get('isImage') === 'true',
    isLink: searchParams.get('isLink') === 'true',
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const router = useRouter();

  const pathname = usePathname();

  const { watch } = methods;

  const values = watch();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        params.set(key, 'true');
      } else {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  }, [values, pathname, router, searchParams]);
  return (
    <FormProvider methods={methods} className="flex flex-col gap-2 m-2">
      <RHFCheckbox name="isText" label="Text" />
      <RHFCheckbox name="isImage" label="Image" />
      <RHFCheckbox name="isLink" label="Link" />
    </FormProvider>
  );
}
