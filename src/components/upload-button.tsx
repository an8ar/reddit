import { Icon } from '@iconify/react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Props {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadButton = ({ handleFileChange }: Props) => {
  return (
    <div className="absolute top-2 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
