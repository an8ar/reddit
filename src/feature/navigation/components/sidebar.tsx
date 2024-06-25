import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
interface Props {
  locale: string;
}

export function SideBar({ locale }: Props) {
  const t = useTranslations('SideBar');

  const feeds = useMemo(
    () => [
      {
        name: t('home'),
        icon: <Icon icon="ic:round-home" className="text-[28px]" />,
        href: `/${locale}?sortBy=date&order=asc`,
      },
      {
        name: t('popular'),
        icon: <Icon icon="solar:graph-up-linear" className="text-[28px]" />,
        href: `/${locale}/popular`,
      },
      {
        name: t('all'),
        icon: <Icon icon="f7:chart-bar-circle" className="text-[28px]" />,
        href: `/${locale}/all`,
      },
    ],
    [],
  );

  return (
    <div className="px-4 py-2 flex-none w-full md:w-64 md:border-r ">
      <ul className="space-y-0">
        {feeds.map((feed) => (
          <li key={feed.name}>
            <Link
              href={feed.href}
              className="flex space-y-0 gap-2 items-center text-sm  rounded-xl hover:bg-gray-100 py-2 px-2"
            >
              {feed.icon} <span>{feed.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="px-2">
          <AccordionTrigger className=" text-gray-500 ">
            {t('Accordions.customFeeds')}
          </AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="px-2">
          <AccordionTrigger className=" text-gray-500">
            {t('Accordions.communities')}
          </AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="px-2">
          <AccordionTrigger className=" text-gray-500">
            {t('Accordions.resources')}
          </AccordionTrigger>
          <AccordionContent>Noting here {';)'}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
