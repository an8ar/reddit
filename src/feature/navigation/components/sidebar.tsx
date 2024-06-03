import React from 'react';
import { BarChart, Home, TrendingUp } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';

export function SideBar() {
  return (
    <div className="px-4 py-2 flex-none w-80 ">
      <ul className="space-y-0">
        {feeds.map((feed) => (
          <li
            className="flex space-y-0 gap-2 items-center text-sm  rounded-xl hover:bg-gray-100 py-2 px-2"
            key={feed.name}
          >
            {feed.icon} <span>{feed.name}</span>
          </li>
        ))}
      </ul>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="px-2">
          <AccordionTrigger className="font-thin text-gray-500 ">Custom Feeds</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="px-2">
          <AccordionTrigger className="font-thin text-gray-500">Communities</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="px-2">
          <AccordionTrigger className="font-thin text-gray-500">Resources</AccordionTrigger>
          <AccordionContent>Noting here {';)'}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

const feeds = [
  {
    name: 'Home',
    icon: <Home size={20} />,
  },
  {
    name: 'Popular',
    icon: <TrendingUp size={20} />,
  },
  {
    name: 'All',
    icon: <BarChart size={20} />,
  },
];

const customFeeds = [
  {
    name: 'Create a community',
    icon: <Home />,
  },
];
