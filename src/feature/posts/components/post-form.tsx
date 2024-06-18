'use client';

import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { FormProvider, RHFTextArea } from '~/components/hook-form';
import { Button } from '~/components/ui/button';
import { FileUploadArea } from '~/components/upload-file-area';
import { useAppDispatch } from '~/store/hooks';

import { addPost } from '../posts-slice';
import { FormType, Post } from '../types';

import { PostPhotoCarousel } from './post-photo-carousel';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type FormValuesProps = Omit<Post, 'id' | 'createdAt'>;

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required('Please fill out this field.'),
  imageUrls: Yup.array().of(Yup.string().required()).optional(),
  text: Yup.string().optional(),
});

interface Props {
  closeModal?: () => void;
  type: FormType;
}

export function PostForm({ closeModal, type }: Props) {
  const [photos, setPhotos] = useState<string[]>([]);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const defaultValues = {
    title: '',
    imageUrls: [],
  };

  const t = useTranslations('PostForm');

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreatePostSchema),
    defaultValues,
  });

  const { handleSubmit, setValue, getValues } = methods;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    const newPhotos = await Promise.all(
      Array.from(files).map(async (file) => {
        const reader = new FileReader();

        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      }),
    );

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

    const previousPhotos = getValues('imageUrls');

    setValue('imageUrls', [...(previousPhotos || []), ...newPhotos]);
  };

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
