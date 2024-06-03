"use client";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { cn } from "~/lib/utils";
import { useEffect, useRef, useState } from "react";
interface IProps {
  name: string;
  placeholder?: string;
  label?: string;
  defaultValue?: any;
  type?: string;
  maxLength?: number;
  className?: string;
}

export function RHFTextArea({
  name,
  placeholder,
  label,
  defaultValue,
  type,
  className,
  maxLength,
}: IProps) {
  const { control } = useFormContext();
  const [charCount, setCharCount] = useState(
    defaultValue ? defaultValue.length : 0
  );
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className={cn(className || "")}
              maxLength={maxLength}
              onChange={(e) => {
                setCharCount(e.target.value.length);
                field.onChange(e);
              }}
            />
          </FormControl>
          {maxLength && (
            <div className="text-right text-sm text-gray-500">
              {charCount}/{maxLength}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
