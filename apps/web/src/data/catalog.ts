export type Framework = 'react' | 'vue';
export type Plan = 'free' | 'premium';
export type Category = 'Elementos' | 'Formulários' | 'Feedback' | 'Layouts' | 'Marketing';
export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  plan: Plan;
  icon: string;
  reactCode?: string;
  vueCode?: string;
}
export const categories: Category[] = ['Elementos', 'Formulários', 'Feedback', 'Layouts', 'Marketing'];
export const catalog: CatalogItem[] = [
  { id: 'button', title: 'Button', description: 'Acções com variantes, tamanhos e estado de carregamento.', category: 'Elementos', plan: 'free', icon: 'cursor',
    reactCode: `import { Button } from '@quembi-ui/react';\n\n<Button variant="primary" size="md">Criar projecto</Button>\n<Button variant="outline">Cancelar</Button>\n<Button loading>A guardar...</Button>`,
    vueCode: `<script setup lang="ts">\nimport { UiButton } from '@quembi-ui/vue';\n</script>\n\n<template>\n  <UiButton variant="primary" size="md">Criar projecto</UiButton>\n  <UiButton variant="outline">Cancelar</UiButton>\n  <UiButton loading>A guardar...</UiButton>\n</template>` },
  { id: 'badge', title: 'Badge', description: 'Estados e etiquetas discretas com cores semânticas.', category: 'Elementos', plan: 'free', icon: 'tag',
    reactCode: `import { Badge } from '@quembi-ui/react';\n\n<Badge tone="success" dot>Publicado</Badge>\n<Badge tone="violet">Novo</Badge>\n<Badge tone="warning">Pendente</Badge>`,
    vueCode: `<script setup lang="ts">\nimport { UiBadge } from '@quembi-ui/vue';\n</script>\n\n<template>\n  <UiBadge tone="success" dot>Publicado</UiBadge>\n  <UiBadge tone="violet">Novo</UiBadge>\n  <UiBadge tone="warning">Pendente</UiBadge>\n</template>` },
  { id: 'card', title: 'Card', description: 'Contentores modulares para informação e acções.', category: 'Elementos', plan: 'free', icon: 'grid',
    reactCode: `import { Card, Badge } from '@quembi-ui/react';\n\n<Card elevated>\n  <Badge tone="success">Activo</Badge>\n  <h3 className="mt-3 font-bold">O meu projecto</h3>\n  <p className="text-sm text-slate-500">Tudo num só lugar.</p>\n</Card>`,
    vueCode: `<script setup lang="ts">\nimport { UiCard, UiBadge } from '@quembi-ui/vue';\n</script>\n\n<template>\n  <UiCard elevated>\n    <UiBadge tone="success">Activo</UiBadge>\n    <h3 class="mt-3 font-bold">O meu projecto</h3>\n    <p class="text-sm text-slate-500">Tudo num só lugar.</p>\n  </UiCard>\n</template>` },
  { id: 'input', title: 'Input', description: 'Campos acessíveis com ajuda e validação de erros.', category: 'Formulários', plan: 'free', icon: 'text',
    reactCode: `import { Input } from '@quembi-ui/react';\n\n<Input label="E-mail" type="email" placeholder="nome@empresa.com" required />\n<Input label="Palavra-passe" type="password" hint="Mínimo de 8 caracteres" />`,
    vueCode: `<script setup lang="ts">\nimport { ref } from 'vue';\nimport { UiInput } from '@quembi-ui/vue';\nconst email = ref('');\n</script>\n\n<template>\n  <UiInput v-model="email" label="E-mail" type="email" required />\n</template>` },
  { id: 'alert', title: 'Alert', description: 'Mensagens de sucesso, aviso, erro e informação.', category: 'Feedback', plan: 'free', icon: 'info',
    reactCode: `import { Alert } from '@quembi-ui/react';\n\n<Alert tone="success" title="Alterações guardadas">\n  O teu projecto está actualizado.\n</Alert>`,
    vueCode: `<script setup lang="ts">\nimport { UiAlert } from '@quembi-ui/vue';\n</script>\n\n<template>\n  <UiAlert tone="success" title="Alterações guardadas">\n    O teu projecto está actualizado.\n  </UiAlert>\n</template>` },
  { id: 'section-header', title: 'Section Header', description: 'Títulos, descrições e acções de cabeçalho.', category: 'Layouts', plan: 'free', icon: 'heading',
    reactCode: `import { SectionHeader, Button } from '@quembi-ui/react';\n\n<SectionHeader eyebrow="Visão geral" title="Os teus projectos"\n  description="Gere tudo a partir daqui."\n  action={<Button>Novo projecto</Button>} />`,
    vueCode: `<script setup lang="ts">\nimport { UiSectionHeader, UiButton } from '@quembi-ui/vue';\n</script>\n\n<template>\n  <UiSectionHeader eyebrow="Visão geral" title="Os teus projectos" description="Gere tudo a partir daqui.">\n    <template #action><UiButton>Novo projecto</UiButton></template>\n  </UiSectionHeader>\n</template>` },
  { id: 'pricing-card', title: 'Pricing Card', description: 'Planos de preços com benefícios e destaque.', category: 'Marketing', plan: 'free', icon: 'layers',
    reactCode: `import { PricingCard } from '@quembi-ui/react';\n\n<PricingCard name="Pro" price="9 900 Kz" description="Para equipas em crescimento."\n  features={['Componentes ilimitados', 'Actualizações']} featured\n  onAction={() => console.log('Plano escolhido')} />`,
    vueCode: `<script setup lang="ts">\nimport { UiPricingCard } from '@quembi-ui/vue';\n</script>\n\n<template>\n  <UiPricingCard name="Pro" price="9 900 Kz" description="Para equipas."\n    :features="['Componentes ilimitados', 'Actualizações']" featured\n    @action="() => console.log('Plano escolhido')" />\n</template>` },
  { id: 'dashboard-shell', title: 'Dashboard Shell', description: 'Layout responsivo com navegação lateral e área principal.', category: 'Layouts', plan: 'free', icon: 'layout',
    reactCode: `import { DashboardShell, Card } from '@quembi-ui/react';\n\n<DashboardShell brand="Workspace"\n  links={[{ label: 'Início', href: '#home', active: true }, { label: 'Projectos', href: '#projects' }]}\n  header="Visão geral">\n  <Card>O teu conteúdo</Card>\n</DashboardShell>`,
    vueCode: `<script setup lang="ts">\nimport { UiDashboardShell, UiCard } from '@quembi-ui/vue';\nconst links = [{ label: 'Início', href: '#home', active: true }, { label: 'Projectos', href: '#projects' }];\n</script>\n\n<template>\n  <UiDashboardShell brand="Workspace" :links="links">\n    <template #header>Visão geral</template>\n    <UiCard>O teu conteúdo</UiCard>\n  </UiDashboardShell>\n</template>` },
  { id: 'analytics', title: 'Analytics Command', description: 'Dashboard de métricas, gráficos e tabelas avançadas.', category: 'Layouts', plan: 'premium', icon: 'chart' },
  { id: 'commerce', title: 'Commerce Studio', description: 'Painel de comércio e gestão de produtos completo.', category: 'Layouts', plan: 'premium', icon: 'shopping' },
  { id: 'auth', title: 'Auth Experience', description: 'Fluxos visuais de autenticação com design editorial.', category: 'Formulários', plan: 'premium', icon: 'lock' },
  { id: 'landing', title: 'Launch Landing', description: 'Landing page de produto com secções de conversão.', category: 'Marketing', plan: 'premium', icon: 'spark' },
];
