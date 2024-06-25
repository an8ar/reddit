import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SelectLanguage } from '~/components/select-language';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '~/components/ui/sheet';

export function ProfileBottomDrawer() {
  const { locale } = useParams();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();

  return (
    <Sheet open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
      <SheetTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side={'bottom'} className=" flex h-1/2 flex-col mt- gap-4 text-sm">
        <Link href={`/${locale}/profile`} className="flex gap-2 items-center" onClick={handleClose}>
          <div className="h-5 w-5 bg-black rounded-full" />
          <div className="flex flex-col gap-1">
            <span className="text-sm">View Profile</span>
            <span className="text-xs ">an8ar</span>
          </div>
        </Link>
        <SheetTitle className="hidden" />

        <SelectLanguage />

        <div>Dark Mode</div>
      </SheetContent>
    </Sheet>
  );
}
