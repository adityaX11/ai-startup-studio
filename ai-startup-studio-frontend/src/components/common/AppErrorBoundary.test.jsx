import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AppErrorBoundary from '@/components/common/AppErrorBoundary.jsx';

function BrokenComponent() {
  throw new Error('Test failure');
}

describe('AppErrorBoundary', () => {
  it('renders fallback content after an error', () => {
    const originalError = console.error;
    console.error = () => {};

    render(
      <AppErrorBoundary>
        <BrokenComponent />
      </AppErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    console.error = originalError;
  });
});