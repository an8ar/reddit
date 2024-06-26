import { useTranslations } from 'next-intl';
import React from 'react';

import { FormsTab } from '~/feature/posts';

export default function Page() {
  const t = useTranslations('PostForm');

  return (
    <main className=" w-full px-2">
      <header className="my-3">
        <h1 className="font-bold text-2xl">{t('name')}</h1>
      </header>
      <section>
        <FormsTab />
      </section>
    </main>
  );
}
