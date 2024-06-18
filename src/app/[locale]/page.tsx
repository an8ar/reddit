import { PostList } from '~/feature/posts';
import { Sort } from '~/feature/sort';
import { Filter } from '~/feature/filter';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex-1 flex flex-col gap-10">
      <header className=" border-b py-2 flex gap-4">
        <Filter />
        <Sort />
      </header>
      <section className=" ">
        <PostList searchParams={searchParams} />
      </section>
    </main>
  );
}
