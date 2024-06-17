import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import { UploadButton } from '~/components/upload-button';
import Image from 'next/image';

interface Props {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  photos: string[];
}

export function PostPhotoCarousel({ handleFileChange, photos }: Props) {
  return (
    <div className="backdrop-blur-2xl bg-slate-200 rounded-2xl overflow-hidden h-100 group shadow-lg">
      <Carousel className="w-full flex justify-between items-center gap-2 px-8 relative">
        <UploadButton handleFileChange={handleFileChange} />

        <CarouselPrevious className="w-9 hover:bg-gray-300 transition duration-300 ease-in-out" />

        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={index}>
              <div className="h-72 flex justify-center items-center overflow-hidden">
                <Image
                  className="object-cover"
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  width={200}
                  height={200}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="w-9 hover:bg-gray-300 transition duration-300 ease-in-out" />
      </Carousel>
    </div>
  );
}
