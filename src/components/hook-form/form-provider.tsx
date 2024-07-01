import React, { ReactNode } from 'react';

import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  className?: string;
  id?: string;
};

export function FormProvider({ children, onSubmit, methods, className, id }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={className} id={id}>
        {children}
      </form>
    </Form>
  );
}
