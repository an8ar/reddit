// __tests__/post-form.test.tsx
import { renderWithProviders } from '../utils/render-with-providers';
import { PostForm } from '~/feature/posts/components/post-form';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

test('post form rendering', () => {
  const { container } = renderWithProviders(<PostForm type="image" />, {
    intlProviderProps: {
      locale: 'en',
      timeZone: 'America/New_York',
      now: new Date(),
      defaultTranslationValues: {
        i: (chunks: React.ReactNode) => <i>{chunks}</i>,
      },
    },
  });

  expect(container).toMatchSnapshot();
});
