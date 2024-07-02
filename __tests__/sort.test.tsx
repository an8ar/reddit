import React from 'react';
import { screen, act } from '@testing-library/react';
import { renderWithProviders } from '../utils/render-with-providers';
import { Sort } from '~/feature/sort';
import enMessages from '../messages/en.json';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockRouter = {
  replace: jest.fn(),
};

describe('Sort Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (usePathname as jest.Mock).mockReturnValue('/test-path');

    (useSearchParams as jest.Mock).mockReturnValue({
      toString: jest.fn(() => 'sortBy=date&order=asc'),
      get: jest.fn((key) => {
        if (key === 'sortBy') return 'date';
        if (key === 'order') return 'asc';
        return null;
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Initial render', () => {
    const { container } = renderWithProviders(<Sort />, {
      intlProviderProps: {
        locale: 'en',
        messages: enMessages,
        timeZone: 'America/New_York',
        now: new Date(),
      },
    });
    expect(container).toMatchSnapshot();

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  //   test('Sort type change', async () => {
  //     renderWithProviders(<Sort />, {
  //       intlProviderProps: {
  //         locale: 'en',
  //         messages: enMessages,
  //         timeZone: 'America/New_York',
  //         now: new Date(),
  //       },
  //     });

  //     fireEvent.click(screen.getByRole('button'));

  //     fireEvent.click(screen.getByText('New'));

  //     expect(mockRouter.replace).toHaveBeenCalledWith('/en?sortBy=date&order=asc');
  //   });

  //   test('Sort order change', async () => {
  //     await act(async () => {
  //       renderWithProviders(<Sort />, {
  //         intlProviderProps: {
  //           locale: 'en',
  //           messages: enMessages,
  //           timeZone: 'America/New_York',
  //           now: new Date(),
  //         },
  //       });
  //     });

  //     await act(async () => {
  //       userEvent.click(screen.getByRole('button'));
  //       console.log(screen.debug());
  //     });

  //     expect(screen.getByText('Sort by')).toBeInTheDocument();

  //     await act(async () => {
  //       userEvent.click(screen.getByText('Old'));
  //     });

  //     expect(mockRouter.replace).toHaveBeenCalledWith('/en?sortBy=date&order=desc');
  //   });

  //   test('Name sort change', async () => {
  //     renderWithProviders(<Sort />, {
  //       intlProviderProps: {
  //         locale: 'en',
  //         messages: enMessages,
  //         timeZone: 'America/New_York',
  //         now: new Date(),
  //       },
  //     });

  //     fireEvent.click(screen.getByRole('button'));

  //     fireEvent.click(screen.getByText('A-Z'));

  //     expect(mockRouter.replace).toHaveBeenCalledWith('/en?sortBy=name&order=asc');
  //   });
});
