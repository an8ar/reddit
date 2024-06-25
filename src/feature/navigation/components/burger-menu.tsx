import { Icon } from '@iconify/react/dist/iconify.js';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '~/components/ui/sheet';
import { SideBar } from './sidebar';

interface Props {
  locale: string;
}

export function BurgerMenu(props: Props) {
  return (
    <aside>
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Icon icon={'iconamoon:menu-burger-horizontal'} />
        </SheetTrigger>
        <SheetContent side={'left'} className="p-0 pt-4">
          <SheetTitle className="hidden" />
          <SideBar {...props} />
        </SheetContent>
      </Sheet>
    </aside>
  );
}
