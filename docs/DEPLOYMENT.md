# Publicação do Quembi UI com Wrangler + Cloudflare Pages

**Domínio pretendido:** `https://ui.josequembi.com/` · **Repositório:** `jquembi/quembi-ui` · **Branch:** `main` · **Projecto Pages:** `quembi-ui`.

**Estado:** o código de deploy e a CI estão configurados; a criação do projecto Cloudflare, os segredos do GitHub e a associação de `ui.josequembi.com` requerem acesso do titular às contas. Não assumas que o domínio ou o site estão activos sem confirmar o primeiro deploy.

## Arquitectura

O site Vite/React/Tailwind é compilado com `base: '/'` e gera **apenas** `apps/web/dist`. O ficheiro [`wrangler.toml`](../wrangler.toml), na raiz do monorepo, define o projecto Cloudflare Pages e a pasta de publicação. O workflow [`.github/workflows/deploy-cloudflare.yml`](../.github/workflows/deploy-cloudflare.yml) executa validação, compilação, smoke test e `wrangler pages deploy` em cada push na `main`, ou manualmente com `workflow_dispatch`. A CI independente também valida a configuração.

**Importante: usa um projecto Cloudflare Pages de _Direct Upload_ para o fluxo Wrangler.** Não configures simultaneamente a integração automática Cloudflare ↔ GitHub no mesmo projecto: isso introduz deploys concorrentes e o modo Git-integrated pode não aceitar a publicação Direct Upload. Se já criaste um projecto ligado ao GitHub, confirma o método de deploy no painel e cria um projecto Direct Upload separado, se necessário, antes de mudar o domínio. Não desvincules um site activo sem planear a migração.

## 1. Preparar o projecto Pages (uma vez)

Escolhe **uma** das opções seguintes:

**Pelo painel:** Cloudflare → **Workers & Pages → Create → Pages → Direct Upload** (os nomes podem variar). Cria um projecto com o nome `quembi-ui`, se disponível. Não ligues o repositório pelo assistente «Connect to Git». O deploy dos ficheiros será feito pelo Wrangler, não por upload manual de um ZIP.

**Pelo terminal, opcional:** na raiz do repositório, inicia sessão na conta Cloudflare e cria o projecto:

```bash
npm ci
npx --yes wrangler@4 login
npm run cloudflare:whoami
npm run cloudflare:project:create
```

O comando de criação corresponde a `wrangler pages project create quembi-ui --production-branch=main`. Se `quembi-ui` já existir na tua conta, **não cries outro projecto**: confirma que é Direct Upload e reutiliza-o. Se o nome for diferente, altera-o de forma consistente no `wrangler.toml`, nos scripts e no workflow antes de continuar.

Confirma no painel da Cloudflare o URL `*.pages.dev` efectivamente atribuído: não adivinhes o endereço.

## 2. Configurar credenciais GitHub Actions (uma vez)

Cria um **Cloudflare API Token** restrito à conta responsável pelo projecto, com permissão **Cloudflare Pages: Edit** (ou a permissão equivalente actualmente indicada pelo painel). Evita tokens globais ou com permissões sobre todas as zonas. Copia o **Account ID** dessa conta.

No GitHub: **jquembi/quembi-ui → Settings → Secrets and variables → Actions → New repository secret**, adiciona:

| Secret | Conteúdo |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Token de API Cloudflare com permissões para fazer deploy no Pages. |
| `CLOUDFLARE_ACCOUNT_ID` | Identificador da conta Cloudflare que contém o projecto. |

Também podes guardar ambos no ambiente `cloudflare-pages` em **Settings → Environments → cloudflare-pages → Environment secrets**; o workflow usa esse ambiente. **Nunca coloques o token num commit, `.env`, `wrangler.toml`, variável `VITE_*` ou mensagem de chat.** As variáveis `VITE_*` ficam expostas no JavaScript do browser.

