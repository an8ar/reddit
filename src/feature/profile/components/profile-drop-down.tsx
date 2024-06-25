import { User, Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { SelectLanguage } from '~/components/select-language';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export function ProfileDropDown() {
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/${locale}/profile`}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem>
            <Globe className="mr-2 h-4 w-4" />
            <SelectLanguage />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
