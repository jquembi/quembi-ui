# Deploy do website

## Cloudflare Pages via integração GitHub

1. Cria o repositório e envia os ficheiros, conforme `README.md`.
2. No painel Cloudflare, cria um projecto Pages e liga-o ao GitHub.
3. Selecciona `jquembi/quembi-ui` ou o proprietário/nome real que escolheste.
4. Define Root directory como raiz (`/`, ou em branco conforme o painel), Build command `npm run build` e Build output directory `apps/web/dist`.
5. Usa Node.js 22+ no ambiente de build. `VITE_SALES_EMAIL` é opcional e público: serve apenas para preencher o destino `mailto:`.
6. Publica e testa pesquisa, previews, menus, exemplos, botão Premium e navegação móvel.

Não existe domínio personalizado configurado. A URL Pages fornecida ao publicares pode ser posteriormente ligada a um domínio teu.

## Deploy manual

```bash
npm install
npm run check
```

Publica **apenas** o conteúdo de `apps/web/dist` como website estático. Não publiques a raiz do monorepo nem `packages/` como ficheiros HTTP directos.

## Segurança e protecção comercial

A publicação pública não pode conter pacotes comerciais, artefactos Premium ou segredos no bundle. Usar repositório Premium privado e entrega autenticada num serviço independente. Vite coloca variáveis `VITE_*` no JavaScript público, logo não são apropriadas para tokens.

## Checklist de produção

- [ ] Verificar direitos de utilização da marca e propriedade do domínio.
- [ ] Introduzir política de privacidade e termos reais quando forem recolhidos dados.
- [ ] Completar testes automatizados e de acessibilidade.
- [ ] Gerar `package-lock.json` com `npm install` e migrar CI para `npm ci`.
- [ ] Testar build, navegação e formulários em mobile.
- [ ] Configurar canal de vendas e contrato Premium antes de anunciar checkout.