O workflow detecta quando faltam credenciais, assinala **deploy não executado** no resumo e não tenta publicar. A CI permanece independente. Se o projecto ainda não existir, o deploy falhará no Wrangler: cria-o primeiro conforme o passo 1.

## 3. Primeiro deploy e próximas actualizações

Depois de criares o projecto e adicionares os secrets, abre **GitHub → Actions → Deploy Cloudflare Pages (Wrangler) → Run workflow → main**. A execução faz:

1. `npm ci`, `npm run verify` e `npm run verify:deploy`.
2. `npm run check` (TypeScript e build Vite) e `npm run smoke` (HTML, CSS, JS, favicon e exclusão de ficheiros sensíveis).
3. `wrangler pages deploy apps/web/dist --project-name=quembi-ui --branch=main` usando as credenciais dos GitHub Secrets.

Depois do primeiro deploy, cada commit integrado na `main` acciona o mesmo processo. O deploy só ocorre se a compilação e os testes terminarem com sucesso. A Cloudflare não precisa de estar ligada directamente ao GitHub: é o GitHub Actions que chama o Wrangler.

**Deploy manual opcional**, caso tenhas iniciado sessão com `wrangler login` ou configurado as variáveis de autenticação localmente:

```bash
npm ci
npm run deploy:pages
```

Este comando valida, compila e publica. Não execute os comandos manualmente a partir de `apps/web`: a raiz do monorepo é necessária para `wrangler.toml` e os workspaces.

## 4. Associar ui.josequembi.com (uma vez)

No projecto `quembi-ui` em Cloudflare Pages, abre **Custom domains → Set up a custom domain**, introduz `ui.josequembi.com` e segue o assistente. Se `josequembi.com` estiver gerido na mesma conta Cloudflare, o assistente poderá gerir o DNS. Caso contrário, usa exactamente o alvo CNAME indicado no painel e segue as instruções de verificação; **não inventes um endereço `pages.dev` nem apontes o subdomínio sem o associar no Pages**.

Não alteres os registos do domínio principal, MX, SPF ou DKIM. Se já existir um registo `ui`, verifica primeiro o serviço actual. Confirma no painel que o domínio e o certificado HTTPS estão activos e testa `https://ui.josequembi.com/`, `/favicon.svg` e `/assets/...`.

**A associação do domínio e a criação de credenciais não acontecem por um commit no GitHub.** Precisam de acesso à conta Cloudflare e às definições da conta GitHub.

## 5. Diagnóstico e segurança

- **Workflow termina sem deploy:** abre o resumo da execução; se os secrets estiverem em falta, adiciona-os e executa novamente.
- **Erro "project not found" ou equivalente:** confirma o Account ID, o nome `quembi-ui` e a existência de um projecto Direct Upload na conta correcta.
- **Erro de permissão:** revê a permissão Pages: Edit do token e o respectivo âmbito de conta, sem partilhar o segredo.
- **Build passa mas o domínio não abre:** testa primeiro o URL `*.pages.dev` fornecido pelo painel, depois confirma Custom domains, DNS e HTTPS.
- **Assets 404:** confirma `base: '/'`, os caminhos de `apps/web/dist`, e que não foi definida a antiga variável `GITHUB_PAGES=true`.
- **Não publiques segredos:** apenas `apps/web/dist` é enviado; código Premium comercial, tokens e `.env` nunca podem integrar a pasta pública.

## Checklist

- [x] Configuração Wrangler, scripts de deploy e workflow GitHub Actions criados no repositório.
- [x] Verificação independente de configuração e testes de assets integrados na CI.
- [ ] Projecto Pages **Direct Upload** `quembi-ui` confirmado na conta Cloudflare.
- [ ] Secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` adicionados no GitHub.
- [ ] Primeiro deployment Wrangler concluído e URL `*.pages.dev` validado.
- [ ] Domínio `ui.josequembi.com` associado, DNS e HTTPS confirmados.
- [ ] Navegação, modal, pesquisa e pré-visualizações revistos visualmente em desktop e telemóvel.
