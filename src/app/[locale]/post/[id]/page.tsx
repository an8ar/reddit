import React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  console.log(params);
  return (
    <div>
      Page of post with id: <span className="text-slate-600 text-sm">{params.id}</span>
    </div>
  );
}
