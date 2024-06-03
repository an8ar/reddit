"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface Props {
  name: string;
  placeholder?: string;
  label?: string;
  defaultValue?: any;
  type?: string;
  maxLength?: number;
}

export function RHFTextField({
  name,
  placeholder,
  label,
  defaultValue,
  type,
  maxLength,
}: Props) {
  const { control, watch } = useFormContext();
  const charCount = watch(name).length;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              maxLength={maxLength}
            />
          </FormControl>
          {maxLength && (
            <div className="text-right text-sm text-gray-500">
              {charCount}/{maxLength} characters
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
