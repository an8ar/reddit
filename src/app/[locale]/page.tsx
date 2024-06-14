import { PostList } from '~/feature/posts';
import { Sort } from '~/feature/sort';
import { useTranslations } from 'next-intl';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = useTranslations('Index');

  return (
    <main className="flex-1 flex flex-col gap-10">
      <header>
        <h1>{t('title')}</h1>
        <Sort />
      </header>
      <section className=" ">
        <PostList searchParams={searchParams} />
      </section>
    </main>
  );
}
