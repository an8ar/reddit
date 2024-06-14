'use client';

import { useState } from 'react';

import { Icon } from '@iconify/react';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

import { FormType } from '../types';

import { PostForm } from './post-form';

export function PostFormDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="link" className="hover:bg-slate-200 rounded-full flex gap-2 items-center">
          <Icon icon="teenyicons:add-outline" className="h-5 w-5" /> <span>Create </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl min-h-96">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>Select a community</DialogDescription>
        </DialogHeader>
        <FormsTab closeModal={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
interface FormTabProps {
  closeModal?: () => void;
}

export function FormsTab({ closeModal }: FormTabProps) {
  const [tabValue, setTabValue] = useState<FormType>('text');

  const handleTabChange = (value: string) => {
    setTabValue(value as FormType);
  };

  return (
    <Tabs defaultValue="text" className="" onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="text">Text</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
      </TabsList>
      <PostForm closeModal={closeModal} type={tabValue} />
    </Tabs>
  );
}
