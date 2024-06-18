'use client';

import React, { useEffect } from 'react';

import { FormProvider, RHFCheckbox } from '~/components/hook-form';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
<<<<<<< HEAD
import { useTranslations } from 'next-intl';
=======
>>>>>>> eccf5695cb7fac2298a019725b68c0b8dc394081

export function FilterForm() {
  type FormValuesProps = { isText: boolean; isImage: boolean; isLink: boolean };

<<<<<<< HEAD
  const t = useTranslations('Filter');

=======
>>>>>>> eccf5695cb7fac2298a019725b68c0b8dc394081
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
<<<<<<< HEAD
      <RHFCheckbox name="isText" label={t('text')} />
      <RHFCheckbox name="isImage" label={t('image')} />
      <RHFCheckbox name="isLink" label={t('link')} />
=======
      <RHFCheckbox name="isText" label="Text" />
      <RHFCheckbox name="isImage" label="Image" />
      <RHFCheckbox name="isLink" label="Link" />
>>>>>>> eccf5695cb7fac2298a019725b68c0b8dc394081
    </FormProvider>
  );
}
