import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import { SideBar } from './sidebar';

interface Props {
  locale: string;
}

export function BurgerMenu(props: Props) {
  return (
    <aside>
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Button variant="outline">
            <Icon icon={'iconamoon:menu-burger-horizontal'} />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <SideBar {...props} />
        </SheetContent>
      </Sheet>
    </aside>
  );
}
