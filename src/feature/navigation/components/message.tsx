import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Icon } from '@iconify/react/dist/iconify.js';

export function Message() {
  return (
    <Dialog>
      <DialogTrigger className="hover:bg-slate-200  rounded-full p-2">
        <Icon icon="uiw:message" className="size-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Your Messages</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-end">
          <div className="px-3 py-1 rounded-s-full text-sm rounded-e-xl bg-slate-200">
            <span>to be implemented</span>
          </div>
          <div className="px-3 py-1 text-sm rounded-s-full rounded-e-xl bg-slate-200">
            <span>to be implemented</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
