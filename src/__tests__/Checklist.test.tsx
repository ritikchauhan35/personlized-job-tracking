import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Checklist from '@/components/Checklist';

describe('Checklist', () => {
  it('renders for seeded job', () => {
    const { getByText } = render(<Checklist jobId="seed-1" />);
    expect(getByText(/Checklist/i)).toBeInTheDocument();
  });
});
