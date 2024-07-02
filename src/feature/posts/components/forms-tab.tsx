'use client';

import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

import { FormType } from '../types';

import { PostForm } from './post-form';
import { useTranslations } from 'next-intl';

interface FormTabProps {
  closeModal?: () => void;
}

export function FormsTab({ closeModal }: FormTabProps) {
  const [tabValue, setTabValue] = useState<FormType>('text');

  const t = useTranslations('PostForm');

  const handleTabChange = (value: string) => {
    setTabValue(value as FormType);
  };

  return (
    <Tabs defaultValue="text" className="" onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="text">{t('Tab.text')}</TabsTrigger>
        <TabsTrigger value="image">{t('Tab.image')}</TabsTrigger>
      </TabsList>
      <PostForm closeModal={closeModal} type={tabValue} />
    </Tabs>
  );
}
