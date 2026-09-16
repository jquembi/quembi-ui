import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx } from './utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-violet-600 text-white hover:bg-violet-500 shadow-sm shadow-violet-500/20',
  secondary: 'bg-slate-900 text-white hover:bg-slate-700',
  outline: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
  ghost: 'text-slate-700 hover:bg-slate-100',
  danger: 'bg-rose-600 text-white hover:bg-rose-500',
};
const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs', md: 'h-10 px-4 text-sm', lg: 'h-12 px-5 text-base',
};
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, disabled, className, children, type = 'button', ...props }, ref,
) {
  return <button ref={ref} type={type} disabled={disabled || loading} aria-busy={loading || undefined}
    className={cx('inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-50', variants[variant], sizes[size], className)} {...props}>
    {loading && <svg aria-hidden="true" className="size-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3"/><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>}
    {children}
  </button>;
});
