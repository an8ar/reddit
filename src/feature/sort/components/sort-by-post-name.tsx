"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "~/components/ui/button";
import { useAppDispatch } from "~/store/hooks";
import { resetState, sortByName } from "~/feature/posts/posts-slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortByName() {
  const [isAsc, setIsAsc] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isAsc) {
      dispatch(sortByName({ asc: isAsc }));
      params.set("sortBy", isAsc ? "name" : "");
    } else {
      dispatch(resetState());
      params.delete("sortBy");
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsAsc(!isAsc);
  };

  return (
    <div className="flex items-center gap-2 border px-2 py-1">
      <span>Name</span>
      <Button
        variant="outline"
        size="icon"
        className="relative transition-transform duration-500 ease-in-out flex border-0"
        onClick={handleClick}
      >
        <span className="flex items-center justify-center transition-transform duration-500 hover:rotate-360">
          <Icon icon="system-uicons:sort" className="h-5 w-5" />
        </span>
      </Button>
    </div>
  );
}
