import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { updateForm } from '../posts-slice';
import { FormValuesProps } from '../types';

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required('Please fill out this field.'),
  imageUrls: Yup.array().of(Yup.string().required()).optional(),
  text: Yup.string().optional(),
});

export const usePostForm = () => {
  const dispatch = useAppDispatch();

  const form = useAppSelector((state) => state.postSlice.form);

  const defaultValues = useMemo(() => ({ ...form }), [form]);

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreatePostSchema),
    defaultValues,
  });

  const { watch } = methods;

  const watchedFields = watch();

  useEffect(() => {
    const isFormChanged = watchedFields.title !== defaultValues.title;

    if (isFormChanged) {
      dispatch(updateForm(watchedFields));
    }
  }, [watchedFields, dispatch, defaultValues]);

  return methods;
};
