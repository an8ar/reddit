'use client';

import * as React from 'react';
import { Button } from '~/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Icon } from '@iconify/react';
import { Post } from '~/feature/posts/types';
import { InputPost } from '~/feature/header-input/components/input-post';

interface Props {
  posts: Post[];
}

export function AutoComplete({ posts }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="bg-inherit border-none"
        >
          <span className="hidden md:block">Explore reddit...</span>
          <Icon icon="tabler:search" className="size-5 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen md:w-[500px]  md:h-full p-0  border-none ">
        <Command
          className="h-full "
          filter={(value, search) => {
            if (value.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Search reddit" className="text-base" />
          <CommandList className="p-0 max-h-screen md:max-h-[400px]    md:h-3/4">
            <CommandEmpty className="  text-center block ">No option found.</CommandEmpty>
            <CommandGroup>
              {posts.map((post) => (
                <CommandItem
                  key={post.id}
                  value={post.title}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                  className="flex"
                >
                  <InputPost {...post} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
