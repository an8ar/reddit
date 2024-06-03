"use client";

import { Icon } from "@iconify/react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PostTextForm } from "./post-text-form";
import { PostImageForm } from "./post-image-form";
import { useState } from "react";

export function PostForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="hover:bg-slate-200 rounded-full flex gap-2 items-center"
        >
          <Icon icon="teenyicons:add-outline" className="h-5 w-5" />{" "}
          <span>Create </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl min-h-96">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <FormsTab closeModal={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
interface FormTabProps {
  closeModal: () => void;
}
function FormsTab({ closeModal }: FormTabProps) {
  return (
    <Tabs defaultValue="text" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="text">Text</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
      </TabsList>
      <TabsContent value="text">
        <PostTextForm closeModal={closeModal} />
      </TabsContent>
      <TabsContent value="image">
        <PostImageForm closeModal={closeModal} />
      </TabsContent>
    </Tabs>
  );
}
