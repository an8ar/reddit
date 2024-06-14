import React from 'react';

import { FormsTab } from '~/feature/posts';

export default function Page() {
  return (
    <main className=" w-full">
      <header className="my-3">
        <h1 className="font-bold text-2xl">Create post</h1>
      </header>
      <section>
        <FormsTab />
      </section>
    </main>
  );
}
