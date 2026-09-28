import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProgressBar from '@/components/common/ProgressBar.jsx';

describe('ProgressBar', () => {
  it('renders the progress value', () => {
    render(<ProgressBar value={72} label="Workspace progress" />);

    expect(screen.getByText('Workspace progress')).toBeInTheDocument();
    expect(screen.getByText('72%')).toBeInTheDocument();
  });
});