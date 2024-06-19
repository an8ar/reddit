import { useController, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Checkbox } from '~/components/ui/checkbox';

interface RHFCheckboxProps {
  name: string;
  label?: string;
  description?: { icon: JSX.Element; text: string };
  onChange?: () => void;
  className?: string;
  disabled?: boolean;
  icon: string;
  withIndicator: boolean;
}

export function RHFCheckbox({
  name,
  label,
  description,
  onChange,
  className,
  disabled,
  icon,
  withIndicator,
}: RHFCheckboxProps) {
  const { control } = useFormContext();

  const {
    field: { value, onChange: onFieldChange, onBlur },
  } = useController({
    name,
    control,
  });

  const handleChange = (checked: boolean) => {
    onFieldChange(checked);

    if (onChange) {
      onChange();
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
          <FormControl>
            <Checkbox
              checked={value}
              onCheckedChange={handleChange}
              onBlur={onBlur}
              className={className}
              disabled={disabled}
              icon={icon}
              withIndicator={withIndicator}
            />
          </FormControl>
          <div className="flex gap-4 items-center">
            {label && <FormLabel className="text-sm">{label}</FormLabel>}
            {description?.icon}
          </div>
        </FormItem>
      )}
    />
  );
}
