'use client';
import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Button } from '~/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Message } from './message';
import { HeaderInput } from '~/feature/header-input';
import { BurgerMenu } from './burger-menu';
import { ProfileBottomDrawer, ProfileDropDown } from '~/feature/profile';
import { useResponsive } from '~/hooks/use-responsive';
interface Props {
  locale: string;
}

export function Header({ locale }: Props) {
  const router = useRouter();

  const t = useTranslations('Header');

  const isDesktop = useResponsive('up', 'md');

  const pathname = usePathname();

  const handleClick = () => {
    router.push(`/${locale}/create-post`);
  };

  return (
    <header className=" px-4 py-2 h-14 border-b flex gap-3 items-center justify-between ">
      <div className="flex gap-2 items-center">
        {!!!isDesktop && <BurgerMenu locale={locale} key={`${pathname}-burger-menu`} />}

        <Link
          href={`/${locale}?sortBy=date&order=asc`}
          className="flex gap-3 items-center min-w-10"
        >
          <Image src="/reddit.svg" alt="Reddit" className="min-h-10" width={32} height={32} />
          <span className="font-extrabold  text-3xl text-orange-600 hidden md:contents">
            reddit
          </span>
        </Link>
      </div>

      {isDesktop && <HeaderInput key={`${pathname}-input-desktop`} />}

      <nav className="flex gap-3 items-center">
        {!isDesktop && <HeaderInput key={`${pathname}-input-mobile`} />}

        <Message />

        <Button
          variant={'link'}
          className="hover:bg-slate-200 rounded-full flex gap-2 items-center p-2"
          onClick={handleClick}
        >
          <Icon icon="teenyicons:add-outline" className="h-5 w-5" />
          <span className="hidden md:contents">{t('button')} </span>
        </Button>

        {isDesktop ? (
          <ProfileDropDown key={`${pathname}-dropdown`} />
        ) : (
          <ProfileBottomDrawer key={`${pathname}-drawer`} />
        )}
      </nav>
    </header>
  );
}
