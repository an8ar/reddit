import { useState } from 'react';
import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { FormValuesProps } from '../types';

export const useFileUpload = (
  setValue: UseFormSetValue<FormValuesProps>,
  getValues: UseFormGetValues<FormValuesProps>,
) => {
  const [photos, setPhotos] = useState<string[]>([]);

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
      }),
    );

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

    const previousPhotos = getValues('imageUrls');

    setValue('imageUrls', [...(previousPhotos || []), ...newPhotos]);
  };

  return { photos, handleFileChange };
};
