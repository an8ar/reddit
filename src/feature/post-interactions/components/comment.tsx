import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Button } from '~/components/ui/button';

export function Comment() {
  return (
    <div className="bg-slate-200 hover:bg-slate-300 flex items-center rounded-full  text-sm">
      <Button
        className="p-2 hover:bg-slate-300 rounded-full hover:text-red-400"
        size="icon"
        variant={'ghost'}
      >
        <Icon icon="bytesize:message" className="size-4 " />
      </Button>

      <span className="mr-4">1</span>
    </div>
  );
}
