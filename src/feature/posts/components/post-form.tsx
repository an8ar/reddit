"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { FormProvider, RHFTextArea } from "~/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Post } from "../types";
import * as Yup from "yup";
import { Button } from "~/components/ui/button";
import { useAppDispatch } from "~/store/hooks";
import { addPost } from "../posts-slice";
type FormValuesProps = Omit<Post, "id" | "createdAt">;

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required("Please fill out this field."),
  imageUrls: Yup.array().of(Yup.string().required()).optional(),
});

interface Props {
  closeModal: () => void;
}

export function PostImageForm({ closeModal }: Props) {
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

  const onSubmit = async ({ imageUrls, title }: FormValuesProps) => {
    try {
      dispatch(addPost("image", imageUrls || [], title));
      closeModal();
    } catch (error) {
      console.error("Failed to submit application:", error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col gap-2">
        <RHFTextArea
          name="title"
          placeholder="Title"
          className="min-h-10"
          maxLength={300}
        />
        {photos.length <= 0 ? (
          <FileUploadArea handleFileChange={handleFileChange} />
        ) : (
          <div className="backdrop-blur-2xl bg-slate-200 rounded-2xl overflow-hidden h-100 group">
            <Carousel className="w-full flex justify-between items-center gap-2 px-8 relative">
              <div className="absolute top-2 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <UploadPhoto handleFileChange={handleFileChange} />
              </div>
              <div>
                <CarouselPrevious />
              </div>
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className=" max-h-72 flex justify-center items-center">
                      <img
                        className="object-scale-down"
                        src={photo}
                        alt="Sheraton Hotel"
                        width={200}
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

interface UploadPhotoProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadPhoto = ({ handleFileChange }: UploadPhotoProps) => {
  return (
    <div className=" ">
      <Label
        htmlFor="inputPhoto"
        className="inset-0  px-2 py-3 rounded-full hover:cursor-pointer flex items-center gap-2 bg-stone-400 text-white"
      >
        <Icon icon="carbon:image" />
        <span>Add</span>
      </Label>
      <Input
        type="file"
        id="inputPhoto"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        hidden
        className="file-selector-button-none hidden"
      />
    </div>
  );
};

const FileUploadArea = ({ handleFileChange }: UploadPhotoProps) => {
  return (
    <div className="relative w-full aspect-video rounded-2xl border-2 border-dotted border-slate-600  hover:cursor-pointer h-40 dot">
      <Label
        htmlFor="inputImage"
        className="absolute inset-0 flex gap-4 items-center justify-center"
      >
        <Icon icon="ph:plus-thin" />
        <span className="text-lg">Add photo</span>
      </Label>
      <Input
        type="file"
        id="inputImage"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        hidden
        className="file-selector-button-none hidden"
      />
    </div>
  );
};
