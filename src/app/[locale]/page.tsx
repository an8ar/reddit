import { PostList } from '~/feature/posts';
import { Sort } from '~/feature/sort';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex-1 flex flex-col gap-10">
      <header>
        <Sort />
      </header>
      <section className=" ">
        <PostList searchParams={searchParams} />
      </section>
    </main>
  );
}
