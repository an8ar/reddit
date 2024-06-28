import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NextIntlClientProvider, IntlConfig } from 'next-intl';
import { AppStore, RootState, makeStore } from '~/store';

interface IntlProviderProps extends Omit<IntlConfig, 'locale'> {
  locale: string;
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  intlProviderProps?: IntlProviderProps;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = makeStore(),
    intlProviderProps,
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <NextIntlClientProvider {...intlProviderProps}>{children}</NextIntlClientProvider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
