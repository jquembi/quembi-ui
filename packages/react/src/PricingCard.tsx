import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from './utils';
import { Button } from './Button';
export interface PricingCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  name: string; price: string; description: string; features: string[]; featured?: boolean; actionLabel?: string; onAction?: () => void; footer?: ReactNode;
}
export function PricingCard({ name, price, description, features, featured = false, actionLabel = 'Começar', onAction, footer, className, ...props }: PricingCardProps) {
  return <article className={cx('rounded-2xl border bg-white p-6 text-slate-900 shadow-sm', featured ? 'border-violet-500 ring-4 ring-violet-100' : 'border-slate-200', className)} {...props}>
    <p className="text-sm font-semibold text-violet-700">{name}</p><div className="mt-3 text-3xl font-bold tracking-tight">{price}</div>
    <p className="mt-2 min-h-10 text-sm text-slate-500">{description}</p>
    <ul className="my-6 space-y-3">{features.map(feature => <li key={feature} className="flex gap-2 text-sm"><span aria-hidden="true" className="text-emerald-600">✓</span>{feature}</li>)}</ul>
    <Button variant={featured ? 'primary' : 'outline'} className="w-full" onClick={onAction}>{actionLabel}</Button>{footer}
  </article>;
}
