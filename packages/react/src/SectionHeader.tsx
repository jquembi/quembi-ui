import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from './utils';
export interface SectionHeaderProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string; title: string; description?: string; action?: ReactNode;
}
export function SectionHeader({ eyebrow, title, description, action, className, ...props }: SectionHeaderProps) {
  return <header className={cx('flex flex-wrap items-end justify-between gap-4', className)} {...props}>
    <div>{eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-wider text-violet-600">{eyebrow}</p>}
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    </div>{action && <div>{action}</div>}
  </header>;
}
