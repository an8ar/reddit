import { Icon } from '@iconify/react/dist/iconify.js';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useTranslations } from 'next-intl';

interface Props {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadArea = ({ handleFileChange }: Props) => {
  const t = useTranslations('PostForm');

  return (
    <div className="relative w-full aspect-video rounded-2xl border-2 border-dotted border-slate-600  hover:cursor-pointer h-40 dot">
      <Label
        htmlFor="inputImage"
        className="absolute inset-0 flex gap-4 items-center justify-center"
      >
        <Icon icon="ph:plus-thin" />
        <span className="text-lg">{t('photo')}</span>
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
