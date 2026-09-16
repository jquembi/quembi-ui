import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Icon } from './components/Icon';
import { Preview } from './components/Preview';
import { catalog, categories, type CatalogItem, type Category, type Framework, type Plan } from './data/catalog';

const repoUrl = 'https://github.com/jquembi/quembi-ui';
const email = import.meta.env.VITE_SALES_EMAIL?.trim() as string | undefined;
const salesEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
type Filter = 'all' | Plan;
type CategoryFilter = 'all' | Category;

function Brand() {
  return <a href="#inicio" className="inline-flex items-center gap-2.5 text-white" aria-label="Quembi UI — página inicial">
    <span className="brand-symbol" aria-hidden="true">Q<span>.</span></span>
    <span className="text-lg font-bold tracking-[-.045em]">quembi<span className="text-[#b7a7ff]">ui</span></span>
  </a>;
}
function Tag({ children }: { children: ReactNode }) {
  return <span className="eyebrow border-violet-300/20 bg-violet-400/10 text-[#c7baff]">{children}</span>;
}
function Header({ onPremium }: { onPremium: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [['#catalogo', 'Componentes'], ['#vantagens', 'Vantagens'], ['#docs', 'Documentação'], ['#licencas', 'Licenças']];
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c0d16]/95 backdrop-blur-xl">
    <div className="container-app flex h-[74px] items-center justify-between gap-5">
      <Brand />
      <nav className="hidden items-center gap-7 text-[13px] text-slate-300 md:flex" aria-label="Navegação principal">
        {links.map(([href, label]) => <a key={href} href={href} className="nav-link focus-visible:rounded focus-visible:outline-2 focus-visible:outline-violet-300">{label}</a>)}
      </nav>
      <div className="hidden items-center gap-3 md:flex">
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="button-outline !min-h-9 !px-3" aria-label="Ver código no GitHub"><Icon name="github" size={17}/> GitHub</a>
        <button type="button" onClick={onPremium} className="header-cta">Premium <Icon name="arrow-up" size={14}/></button>
      </div>
      <button type="button" className="flex size-10 items-center justify-center rounded-lg border border-white/20 text-white md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(value => !value)}><Icon name={open ? 'close' : 'menu'}/></button>
    </div>
    {open && <nav id="mobile-nav" className="container-app flex flex-col gap-2 border-t border-white/10 py-4 text-sm text-slate-200 md:hidden" aria-label="Navegação móvel">
      {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-white/10">{label}</a>)}
      <button type="button" onClick={() => { setOpen(false); onPremium(); }} className="rounded-lg bg-violet-500/20 px-3 py-2 text-left text-violet-200">Ver Premium</button>
    </nav>}
  </header>;
}
function Hero({ onPremium }: { onPremium: () => void }) {
  return <section id="inicio" className="hero-glow relative overflow-hidden border-b border-white/10">
    <div className="container-app grid items-center gap-14 py-20 lg:grid-cols-2 lg:gap-12 lg:py-28">
      <div className="relative z-10 max-w-[650px]">
        <Tag>✦ A TUA BIBLIOTECA DE INTERFACES</Tag>
        <h1 className="mt-7 text-[clamp(3.1rem,6vw,5.5rem)] font-bold leading-[1.04] tracking-[-.07em] text-white">Cria mais.<br/><span className="text-gradient">Desenha melhor.</span></h1>
        <p className="mt-7 max-w-[540px] text-base leading-[1.9] text-slate-300">Componentes personalizáveis com Tailwind CSS para React e Vue. Explora, experimenta e copia os exemplos gratuitos. Descobre os layouts Premium em demonstração.</p>
        <div className="mt-9 flex flex-wrap gap-3"><a href="#catalogo" className="button-primary">Explorar componentes <Icon name="arrow" size={18}/></a><button type="button" onClick={onPremium} className="button-outline">Conhecer o Premium <Icon name="arrow-up" size={16}/></button></div>
        <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-slate-400"><span className="rounded-full border border-white/15 px-3 py-1.5">React</span><span className="rounded-full border border-white/15 px-3 py-1.5">Vue 3</span><span className="rounded-full border border-white/15 px-3 py-1.5">Tailwind CSS 4</span><span className="text-emerald-300">Código Free aberto</span></div>
      </div>
      <div className="hero-window relative rounded-3xl border border-white/15 bg-[#191a29] p-3 shadow-[0_35px_100px_rgba(0,0,0,.5)] sm:p-5" aria-label="Exemplo de componentes Quembi UI">
        <div className="flex items-center justify-between border-b border-white/10 pb-4"><div className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-rose-400"/><span className="size-2.5 rounded-full bg-amber-400"/><span className="size-2.5 rounded-full bg-emerald-400"/></div><span className="text-[11px] text-slate-400">quembi / component-studio</span><Icon name="code" size={16} className="text-violet-300"/></div>
        <div className="grid gap-3 pt-4 sm:grid-cols-2"><div className="preview-area flex min-h-[168px] items-center justify-center rounded-xl p-4"><Preview item={catalog[0]}/></div><div className="preview-area flex min-h-[168px] items-center justify-center rounded-xl p-4"><Preview item={catalog[1]}/></div><div className="preview-area flex min-h-[168px] items-center justify-center rounded-xl p-4"><Preview item={catalog[4]}/></div><div className="preview-area flex min-h-[168px] items-center justify-center rounded-xl p-4"><Preview item={catalog[2]}/></div></div>
        <div className="flex items-center justify-between pt-4 text-[11px] text-slate-400"><span className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-400"/> Pré-visualizações interactivas</span><span>v0.1 · beta</span></div>
      </div>
    </div>
  </section>;
}
function Catalog({ framework, setFramework, onOpen }: { framework: Framework; setFramework: (value: Framework) => void; onOpen: (item: CatalogItem) => void }) {
  const [search, setSearch] = useState('');
  const [plan, setPlan] = useState<Filter>('all');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      const target = event.target;
      const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || (target instanceof HTMLElement && target.isContentEditable);
      if (!typing && !document.querySelector('[aria-modal="true"]') && (event.key === '/' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k'))) {
        event.preventDefault(); searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, []);
  const filtered = useMemo(() => catalog.filter(item =>
    (plan === 'all' || item.plan === plan) && (category === 'all' || item.category === category) &&
    `${item.title} ${item.description} ${item.category}`.toLocaleLowerCase('pt').includes(search.trim().toLocaleLowerCase('pt'))
  ), [search, plan, category]);
  const reset = () => { setSearch(''); setPlan('all'); setCategory('all'); };
  return <section id="catalogo" className="section-spacing bg-[#0e0f19]"><div className="container-app">
    <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><Tag>✦ CATÁLOGO</Tag><h2 className="section-title mt-5">Tudo o que precisas.<br/><span className="text-gradient">Num só lugar.</span></h2><p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">Descobre os componentes Free e explora os conceitos Premium, sem confundir uma demonstração com um produto pronto.</p></div><span className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300">{catalog.length} recursos no catálogo</span></div>
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#171824] p-4 lg:flex-row lg:items-center">
      <label className="relative flex-1"><span className="sr-only">Pesquisar componentes</span><Icon name="search" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input ref={searchRef} type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Pesquisar componentes… (/)" className="h-12 w-full rounded-xl border border-white/15 bg-[#10111b] pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20"/></label>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por licença">{(['all', 'free', 'premium'] as Filter[]).map(value => <button type="button" key={value} aria-pressed={plan === value} onClick={() => setPlan(value)} className={`category-pill ${plan === value ? 'category-pill-active' : 'border-white/10 bg-white/5'}`}>{value === 'all' ? 'Todos' : value === 'free' ? 'Free' : 'Premium'}</button>)}</div>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 p-1" role="group" aria-label="Framework dos exemplos">{(['react', 'vue'] as Framework[]).map(value => <button type="button" key={value} onClick={() => setFramework(value)} aria-pressed={framework === value} className={`rounded-md px-4 py-2 text-xs font-semibold ${framework === value ? 'bg-violet-500/25 text-violet-100' : 'text-slate-400'}`}>{value === 'react' ? 'React' : 'Vue'}</button>)}</div>
    </div>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">{(['all', ...categories] as CategoryFilter[]).map(value => <button type="button" key={value} aria-pressed={category === value} onClick={() => setCategory(value)} className={`category-pill ${category === value ? 'category-pill-active' : ''}`}>{value === 'all' ? 'Todas as categorias' : value}</button>)}</div><p role="status" aria-live="polite" className="text-xs text-slate-400">{filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}</p></div>
    {filtered.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map(item => <article key={item.id} className="catalog-card group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#171824]"><div className="preview-area relative flex min-h-[220px] items-center justify-center overflow-hidden p-5"><span className="absolute left-4 top-4 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600">{item.category}</span><div className="flex w-full justify-center transition-transform group-hover:scale-[1.03]"><Preview item={item}/></div></div><div className="flex flex-1 flex-col p-5"><div className="flex items-start justify-between gap-3"><h3 className="text-base font-bold text-white">{item.title}</h3><span className={`rounded-md px-2 py-1 text-[10px] font-bold ${item.plan === 'free' ? 'bg-emerald-400/10 text-emerald-300' : 'bg-violet-400/10 text-violet-300'}`}>{item.plan.toUpperCase()}</span></div><p className="mt-2 flex-1 text-xs leading-6 text-slate-400">{item.description}</p><button type="button" onClick={() => onOpen(item)} className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/15 text-xs font-semibold text-white transition hover:border-violet-400 hover:bg-violet-400/10 focus-visible:outline-2 focus-visible:outline-violet-300">{item.plan === 'free' ? 'Experimentar e ver código' : 'Ver demonstração'} <Icon name="arrow" size={15}/></button></div></article>)}</div> : <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 p-6 text-center"><p className="text-lg font-semibold text-white">Nenhum componente encontrado.</p><p className="mt-2 text-sm text-slate-400">Experimenta outra pesquisa ou remove os filtros.</p><button type="button" onClick={reset} className="button-outline mt-5">Limpar filtros</button></div>}
  </div></section>;
}
function Benefits() {
  const features = [['bolt', 'Menos repetição', 'Parte de componentes prontos a personalizar, sem abdicar do controlo.'], ['grid', 'Design consistente', 'Mantém padrões visuais e estados coerentes entre os teus projectos.'], ['code', 'React + Vue', 'Duas implementações da mesma linguagem visual.'], ['shield', 'Licenças claras', 'Código Free sob MIT; Premium distribuído separadamente.']] as const;
  return <section id="vantagens" className="section-spacing border-y border-white/10 bg-[#11121e]"><div className="container-app"><Tag>✦ FEITO PARA CRIADORES</Tag><h2 className="section-title mb-10 mt-5">Uma base sólida.<br/><span className="text-gradient">A tua identidade.</span></h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{features.map(([icon, title, description]) => <div key={title} className="benefit-card rounded-2xl border border-white/10 bg-white/[.03] p-6"><span className="mb-6 flex size-11 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300"><Icon name={icon} size={21}/></span><h3 className="font-bold text-white">{title}</h3><p className="mt-3 text-xs leading-6 text-slate-400">{description}</p></div>)}</div></div></section>;
}
function Docs({ framework, setFramework }: { framework: Framework; setFramework: (value: Framework) => void }) {
  const [copyState, setCopyState] = useState<'idle' | 'done' | 'error'>('idle');
  const code = framework === 'react' ? "import { Button } from '@quembi-ui/react';\n\nexport default function Example() {\n  return <Button>Começar</Button>;\n}" : "<script setup lang=\"ts\">\nimport { UiButton } from '@quembi-ui/vue';\n</script>\n\n<template>\n  <UiButton>Começar</UiButton>\n</template>";
  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopyState('done'); } catch { setCopyState('error'); } };
  return <section id="docs" className="section-spacing bg-[#0c0d16]"><div className="container-app grid items-center gap-10 lg:grid-cols-2"><div><Tag>✦ DOCUMENTAÇÃO</Tag><h2 className="section-title mt-5">Do catálogo<br/><span className="text-gradient">ao teu projecto.</span></h2><p className="mt-6 max-w-lg text-sm leading-8 text-slate-400">Os exemplos funcionam dentro deste monorepo. Para usar componentes Free num projecto externo, copia o código de <code className="text-violet-200">packages/</code> e configura o Tailwind para analisar esses ficheiros. Os pacotes ainda não estão publicados no npm.</p><a href={`${repoUrl}#requisitos-e-instalação`} target="_blank" rel="noopener noreferrer" className="button-outline mt-7">Ler instruções no GitHub <Icon name="external" size={16}/></a></div><div className="overflow-hidden rounded-2xl border border-white/10 bg-[#171824]"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4"><div className="flex gap-1" role="group" aria-label="Seleccionar linguagem">{(['react', 'vue'] as Framework[]).map(value => <button key={value} type="button" aria-pressed={framework === value} onClick={() => { setFramework(value); setCopyState('idle'); }} className={`rounded-lg px-3 py-2 text-xs ${framework === value ? 'bg-violet-400/15 text-violet-200' : 'text-slate-400'}`}>{value === 'react' ? 'React' : 'Vue'}</button>)}</div><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-white"><Icon name={copyState === 'done' ? 'check' : 'copy'} size={14}/>{copyState === 'done' ? 'Copiado' : copyState === 'error' ? 'Cópia indisponível' : 'Copiar'}</button></div><pre className="code-area min-h-[230px] overflow-auto p-5 text-xs leading-7 text-[#d5d0ef]"><code>{code}</code></pre></div></div></section>;
}
function Licensing({ onPremium }: { onPremium: () => void }) {
  return <section id="licencas" className="section-spacing border-t border-white/10 bg-[#10111c]"><div className="container-app"><div className="mb-10 text-center"><Tag>✦ LICENCIAMENTO</Tag><h2 className="section-title mt-5">Começa gratuitamente.<br/><span className="text-gradient">Expande quando precisares.</span></h2></div><div className="mx-auto grid max-w-[860px] gap-5 md:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-[#171824] p-7"><span className="text-xs font-semibold text-emerald-300">FREE</span><h3 className="mt-4 text-3xl font-bold text-white">Código aberto</h3><p className="mt-4 text-sm leading-7 text-slate-400">8 componentes com implementações React e Vue disponíveis sob licença MIT.</p><a href={`${repoUrl}/tree/main/packages`} target="_blank" rel="noopener noreferrer" className="button-outline mt-8 w-full">Ver código Free <Icon name="external" size={15}/></a></div><div className="rounded-2xl border border-violet-400/30 bg-gradient-to-b from-[#29213f] to-[#171824] p-7"><span className="text-xs font-semibold text-violet-200">PREMIUM · EM PREPARAÇÃO</span><h3 className="mt-4 text-3xl font-bold text-white">Licença comercial</h3><p className="mt-4 text-sm leading-7 text-slate-300">4 demonstrações conceptuais. Código comercial, pagamentos e entrega ainda não estão disponíveis no website.</p><button type="button" onClick={onPremium} className="button-primary mt-8 w-full">Consultar condições <Icon name="arrow" size={16}/></button></div></div></div></section>;
}
function Modal({ item, onClose, framework, setFramework }: { item: CatalogItem | null; onClose: () => void; framework: Framework; setFramework: (value: Framework) => void }) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) { event.preventDefault(); return; }
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.removeEventListener('keydown', keydown); document.body.style.overflow = oldOverflow; previous?.focus(); };
  }, [onClose]);
  const code = item ? (framework === 'react' ? item.reactCode : item.vueCode) : undefined;
  const sourceName = item ? ({ 'section-header': 'SectionHeader', 'pricing-card': 'PricingCard', 'dashboard-shell': 'DashboardShell' } as Record<string, string>)[item.id] ?? `${item.id[0].toUpperCase()}${item.id.slice(1)}` : '';
  const source = item ? `${repoUrl}/blob/main/packages/${framework}/src/${framework === 'react' ? `${sourceName}.tsx` : `components/Ui${sourceName}.vue`}` : '';
  const contact = salesEmail ? `mailto:${salesEmail}?subject=${encodeURIComponent(`Quembi UI Premium — ${item?.title ?? 'Informações'}`)}` : null;
  const copy = async () => { if (!code) return; try { await navigator.clipboard.writeText(code); setCopied(true); } catch { setCopied(false); } };
  return <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#070710]/90 p-3 backdrop-blur-md sm:p-6" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" className="flex max-h-[90dvh] w-full max-w-[820px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#191a29] shadow-2xl outline-none"><div className="flex items-start justify-between gap-4 border-b border-white/10 p-5"><div><span className={`text-[10px] font-bold ${item?.plan === 'premium' ? 'text-violet-300' : 'text-emerald-300'}`}>{item?.plan === 'premium' ? 'PREMIUM · DEMONSTRAÇÃO' : 'FREE · MIT'}</span><h2 id="modal-title" className="mt-1 text-xl font-bold text-white">{item?.title ?? 'Quembi UI Premium'}</h2><p id="modal-description" className="mt-2 text-xs leading-6 text-slate-400">{item?.description ?? 'Demonstrações conceptuais. Os produtos comerciais ainda não estão disponíveis para compra ou entrega automática.'}</p></div><button type="button" onClick={onClose} aria-label="Fechar janela" className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/10"><Icon name="close" size={19}/></button></div>
    {item?.plan === 'free' && <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3"><div className="flex gap-1" role="group" aria-label="Vista do componente"><button type="button" aria-pressed={tab === 'preview'} onClick={() => setTab('preview')} className={`rounded-lg px-3 py-2 text-xs ${tab === 'preview' ? 'bg-violet-400/20 text-white' : 'text-slate-400'}`}>Pré-visualização</button><button type="button" aria-pressed={tab === 'code'} onClick={() => setTab('code')} className={`rounded-lg px-3 py-2 text-xs ${tab === 'code' ? 'bg-violet-400/20 text-white' : 'text-slate-400'}`}>Exemplo de código</button></div><div className="flex gap-1" role="group" aria-label="Framework">{(['react', 'vue'] as Framework[]).map(value => <button type="button" key={value} aria-pressed={framework === value} onClick={() => { setFramework(value); setCopied(false); }} className={`rounded-lg px-3 py-2 text-xs ${framework === value ? 'bg-violet-400/20 text-white' : 'text-slate-400'}`}>{value === 'react' ? 'React' : 'Vue'}</button>)}</div></div>}
    <div className="min-h-0 flex-1 overflow-auto">{item && (tab === 'preview' || item.plan === 'premium') ? <div className="preview-area flex min-h-[300px] items-center justify-center p-5 sm:min-h-[380px] sm:p-10"><Preview item={item} expanded/></div> : item ? <pre className="code-area min-h-[300px] overflow-auto p-5 text-xs leading-7 text-[#d5d0ef]"><code>{code}</code></pre> : <div className="p-8 text-sm leading-8 text-slate-300">O catálogo Premium apresenta apenas conceitos visuais. As licenças e os produtos completos serão disponibilizados separadamente.</div>}</div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5"><p className="max-w-[430px] text-xs leading-6 text-slate-400">{item?.plan === 'free' ? 'Copia o exemplo ou consulta a implementação completa no GitHub.' : 'Não são processados pagamentos nem disponibilizado código comercial neste website.'}</p><div className="flex flex-wrap gap-2">{item?.plan === 'free' ? <><a href={source} target="_blank" rel="noopener noreferrer" className="button-outline !min-h-10">Ver fonte <Icon name="external" size={15}/></a><button type="button" onClick={copy} className="button-primary !min-h-10"><Icon name={copied ? 'check' : 'copy'} size={15}/>{copied ? 'Copiado' : 'Copiar exemplo'}</button></> : contact ? <a href={contact} className="button-primary !min-h-10">Pedir informações <Icon name="arrow" size={15}/></a> : <span className="rounded-lg border border-white/10 p-3 text-xs text-amber-100">Contacto comercial por configurar</span>}</div></div>
  </section></div>;
}
export default function App() {
  const [framework, setFramework] = useState<Framework>('react');
  const [selection, setSelection] = useState<CatalogItem | null | undefined>(undefined);
  const close = () => setSelection(undefined);
  const openPremium = () => setSelection(null);
  return <><Header onPremium={openPremium}/><main><Hero onPremium={openPremium}/><Catalog framework={framework} setFramework={setFramework} onOpen={setSelection}/><Benefits/><Docs framework={framework} setFramework={setFramework}/><Licensing onPremium={openPremium}/></main><footer className="border-t border-white/10 bg-[#0c0d16]"><div className="container-app flex flex-wrap items-center justify-between gap-6 py-9"><div><Brand/><p className="mt-3 text-xs text-slate-400">Componentes para criar com liberdade.</p></div><div className="flex flex-wrap gap-5 text-xs text-slate-400"><a href="#catalogo">Catálogo</a><a href="#docs">Documentação</a><a href="#licencas">Licenças</a><a href={repoUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div><p className="w-full border-t border-white/10 pt-6 text-[11px] text-slate-500">© 2026 Quembi UI · Código Free sob licença MIT. Premium sujeito a licença separada.</p></div></footer>{selection !== undefined && <Modal item={selection} onClose={close} framework={framework} setFramework={setFramework}/>}</>;
}
