import { PostList } from "~/feature/posts";
export default function Home() {
  return (
    <main className="flex-1 flex flex-col gap-10">
      <section className=" ">
        <PostList />
      </section>
    </main>
  );
}
