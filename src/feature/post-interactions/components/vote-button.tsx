import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Button } from '~/components/ui/button';

export function VoteButton() {
  return (
    <div className="flex items-center   bg-slate-200 rounded-full ">
      <Button
        className="p-2 hover:bg-slate-300 rounded-full hover:text-red-400"
        size="icon"
        variant={'ghost'}
      >
        <Icon icon="mynaui:fat-arrow-up" className=" size-4" />
      </Button>

      <span>111</span>

      <Button
        className="p-2 hover:bg-slate-300 rounded-full hover:text-blue-600"
        size="icon"
        variant={'ghost'}
      >
        <Icon icon="mynaui:fat-arrow-down" className=" size-4 " />
      </Button>
    </div>
  );
}
