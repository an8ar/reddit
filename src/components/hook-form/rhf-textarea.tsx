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
import { useState } from "react";
interface Props {
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
}: Props) {
  const { control, watch } = useFormContext();
  const charCount = watch(name)?.length;
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
