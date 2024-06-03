import React from "react";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { PostForm } from "~/feature/posts";
import Image from "next/image";
import { Icon } from "@iconify/react";

export function Header() {
  return (
    <header className=" px-4 py-2 h-14 border-b flex gap-3 items-center justify-between ">
      <div className="flex gap-3 items-center ">
        <Image
          src="/reddit.svg"
          alt="Italian Trulli"
          className="max-h-10"
          width={32}
          height={32}
        />
      </div>
      <div className="flex flex-1  justify-center items-c">
        <Input
          placeholder="Search Reddit"
          className="max-w-xl ml-48 bg-slate-200/65 hover:bg-slate-200 rounded-full"
        />
      </div>
      <nav className="flex gap-3 items-center">
        <div className="hover:bg-slate-200  rounded-full p-2">
          <Icon icon="uiw:message" className="h-5 w-5" />
        </div>
        <PostForm />

        <div className="hover:bg-slate-200 rounded-full p-2">
          <Icon icon="uiw:bell" className="h-5 w-5" />
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
}
