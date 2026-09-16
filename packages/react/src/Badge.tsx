import type { HTMLAttributes } from 'react';
import { cx } from './utils';
export type BadgeTone = 'neutral' | 'violet' | 'success' | 'warning' | 'danger';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { tone?: BadgeTone; dot?: boolean }
const tones: Record<BadgeTone, string> = {
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200', violet: 'bg-violet-50 text-violet-700 ring-violet-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200', warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  danger: 'bg-rose-50 text-rose-700 ring-rose-200',
};
export function Badge({ tone = 'neutral', dot = false, className, children, ...props }: BadgeProps) {
  return <span className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset', tones[tone], className)} {...props}>
    {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}{children}
  </span>;
}
