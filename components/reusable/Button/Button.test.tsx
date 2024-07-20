import { render, screen } from '@testing-library/react';

import { Button } from './index';

describe('Button', () => {
  it('renders a button', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('renders a button with a class', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
  it('renders a button with a type', () => {
    render(<Button type="submit">Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
  it('renders a button with a loading state', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
  it('renders a button with a loading state and a live region', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-live', 'polite');
  });
  it('renders a button with primary variant', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--primary');
  });
  it('renders a button with secondary variant', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--secondary');
  });
  it('renders a button with a ref forwarded', () => {
    const ref = jest.fn();
    render(<Button ref={ref}>Click me</Button>);
    expect(ref).toHaveBeenCalled();
  });
  it('renders a button with a button CSS class', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button');
  });
  it('renders a button with a span element', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('button__text');
  });
});
