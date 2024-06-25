'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';
import { SelectLanguage } from '~/components/select-language';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Message } from './message';
import { HeaderInput } from '~/feature/header-input';
import { BurgerMenu } from './burger-menu';
interface Props {
  locale: string;
}

export function Header({ locale }: Props) {
  const router = useRouter();

  const t = useTranslations('Header');

  const handleClick = () => {
    router.push(`/${locale}/create-post`);
  };

  return (
    <header className=" px-4 py-2 h-14 border-b flex gap-3 items-center justify-between ">
      <BurgerMenu locale={locale} />
      <Link href={`/${locale}?sortBy=date&order=asc`} className="flex gap-3 items-center min-w-10">
        <Image src="/reddit.svg" alt="Reddit" className="min-h-10" width={32} height={32} />
        <span className="font-extrabold  text-3xl text-orange-600 hidden md:contents">reddit</span>
      </Link>
      <HeaderInput />

      <nav className="flex gap-3 items-center">
        <Message />

        <Button
          variant={'link'}
          className="hover:bg-slate-200 rounded-full flex gap-2 items-center"
          onClick={handleClick}
        >
          <Icon icon="teenyicons:add-outline" className="h-5 w-5" />
          <span className="hidden md:contents">{t('button')} </span>
        </Button>

        <SelectLanguage />

        <Link href={`/${locale}/profile`}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        </Link>
      </nav>
    </header>
  );
}
