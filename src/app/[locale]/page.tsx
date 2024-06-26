import { PostList } from '~/feature/posts';
import { Sort, SortCancel } from '~/feature/sort';
import { DateFilterCancel, DateRangeFilter, Filter, FilterCancel } from '~/feature/filter';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <main className="flex-1 flex flex-col gap-4 md:gap-10">
      <header className=" border-b py-2 flex flex-col gap-2">
        <div className="flex gap-4 flex-col md:flex-row flex-wrap justify-start">
          <div className="flex gap-4">
            <Filter />
            <Sort />
          </div>

          <DateRangeFilter />
        </div>
        <div className="flex gap-2 ml-2 flex-wrap">
          <FilterCancel />
          <SortCancel />
          <DateFilterCancel />
        </div>
      </header>
      <section className="">
        <PostList searchParams={searchParams} />
      </section>
    </main>
  );
}
