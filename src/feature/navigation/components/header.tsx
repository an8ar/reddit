import React from "react";
import { Input } from "../../../components/ui/input";
import { MessageCircleMore, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { PostForm } from "~/feature/posts";
import Image from "next/image";

export function Header() {
  return (
    <nav className="flex gap-3 items-center justify-between ">
      <div className="flex gap-3 items-center flex-grow">
        <Image
          src="/reddit.svg"
          alt="Italian Trulli"
          className="max-h-10"
          width={32}
          height={32}
        />
        <div className="flex-grow flex justify-center">
          <Input placeholder="Search Reddit" className="max-w-md bg-gray-100" />
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="hover:bg-slate-200  rounded-full">
          <MessageCircleMore />
        </div>
        <PostForm />

        <div className="hover:bg-slate-200 rounded-full">
          <Bell />
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
