# ◈ Quembi UI

**Biblioteca visual de componentes e layouts personalizados para React, Vue e Tailwind CSS 4.** Monorepo com website público, galeria interactiva, componentes Free de código aberto e demonstrações conceptuais Premium.

> **Beta:** o código está no GitHub. O website está preparado para GitHub Pages, mas a primeira publicação depende de activar **Settings → Pages → Source: GitHub Actions** na conta proprietária. O checkout e a distribuição dos produtos Premium ainda não estão implementados.

**Website (após activar o Pages): https://jquembi.github.io/quembi-ui/** · [Guia GitHub Pages](docs/GITHUB_PAGES.md) · [Workflow de publicação](.github/workflows/pages.yml)

## O que está implementado

- Website responsivo com navegação móvel, pesquisa, filtros por categoria, licença e framework, previews e exemplos copiáveis.
- Oito componentes Free em React e oito implementações correspondentes em Vue 3, sob licença MIT.
- Quatro demonstrações **conceptuais** Premium: Analytics Command, Commerce Studio, Auth Experience e Launch Landing. **Não são produtos Premium funcionais nem estão disponíveis para compra.**
- Documentação de arquitectura, licenças, desenvolvimento, deploy e contribuição.
- GitHub Actions de integração contínua e deploy automático do website estático, após activação inicial do Pages.

## Estrutura

```text
quembi-ui/
├── apps/web/                   # Vite + React + TypeScript + Tailwind 4
├── packages/react/             # Componentes Free React
├── packages/vue/               # Componentes Free Vue 3
├── docs/                       # Arquitectura, licenças e deploy
├── scripts/                    # Verificação e smoke tests
└── .github/workflows/          # CI e GitHub Pages
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

Os pacotes são **source-first e privados para publicação npm** nesta fase: copiar os ficheiros de `packages/` para projectos externos requer configurar o compilador React/Vue e a detecção de classes Tailwind. Para Vue, usa `@vitejs/plugin-vue` ou equivalente. Exemplo Tailwind, ajustando o caminho ao projecto:

```css
@import "tailwindcss";
@source "../../../packages/react/src";
/* Em Vue usa packages/vue/src. */
```

Não existem ainda pacotes npm públicos, CLI de instalação ou backend de pagamentos.

## GitHub Pages — hospedagem inicial

O deployment é feito pelo [workflow Pages](.github/workflows/pages.yml) na `main`. O site fica alojado sob `/quembi-ui/` e a compilação configura automaticamente o `base` do Vite e o favicon. O proprietário precisa **uma única vez** de seleccionar **GitHub Actions** em [Settings → Pages](https://github.com/jquembi/quembi-ui/settings/pages); a integração usada para alterar o código não consegue activar essa opção nas definições da conta.

Depois da activação, cada push à `main` acciona a compilação e publicação do website. O workflow publica apenas `apps/web/dist`; não publica o código-fonte privado Premium. Consulta [docs/GITHUB_PAGES.md](docs/GITHUB_PAGES.md) para activação, URL e resolução de problemas.

Para testar os mesmos caminhos em local:

```bash
# PowerShell: $env:GITHUB_PAGES='true'; npm run check; npm run smoke
GITHUB_PAGES=true npm run check
GITHUB_PAGES=true npm run smoke
```

O [Cloudflare Pages](docs/DEPLOYMENT.md) fica como alternativa futura. O site é estático nesta versão.

## Licenciamento e contacto

- **Free:** componentes deste repositório sob licença MIT (`LICENSE`).
- **Premium:** apenas metadados e demonstrações públicas. Os produtos pagos e respectivos direitos requerem contrato independente; não adicionar código Premium nem segredos a este repositório.
- `VITE_SALES_EMAIL` é opcional (`.env.example`). Variáveis `VITE_*` são públicas no JavaScript do browser: **nunca** guardar aí palavras-passe, tokens ou chaves de pagamento.

Consulta [LICENSING](docs/LICENSING.md), [ROADMAP](docs/ROADMAP.md), [ARCHITECTURE](docs/ARCHITECTURE.md) e [CONTRIBUTING](CONTRIBUTING.md).

**Proprietário do repositório:** `jquembi`. Marca, domínio próprio, preços e termos comerciais dependem de validação antes do lançamento comercial.
