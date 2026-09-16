import type { HTMLAttributes } from 'react';
import { cx } from './utils';
export interface CardProps extends HTMLAttributes<HTMLDivElement> { elevated?: boolean }
export function Card({ elevated = false, className, ...props }: CardProps) {
  return <div className={cx('rounded-2xl border border-slate-200 bg-white p-5 text-slate-900', elevated && 'shadow-xl shadow-slate-900/5', className)} {...props} />;
}
