"use client";

import React from "react";
import { FormProvider } from "~/components/hook-form";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFTextArea, RHFTextField } from "~/components/hook-form";

import * as Yup from "yup";
import { Post } from "../types";
import { Button } from "~/components/ui/button";
import { useAppDispatch } from "~/store/hooks";
import { addPost } from "../posts-slice";

type FormValuesProps = Omit<Post, "id" | "createdAt" | "imageUrls">;

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required("Please fill out this field.").max(300),
  text: Yup.string(),
});

interface Props {
  closeModal: () => void;
}

export function PostTextForm({ closeModal }: Props) {
  const defaultValues = {
    title: "",
    text: "",
  };
  const dispatch = useAppDispatch();

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreatePostSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = async ({ title, text }: FormValuesProps) => {
    try {
      dispatch(addPost("text", text || "", title));
      closeModal();
    } catch (error) {
      console.error("Failed to submit application:", error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <RHFTextArea
            name="title"
            placeholder="Title"
            maxLength={300}
            className="min-h-15 resize-y"
          />
          <RHFTextArea name="text" placeholder="Body" className="h-40" />
        </div>
        <div className="flex gap-5 justify-end">
          <Button className="rounded-full bg-blue-800" type="button">
            Save draft
          </Button>
          <Button type="submit" className="rounded-full bg-blue-800">
            Post
          </Button>
        </div>
      </section>
    </FormProvider>
  );
}
