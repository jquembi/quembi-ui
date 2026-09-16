import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from './utils';
export type AlertTone = 'info' | 'success' | 'warning' | 'danger';
export interface AlertProps extends HTMLAttributes<HTMLDivElement> { tone?: AlertTone; title: string; icon?: ReactNode }
const tones: Record<AlertTone, string> = {
  info: 'border-blue-200 bg-blue-50 text-blue-950', success: 'border-emerald-200 bg-emerald-50 text-emerald-950',
  warning: 'border-amber-200 bg-amber-50 text-amber-950', danger: 'border-rose-200 bg-rose-50 text-rose-950',
};
export function Alert({ tone = 'info', title, icon, children, className, ...props }: AlertProps) {
  return <div role={tone === 'danger' ? 'alert' : 'status'} className={cx('flex gap-3 rounded-xl border p-4 text-sm', tones[tone], className)} {...props}>
    <span aria-hidden="true" className="mt-0.5 shrink-0">{icon ?? (tone === 'success' ? '✓' : tone === 'warning' ? '!' : tone === 'danger' ? '×' : 'ⓘ')}</span>
    <div><p className="font-semibold">{title}</p>{children && <div className="mt-1 opacity-80">{children}</div>}</div>
  </div>;
}
