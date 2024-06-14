"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "~/components/ui/button";
import { useAppDispatch } from "~/store/hooks";
import { resetState, sortByDate } from "~/feature/posts/posts-slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortByDate() {
  const [isAsc, setIsAsc] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isAsc) {
      dispatch(sortByDate({ dateAsc: isAsc }));
      params.set("sortBy", isAsc ? "date" : "");
    } else {
      dispatch(resetState());
      params.delete("sortBy");
    }
    router.push(`${pathname}?${params.toString()}`);
    setIsAsc(!isAsc);
  };

  return (
    <div className="flex items-center gap-2 border px-2 py-1">
      <span>Date</span>
      <Button
        variant="outline"
        size="icon"
        className="relative transition-transform duration-500 ease-in-out flex border-0"
        onClick={handleClick}
      >
        <span className="flex items-center justify-center transition-transform duration-500 hover:rotate-360">
          <Icon icon="system-uicons:sort" className="size-5" />
        </span>
      </Button>
    </div>
  );
}
