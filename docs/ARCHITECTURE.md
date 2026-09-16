# Arquitectura e decisões técnicas

## 1. Âmbito do MVP

O repositório público hospeda **um website estático e bibliotecas Free source-first**. Não há backend, autenticação, pedidos registados, processamento de pagamentos, contas de cliente nem licença Premium automática. As demonstrações Premium são marcadas como conceptuais e não incluem qualquer fonte comercial.

## 2. Camadas

- `apps/web`: Vite + React + TypeScript + Tailwind CSS 4; interface de pesquisa, filtros, documentação e catálogo.
- `apps/web/src/data/catalog.ts`: modelo único do catálogo (id, nome, categoria, licença, descrição, exemplos React/Vue). Adicionar novas entradas aqui.
- `apps/web/src/components/Preview.tsx`: pré-visualizações Free renderizam os **componentes React reais**; Vue tem implementação própria no pacote, mas a pré-visualização do website não monta Vue. Premium usa miniaturas conceptuais.
- `packages/react`: oito componentes React, sem serviços externos, com props tipadas e estilos Tailwind.
- `packages/vue`: oito componentes Vue 3 (SFC), com `defineProps`, slots, modelos e eventos próprios.

## 3. Integração CSS

Tailwind v4 detecta classes nas pastas que são analisadas. O website contém em `src/styles.css`:

```css
@import "tailwindcss";
@source "../../../packages/react/src";
```

Se copiares componentes para outro projecto, garante que Tailwind também analisa a pasta de destino. O Vue exige o plugin Vue na ferramenta de build consumidora. O nome do pacote local é configurado em `packages/*/package.json`, mas estes pacotes não estão publicados no npm.

## 4. Comportamentos e segurança

- Pesquisa é local, insensível a maiúsculas; filtros acumulam categoria, tipo de licença e texto.
- O selector de framework alterna exemplos React e Vue; o visual Free é demonstrado por React para ambos, pois os designs correspondem.
- Pré-visualizações Free são componentes reais; exemplos de código podem ser copiados com `navigator.clipboard` em contextos que o permitam.
- O botão Premium nunca cobra, autentica ou entrega código. Só abre um painel explicativo ou uma mensagem de e-mail após configuração de `VITE_SALES_EMAIL`.
- Não inserir API keys em `VITE_*` nem expor ficheiros do futuro repositório Premium numa pasta pública, bundle, assets ou CI deste projecto.
- Licenças, ficheiros de download e autorização de compras deverão ser impostos **no servidor** por sistema comercial próprio antes de lançar a loja Premium.

## 5. Acessibilidade

Os inputs do pacote têm rótulo e erros ligados por `aria-describedby`. Botões possuem indicação de carregamento; diálogos de preview fecham com Escape ou botão visível e movem o foco inicial. Antes de produção, acrescentar *focus trap* completo, auditoria WCAG, testes automatizados de acessibilidade e percurso por teclado para todas as novas interacções.

## 6. Publicação futura dos pacotes

Para publicar no npm, gerar artefactos distribuíveis ESM/CJS e declarações de tipo para React, compilar/distribuir Vue SFC conforme estratégia definida, definir `exports` para `dist`, `files`, `sideEffects` e pipeline de versões com Changesets. **Não executar `npm publish` na versão source-first do starter.**

## 7. Modelo recomendado de repositórios

```text
jquembi/quembi-ui            # Público: site + Free + demos Premium
jquembi/quembi-ui-premium    # Privado: código comercial + templates
```

Um backend comercial separado poderá implementar autenticação, cobrança, webhooks, direito a licenças, downloads temporários assinados e auditoria. A UI pública não deve ser fonte de verdade para autorização.
