"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import {
  FormProvider,
  RHFTextArea,
  RHFTextField,
} from "~/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormType, Post } from "../types";
import * as Yup from "yup";
import { Button } from "~/components/ui/button";
import { useAppDispatch } from "~/store/hooks";
import { addPost } from "../posts-slice";
import Image from "next/image";
import { UploadFile } from "~/components/upload-file";
import { FileUploadArea } from "~/components/upload-file-area";

type FormValuesProps = Omit<Post, "id" | "createdAt">;

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required("Please fill out this field."),
  imageUrls: Yup.array().of(Yup.string().required()).optional(),
  text: Yup.string().optional(),
});

interface Props {
  closeModal?: () => void;
  type: FormType;
}

export function PostForm({ closeModal, type }: Props) {
  const [photos, setPhotos] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const defaultValues = {
    title: "",
    imageUrls: [],
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreatePostSchema),
    defaultValues,
  });
  const { handleSubmit, setValue, getValues } = methods;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const newPhotos = await Promise.all(
      Array.from(files).map(async (file) => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      })
    );

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    const previousPhotos = getValues("imageUrls");
    setValue("imageUrls", [...(previousPhotos || []), ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, idx) => idx !== index));
  };

  const onSubmit = async ({ imageUrls, title, text }: FormValuesProps) => {
    try {
      if (type === "image") {
        dispatch(addPost("image", imageUrls || [], title));
      } else {
        dispatch(addPost("text", text || "", title));
      }
      if (closeModal) closeModal();
    } catch (error) {
      console.error("Failed to submit application:", error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col gap-2 mt-2">
        <RHFTextArea name="title" placeholder="Title" maxLength={300} />
        {type === "text" && (
          <RHFTextArea name="text" placeholder="Body" className="h-40" />
        )}
        {type === "image" && photos.length <= 0 && (
          <FileUploadArea handleFileChange={handleFileChange} />
        )}
        {type === "image" && photos.length > 0 && (
          <div className="backdrop-blur-2xl bg-slate-200 rounded-2xl overflow-hidden h-100 group">
            <Carousel className="w-full flex justify-between items-center gap-2 px-8 relative">
              <div className="absolute top-2 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <UploadFile handleFileChange={handleFileChange} />
              </div>
              <div>
                <CarouselPrevious />
              </div>
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className=" max-h-72 flex justify-center items-center">
                      <Image
                        className="object-scale-down"
                        src={photo}
                        alt="Sheraton Hotel"
                        width={200}
                        height={200}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div>
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        )}

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
