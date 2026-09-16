# ◈ Quembi UI

**Biblioteca visual de componentes e layouts personalizados para React, Vue e Tailwind CSS 4.** Monorepo com website público, galeria interactiva, componentes Free de código aberto e demonstrações conceptuais Premium.

> **Beta:** o código está publicado no GitHub. A hospedagem escolhida é **Cloudflare Pages**, com destino **https://ui.josequembi.com/**. O website ainda depende da criação do projecto Pages, da ligação ao GitHub e da validação do domínio na conta Cloudflare. Não confundir URL pretendido com site já publicado. Checkout e distribuição Premium ainda não estão implementados.

**[Guia de deploy Cloudflare Pages](docs/DEPLOYMENT.md)** · **[Repositório](https://github.com/jquembi/quembi-ui)** · **[CI](.github/workflows/ci.yml)**

## O que está implementado

- Website responsivo com navegação móvel, pesquisa, filtros por categoria, licença e framework, previews e exemplos copiáveis.
- Oito componentes Free em React e oito implementações correspondentes em Vue 3, sob licença MIT.
- Quatro demonstrações **conceptuais** Premium: Analytics Command, Commerce Studio, Auth Experience e Launch Landing. **Não são produtos Premium funcionais nem estão disponíveis para compra.**
- Documentação de arquitectura, licenças, desenvolvimento, deploy e contribuição.
- GitHub Actions para integração contínua e build estático; deploy automático pela Cloudflare após o proprietário configurar a integração Git.

## Estrutura

```text
quembi-ui/
├── apps/web/                   # Vite + React + TypeScript + Tailwind 4
├── packages/react/             # Componentes Free React
├── packages/vue/               # Componentes Free Vue 3
├── docs/                       # Arquitectura, licenças e deploy
├── scripts/                    # Verificação e smoke tests
└── .github/workflows/ci.yml    # CI, sem deploy duplicado no GitHub Pages
```

## Instalação e desenvolvimento

Requer Node.js 20.19+ (recomendado 22+) e npm 10+. Na raiz do repositório:

```bash
git clone https://github.com/jquembi/quembi-ui.git
cd quembi-ui
npm ci
npm run dev
```

Abre `http://localhost:5173`. Comandos disponíveis:

```bash
npm run verify       # Integridade do catálogo e estrutura
npm run typecheck    # TypeScript
npm run build        # Compila o website em apps/web/dist
npm run smoke        # Confere HTML e assets depois do build
npm run check        # TypeScript + build
npm run preview      # Pré-visualização local da compilação
```

### React (dentro do monorepo)

```tsx
import { Button, Badge, Input } from '@quembi-ui/react';

export function Example() {
  return <div className="space-y-4">
    <Badge tone="success">Activo</Badge>
    <Input label="E-mail" type="email" />
    <Button>Guardar</Button>
  </div>;
}
```

### Vue 3 (dentro do monorepo)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { UiButton, UiInput } from '@quembi-ui/vue';
const email = ref('');
</script>
<template>
  <UiInput v-model="email" label="E-mail" type="email" />
  <UiButton>Guardar</UiButton>
</template>
```

Os pacotes são **source-first e ainda não publicados no npm**: para usar os componentes de `packages/` em projectos externos, configura o compilador React/Vue e a detecção de classes Tailwind. Para Vue, usa `@vitejs/plugin-vue` ou equivalente. Exemplo Tailwind com caminho ajustado ao projecto:

```css
@import "tailwindcss";
@source "../../../packages/react/src";
/* Em Vue usa packages/vue/src. */
```

Ainda não existem pacotes npm públicos, CLI de instalação ou backend de pagamentos.

## Deploy Cloudflare Pages — ui.josequembi.com

O website foi adaptado para ser servido na **raiz do subdomínio**, com caminhos de recursos a começar em `/`, e não no antigo subcaminho `/quembi-ui/` do GitHub Pages. O workflow de GitHub Pages foi removido para evitar builds falhados ou hospedagem duplicada.

O titular da conta Cloudflare precisa **uma única vez** de ligar o GitHub e criar o projecto Pages em **Workers & Pages → Create → Pages → Connect to Git**, seleccionando `jquembi/quembi-ui` e a `main`. Usa:

| Campo | Valor |
| --- | --- |
| Root directory | Raiz do monorepo |
| Build command | `npm ci && npm run verify && npm run check && npm run smoke` |
| Build output directory | `apps/web/dist` |
| Production branch | `main` |
| Node | `NODE_VERSION=22` se o ambiente não usar Node 22 |

Confirma primeiro o endereço `*.pages.dev` atribuído pelo painel. Depois, em **Custom domains**, associa `ui.josequembi.com` e segue as instruções DNS/HTTPS. A associação não pode ser concluída através de um commit no GitHub sem acesso à conta Cloudflare. Com a integração Git activa, cada novo commit na `main` desencadeia automaticamente um novo deploy.

O guia completo, incluindo diagnóstico DNS, SSL e checklist, está em [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Licenciamento e contacto

- **Free:** componentes deste repositório sob licença MIT (`LICENSE`).
- **Premium:** apenas metadados e demonstrações públicas. Os produtos pagos e respectivos direitos requerem contrato independente; não adicionar código Premium nem segredos a este repositório.
- `VITE_SALES_EMAIL` é opcional (`.env.example`). Variáveis `VITE_*` são públicas no JavaScript do browser: **nunca** guardar aí palavras-passe, tokens ou chaves de pagamento.

Consulta [LICENSING](docs/LICENSING.md), [ROADMAP](docs/ROADMAP.md), [ARCHITECTURE](docs/ARCHITECTURE.md) e [CONTRIBUTING](CONTRIBUTING.md).

**Proprietário do repositório:** `jquembi`. Confirmar configuração do domínio, marca, preços e termos comerciais antes do lançamento comercial.
