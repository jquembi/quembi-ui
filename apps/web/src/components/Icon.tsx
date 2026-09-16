import type { ReactNode, SVGProps } from 'react';
export type IconName = 'arrow' | 'arrow-up' | 'search' | 'copy' | 'check' | 'close' | 'menu' | 'code' | 'eye' | 'lock' | 'spark' | 'filter' | 'cursor' | 'tag' | 'grid' | 'text' | 'info' | 'heading' | 'layers' | 'layout' | 'chart' | 'shopping' | 'github' | 'external' | 'bolt' | 'shield' | 'globe';
export function Icon({ name, size = 20, ...props }: Omit<SVGProps<SVGSVGElement>, 'name'> & { name: IconName; size?: number }) {
  const path: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    'arrow-up': <><path d="m7 17 10-10"/><path d="M8 7h9v9"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    check: <path d="m5 12 4 4L19 6"/>, close: <path d="M6 6l12 12M18 6 6 18"/>, menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    code: <><path d="m8 8-4 4 4 4m8-8 4 4-4 4"/><path d="m14 5-4 14"/></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    spark: <><path d="m12 2 2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3L12 2Z"/></>,
    filter: <><path d="M4 7h16M7 12h10M10 17h4"/></>,
    cursor: <><path d="m5 3 14 9-7 1-3 7-4-17Z"/></>,
    tag: <><path d="M3 12V4h8l10 10-7 7L3 12Z"/><circle cx="8" cy="8" r="1"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    text: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 10h10M7 14h6"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
    heading: <path d="M4 5v14M20 5v14M4 12h16M9 5h6M9 19h6"/>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/></>,
    layout: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M9 9h12"/></>,
    chart: <><path d="M3 3v18h18M7 17v-5h3v5M12 17V7h3v10M17 17V5h3v12"/></>,
    shopping: <><path d="M3 5h2l2 11h12l2-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
    github: <><path d="M9 19c-4 1-4-2-6-2m12 4v-3.3a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 6a4.3 4.3 0 0 0-.1-3S17.2 2.7 15 4a11 11 0 0 0-6 0C6.8 2.7 5.7 3 5.7 3a4.3 4.3 0 0 0-.1 3 4.7 4.7 0 0 0-1.3 3.4c0 4.7 2.8 5.7 5.5 6A3 3 0 0 0 9 17.7V21"/></>,
    external: <><path d="M13 4h7v7M20 4l-9 9"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></>,
    bolt: <path d="m13 2-9 12h7l-1 8 10-12h-7l0-8Z"/>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18M12 3c5 5 5 13 0 18"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{path[name]}</svg>;
}
