import { Filter } from '~/feature/filter';
import { renderWithProviders } from '../utils/render-with-providers';
import enMessages from '../../messages/en.json';

test('Filter component', () => {
  renderWithProviders(<Filter />, {
    intlProviderProps: {
      locale: 'en',
      timeZone: 'America/New_York',
      now: new Date(),
      defaultTranslationValues: {
        i: (chunks: React.ReactNode) => <i>{chunks}</i>,
      },
      messages: enMessages,
    },
  });
});
