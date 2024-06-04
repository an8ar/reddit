import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Button } from "~/components/ui/button";

export function VotePanel() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" className="bg-white rounded-full">
        <Icon icon="ph:arrow-fat-up-light" />
      </Button>
      <span>111</span>
      <button>
        <Icon icon="ph:arrow-fat-up-light" />
      </button>
    </div>
  );
}
