import { fireEvent, screen, act } from '@testing-library/react';
import { renderWithProviders } from '../utils/render-with-providers'; // Adjust the import to match your file structure
import { PostForm } from '~/feature/posts/components/post-form';
import reducer, { addPost } from '~/feature/posts/posts-slice';
import enMessage from '../messages/en.json';
jest.mock('next/navigation');

test('post form rendering', () => {
  const { container } = renderWithProviders(<PostForm type="image" />, {
    intlProviderProps: {
      locale: 'en',
      timeZone: 'America/New_York',
      messages: enMessage,
      now: new Date(),
      defaultTranslationValues: {
        i: (chunks: React.ReactNode) => <i>{chunks}</i>,
      },
    },
  });

  expect(container).toMatchSnapshot();
});

test('should dispatch addPost and navigate on form submit', async () => {
  const pushMock = jest.fn();

  jest.mock('next/navigation', () => ({
    useRouter() {
      return {
        push: pushMock,
      };
    },
  }));

  jest.mock('~/feature/posts/posts-slice', () => ({
    addPost: jest.fn(),
  }));

  renderWithProviders(<PostForm type="image" />, {
    intlProviderProps: {
      locale: 'en',
      timeZone: 'America/New_York',
      messages: enMessage,
      now: new Date(),
      defaultTranslationValues: {
        i: (chunks: React.ReactNode) => <i>{chunks}</i>,
      },
    },
  });

  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Test Title' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Post/i }));
    expect(reducer(undefined, addPost('image', [], 'Test Title')));
  });
});
