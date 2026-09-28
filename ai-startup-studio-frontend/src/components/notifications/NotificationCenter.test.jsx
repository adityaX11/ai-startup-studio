import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import NotificationCenter from '@/components/notifications/NotificationCenter.jsx';
import { useNotificationStore } from '@/store/notificationStore.js';

function renderNotificationCenter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0
      }
    }
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NotificationCenter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

afterEach(() => {
  useNotificationStore.setState({
    notifications: [],
    isOpen: false
  });
});

describe('NotificationCenter', () => {
  it('renders the notification button', async () => {
    renderNotificationCenter();

    expect(
      await screen.findByRole('button', { name: /notifications/i })
    ).toBeInTheDocument();
  });
});