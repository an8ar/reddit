'use client';
import React, { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Button } from '~/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SelectLanguage } from '~/components/select-language';
import Link from 'next/link';

interface Props {
  locale: string;
}

export function Header({ locale }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${locale}/create-post`);
  };

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const [value, setValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (event.target.value === '') {
      params.delete('title');
    } else {
      params.set('title', event.target.value);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className=" px-4 py-2 h-14 border-b flex gap-3 items-center justify-between ">
      <Link href={'/'} className="flex gap-3 items-center ">
        <Image src="/reddit.svg" alt="Italian Trulli" className="max-h-10" width={32} height={32} />
      </Link>
      <div className="flex flex-1  justify-center items-c">
        <Input
          placeholder="Search Reddit"
          value={value}
          className="max-w-xl ml-48 bg-slate-200/65 hover:bg-slate-200 rounded-full"
          onChange={handleInputChange}
        />
      </div>
      <nav className="flex gap-3 items-center">
        <div className="hover:bg-slate-200  rounded-full p-2">
          <Icon icon="uiw:message" className="h-5 w-5" />
        </div>
        <Button
          variant={'link'}
          className="hover:bg-slate-200 rounded-full flex gap-2 items-center"
          onClick={handleClick}
        >
          <Icon icon="teenyicons:add-outline" className="h-5 w-5" /> <span>Create </span>
        </Button>

        <div className="hover:bg-slate-200 rounded-full p-2">
          <Icon icon="uiw:bell" className="h-5 w-5" />
        </div>
        <SelectLanguage />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
}
