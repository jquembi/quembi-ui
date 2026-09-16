import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from './utils';
export interface DashboardLink { label: string; href: string; icon?: ReactNode; active?: boolean }
export interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {
  brand: ReactNode; links: DashboardLink[]; header?: ReactNode; sidebarFooter?: ReactNode;
}
export function DashboardShell({ brand, links, header, sidebarFooter, children, className, ...props }: DashboardShellProps) {
  return <div className={cx('min-h-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 md:grid md:grid-cols-[220px_1fr]', className)} {...props}>
    <aside className="border-b border-slate-200 bg-white p-4 md:border-b-0 md:border-r">
      <div className="mb-6 text-lg font-bold">{brand}</div><nav aria-label="Navegação principal" className="flex gap-1 overflow-auto md:flex-col">
        {links.map(link => <a key={link.href} href={link.href} aria-current={link.active ? 'page' : undefined}
          className={cx('flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100', link.active ? 'bg-violet-50 font-semibold text-violet-700' : 'text-slate-600')}>
          {link.icon}{link.label}</a>)}
      </nav>{sidebarFooter && <div className="mt-6 border-t border-slate-100 pt-4">{sidebarFooter}</div>}
    </aside><div className="min-w-0"><div className="border-b border-slate-200 bg-white px-5 py-4">{header ?? 'Visão geral'}</div><main className="p-5">{children}</main></div>
  </div>;
}
