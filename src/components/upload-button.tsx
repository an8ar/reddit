import { Icon } from '@iconify/react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Props {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadButton = ({ handleFileChange }: Props) => {
  return (
    <div className="absolute left-4 top-2 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <Label
        htmlFor="inputPhoto"
        className="inset-0 flex items-center gap-2 rounded-full bg-stone-400 px-2 py-3 text-white hover:cursor-pointer"
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
