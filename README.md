# ◈ Quembi UI

**Biblioteca visual de componentes e layouts personalizados para React, Vue e Tailwind CSS 4.** Monorepo com website público, galeria interactiva, componentes Free de código aberto e demonstrações conceptuais Premium.

> **Beta:** o website está preparado para deploy pelo **Wrangler + Cloudflare Pages**, com domínio pretendido **https://ui.josequembi.com/**. A publicação real depende de criar o projecto Cloudflare Direct Upload, configurar os GitHub Secrets e associar o domínio. Não assumir que o endereço já está activo. Checkout e distribuição Premium não estão implementados.

**[Guia Wrangler e Cloudflare](docs/DEPLOYMENT.md)** · **[Workflow de deploy](.github/workflows/deploy-cloudflare.yml)** · **[CI](.github/workflows/ci.yml)**

## Funcionalidades

- Website responsivo com navegação móvel, pesquisa, filtros por categoria, licença e framework, previews e exemplos copiáveis.
- Oito componentes Free React e oito implementações correspondentes Vue 3, sob licença MIT.
- Quatro demonstrações **conceptuais** Premium: Analytics Command, Commerce Studio, Auth Experience e Launch Landing. Não são produtos pagos operacionais nem estão disponíveis para compra.
- Documentação de arquitectura, licenças, desenvolvimento, deploy e contribuições.
- GitHub Actions para CI, compilação e deploy de produção com Wrangler após a configuração inicial dos segredos.

## Estrutura

```text
quembi-ui/
├── apps/web/                        # Vite + React + TypeScript + Tailwind CSS 4
├── packages/react/                  # Componentes Free React
├── packages/vue/                    # Componentes Free Vue 3
├── wrangler.toml                    # Cloudflare Pages: nome e pasta pública
├── .github/workflows/ci.yml         # Verificações a cada PR e push na main
├── .github/workflows/deploy-cloudflare.yml # Deploy Wrangler na main
├── docs/                            # Arquitectura, licenças e deploy
└── scripts/                         # Verificações de source, deploy e build
```

## Instalação

Requer Node.js 20.19+ (recomendado Node 22) e npm 10+. Na raiz do repositório:

```bash
git clone https://github.com/jquembi/quembi-ui.git
cd quembi-ui
npm ci
npm run dev
```

Abre `http://localhost:5173`.

| Comando | Acção |
| --- | --- |
| `npm run dev` | Inicia o website local. |
| `npm run verify` | Confere catálogo e componentes Free. |
| `npm run verify:deploy` | Confere a configuração Wrangler e o workflow. |
| `npm run check` | TypeScript e compilação do website. |
| `npm run smoke` | Verifica o HTML, favicon, CSS, JS e exposição de ficheiros sensíveis. |
| `npm run preview` | Mostra o website compilado em local. |
| `npm run cloudflare:whoami` | Consulta a autenticação da CLI Wrangler. |
| `npm run cloudflare:project:create` | Cria uma vez o projecto Pages Direct Upload `quembi-ui`. |
| `npm run deploy:pages` | Valida, compila e publica o website via Wrangler, com autenticação local. |

A CLI Wrangler é obtida por `npx wrangler@4` nos comandos locais e por `cloudflare/wrangler-action@v3` no GitHub Actions. Não é preciso alterar o `package-lock.json` apenas para instalar a CLI no deploy. Antes do deploy manual, inicia sessão com `npx --yes wrangler@4 login` ou configura as credenciais no teu ambiente sem as versionar.

### React no monorepo

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

### Vue 3 no monorepo

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

Os pacotes são **source-first e ainda não publicados no npm**. Para usar `packages/` em projectos externos, configura a compilação React/Vue e a detecção de classes Tailwind. Em projectos Vue usa `@vitejs/plugin-vue` ou equivalente. Exemplo de Tailwind (ajustar caminhos):

```css
@import "tailwindcss";
@source "../../../packages/react/src";
/* Em projectos Vue, usa packages/vue/src. */
```

Não existem ainda pacotes npm públicos, CLI própria da biblioteca ou backend de pagamentos.

## Deploy no Cloudflare Pages com Wrangler

O website é servido na **raiz do domínio**, com `base: '/'` e os recursos em `/assets/`. O Wrangler publica somente `apps/web/dist`, conforme [`wrangler.toml`](wrangler.toml). Não existe workflow de GitHub Pages.

**Configuração inicial do proprietário (uma vez):** cria ou confirma o projecto **Cloudflare Pages Direct Upload** `quembi-ui` (não uses a integração Cloudflare «Connect to Git» para este fluxo). No GitHub, adiciona os secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` em **Settings → Secrets and variables → Actions**. O token deve ter permissão de edição de Cloudflare Pages na conta correcta. Não copies o token para código, issues, chats ou variáveis `VITE_*`.

Abre [Actions → Deploy Cloudflare Pages (Wrangler)](https://github.com/jquembi/quembi-ui/actions/workflows/deploy-cloudflare.yml) e executa **Run workflow → main** após a configuração inicial. Cada novo push na `main` repetirá a validação, compilação e publicação. Se faltarem secrets, o workflow avisa que o deploy foi ignorado, sem publicar. A CI independente continua a verificar o código.

Depois de confirmar o endereço temporário `*.pages.dev` no painel Cloudflare, associa **`ui.josequembi.com`** em **Pages → Custom domains** e confirma DNS e HTTPS. Não alteres o DNS do domínio principal ou os registos de correio. **Um commit no GitHub não cria o projecto Pages nem associa um domínio por si só.**

Para instruções completas, autenticação, criação do projecto por Wrangler, diagnóstico de erros e checklist de produção, consulta **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

## Licenciamento e contacto

- **Free:** componentes deste repositório sob licença MIT (`LICENSE`).
- **Premium:** apenas metadados e demonstrações conceptuais públicas. Produtos pagos e direitos comerciais exigem contrato independente; nunca colocar código Premium privado neste repositório.
- `VITE_SALES_EMAIL` é opcional (`.env.example`), mas qualquer variável `VITE_*` torna-se pública no JavaScript do browser. Nunca guardar tokens, palavras-passe ou chaves de pagamento.

Consulta [LICENSING](docs/LICENSING.md), [ROADMAP](docs/ROADMAP.md), [ARCHITECTURE](docs/ARCHITECTURE.md) e [CONTRIBUTING](CONTRIBUTING.md).

**Proprietário:** `jquembi`. Confirmar domínio, marca, preços e termos comerciais antes do lançamento comercial.
