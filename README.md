# ◈ Quembi UI

**Biblioteca visual de componentes e layouts personalizados para React, Vue e Tailwind CSS 4.** Um monorepo com website público, galeria interactiva, componentes Free de código aberto e demonstrações de produtos Premium.

> Estado: **starter funcional em desenvolvimento (beta)**. Este pacote é entregue como código-fonte inicial; o repositório remoto, a publicação do site, a plataforma de pagamentos e o fornecimento dos produtos Premium não estão activados automaticamente.

## O que já está implementado

- Website responsivo com identidade visual, navegação móvel, catálogo pesquisável e filtros por categoria, licença e framework.
- Pré-visualização interactiva de oito componentes Free escritos em React e implementações correspondentes em Vue 3.
- Exemplos de utilização React/Vue que podem ser copiados; o código-fonte completo dos componentes Free encontra-se em `packages/`.
- Quatro demonstrações **conceptuais** Premium: Analytics Command, Commerce Studio, Auth Experience e Launch Landing. As imagens são construídas por markup de apresentação; **não são produtos Premium funcionais**.
- Secções de documentação, benefícios, licenças, contacto comercial configurável, indicação de licença e suporte a teclado.
- Workflow de validação CI, configuração para Cloudflare Pages e documentação de arquitectura, contribuição, licenças e lançamento.

## Estrutura

```text
quembi-ui/
├── apps/
│   └── web/                 # Website Vite + React + TS + Tailwind 4
│       ├── public/
│       └── src/
│           ├── components/  # Galeria e iconografia
│           └── data/        # Catálogo e snippets React/Vue
├── packages/
│   ├── react/               # 8 componentes Free React
│   └── vue/                 # 8 componentes Free Vue 3
├── docs/
│   ├── ARCHITECTURE.md
│   ├── LICENSING.md
│   ├── ROADMAP.md
│   └── DEPLOYMENT.md
├── .github/workflows/ci.yml
└── .env.example
```

## Requisitos e instalação

- Node.js **20.19+** ou 22+; npm 10+.
- Internet para descarregar dependências na primeira instalação.

```bash
git clone https://github.com/jquembi/quembi-ui.git
cd quembi-ui
npm install
npm run dev
```

**Se ainda não criaste o repositório:** extrai o ZIP, abre a pasta `quembi-ui` e executa os três comandos começando por `npm install`. O clone acima só funcionará depois da publicação no GitHub.

Abre `http://localhost:5173`. Outros comandos:

```bash
npm run typecheck       # TypeScript
npm run build           # Cria apps/web/dist
npm run preview         # Pré-visualiza o website compilado
npm run verify          # Verificações de integridade do projecto
```

### Como utilizar o React no monorepo

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

### Como utilizar o Vue no monorepo

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

São bibliotecas **source-first, ainda não publicadas no npm**. Integrações Vue externas precisam de `@vitejs/plugin-vue` (ou ferramenta equivalente). React/Vue devem compilar os ficheiros TypeScript/SFC e incluir as pastas de origem na detecção Tailwind:

```css
@import "tailwindcss";
@source "../../../packages/react/src";
/* Numa aplicação Vue, ajuste o caminho e use packages/vue/src. */
```

Não existe ainda uma CLI `npx`, pacote público ou pacote Premium para instalação automática. A proposta de evolução está em `docs/ROADMAP.md`.

## Licenças Free e Premium

- **Free**: ficheiros deste repositório distribuídos sob licença MIT (consulta `LICENSE`).
- **Premium**: apenas metadados e demonstrações conceptuais públicas. Código e produtos privados exigem licença comercial independente e **não devem ser colocados no repositório público**.
- Nenhuma modalidade de pagamento, criação de conta, verificação de compras ou entrega de produtos pagos está implementada neste starter. Consulta `docs/LICENSING.md`.

## Contacto comercial (opcional)

```bash
cp .env.example .env
# Edita .env e configura VITE_SALES_EMAIL=teu-email@dominio.com
npm run dev
```

Sem `VITE_SALES_EMAIL` válido, o website informa que o contacto está por configurar. Variáveis `VITE_*` ficam **expostas no bundle do browser**: nunca coloques tokens, chaves de pagamento ou palavras-passe ali.

## Publicar no GitHub

Cria um repositório **público, vazio, sem README automático**, chamado `quembi-ui` na conta `jquembi` e depois, na pasta descompactada:

```bash
git init
git add .
git commit -m "feat: initial Quembi UI monorepo"
git branch -M main
git remote add origin https://github.com/jquembi/quembi-ui.git
git push -u origin main
```

> Se já tiveres um remoto `origin`, ajusta-o com `git remote set-url origin ...` em vez de adicioná-lo de novo. Confirma o nome e o proprietário reais do repositório antes do push. Repositórios privados com o código Premium devem ficar separados.

## Website / Cloudflare Pages

Importa o repositório no Cloudflare Pages. Comandos para o monorepo:

| Campo | Valor |
| --- | --- |
| Root directory | `/` (raiz do repositório) |
| Build command | `npm run build` |
| Build output directory | `apps/web/dist` |
| Node | 22+ |

Consulta `docs/DEPLOYMENT.md` para os passos completos. Não existe backend nesta versão; galeria e documentação funcionam como site estático.

## Qualidade e contribuições

As PRs para a biblioteca Free são bem-vindas. O workflow de CI executa verificação de catálogo, TypeScript e build. Ver `CONTRIBUTING.md` e `docs/ARCHITECTURE.md`.

**Autor / organização:** projecto inicial preparado para a conta `jquembi`. Nome, marca, preços, domínio e termos comerciais são configurações propostas, não dados empresariais confirmados.
