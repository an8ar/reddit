import React from 'react';

export default function Page({ params }: { params: { feed: string } }) {
  return <div>{params.feed} Page (will be continued and implemented)</div>;
}
