'use client';

import React from 'react';

import { FormProvider, RHFTextArea } from '~/components/hook-form';
import { Button } from '~/components/ui/button';
import { FileUploadArea } from '~/components/upload-file-area';
import { useAppDispatch } from '~/store/hooks';

import { addPost } from '../posts-slice';
import { FormType, FormValuesProps } from '../types';

import { PostPhotoCarousel } from './post-photo-carousel';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useFileUpload, usePostForm } from '../hooks';

interface Props {
  closeModal?: () => void;
  type: FormType;
}

export function PostForm({ closeModal, type }: Props) {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const t = useTranslations('PostForm');

  const methods = usePostForm();

  const { handleSubmit, setValue, getValues } = methods;

  const { photos, handleFileChange } = useFileUpload(setValue, getValues);

  const onSubmit = async ({ imageUrls, title, text }: FormValuesProps) => {
    try {
      if (type === 'image') {
        dispatch(addPost('image', imageUrls || [], title));
      } else {
        dispatch(addPost('text', text || '', title));
      }

      if (closeModal) closeModal();

      router.push('/');
    } catch (error) {
      console.error('Failed to submit application:', error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col gap-2 mt-2">
        <RHFTextArea name="title" placeholder={t('title')} maxLength={300} />

        {type === 'text' && <RHFTextArea name="text" placeholder={t('body')} className="h-40" />}

        {type === 'image' && photos.length <= 0 && (
          <FileUploadArea handleFileChange={handleFileChange} />
        )}

        {type === 'image' && photos.length > 0 && (
          <PostPhotoCarousel handleFileChange={handleFileChange} photos={photos} />
        )}

        <div className="flex gap-5 justify-end">
          <Button className="rounded-full bg-blue-800" type="button">
            {t('Submit.draft')}
          </Button>
          <Button type="submit" className="rounded-full bg-blue-800">
            {t('Submit.save')}
          </Button>
        </div>
      </section>
    </FormProvider>
  );
}
