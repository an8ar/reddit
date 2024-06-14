import React from 'react';

import { SortByDate } from './sort-by-date';
import { SortByName } from './sort-by-post-name';

export function Sort() {
  return (
    <section className="flex">
      <SortByDate />
      <SortByName />
    </section>
  );
}
