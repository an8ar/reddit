"use client";
import React from "react";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/create-post");
  };

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
        <span>Here will be kinda drop down </span>
      </div>
      <nav className="flex gap-3 items-center">
        <div className="hover:bg-slate-200  rounded-full p-2">
          <Icon icon="uiw:message" className="h-5 w-5" />
        </div>
        <Button
          variant={"link"}
          className="hover:bg-slate-200 rounded-full flex gap-2 items-center"
          onClick={handleClick}
        >
          <Icon icon="teenyicons:add-outline" className="h-5 w-5" />{" "}
          <span>Create </span>
        </Button>

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
