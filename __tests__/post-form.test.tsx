import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithProviders } from '../utils/render-with-providers';
import { PostForm } from '~/feature/posts/components/post-form';
import enMessages from '../messages/en.json';
import ruMessages from '../messages/ru.json';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { makeStore } from '~/store';

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

describe('PostForm Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  test('renders correctly with initial content', () => {
    const { container } = renderWithProviders(<PostForm type="image" />, {
      intlProviderProps: {
        locale: 'en',
        messages: enMessages,
        timeZone: 'America/New_York',
        now: new Date(),
      },
    });
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Post' })).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test('renders correctly with different locale', () => {
    const { container } = renderWithProviders(<PostForm type="image" />, {
      intlProviderProps: {
        locale: 'ru',
        messages: ruMessages,
        timeZone: 'America/New_York',
        now: new Date(),
      },
    });

    expect(screen.getByPlaceholderText('Заголовок')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Добавить' })).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test('handles form submission', async () => {
    const store = makeStore();

    store.dispatch = jest.fn();

    await act(async () => {
      renderWithProviders(<PostForm type="image" />, {
        store,
        intlProviderProps: {
          locale: 'en',
          messages: enMessages,
          timeZone: 'America/New_York',
          now: new Date(),
        },
      });
    });

    const expectedUpdateFormPayload = {
      title: 'Test Title',
    };

    const expectedAddPostPayload = {
      id: expect.any(String),
      createdAt: expect.any(String),
      title: 'Test Title',
      imageUrls: [],
      voteCount: 0,
    };

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Title'), {
        target: { value: 'Test Title' },
      });
    });

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'postSlice/updateForm',
      payload: expectedUpdateFormPayload,
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: 'Post' }));
    });

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'postSlice/addPost',
      payload: expectedAddPostPayload,
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
