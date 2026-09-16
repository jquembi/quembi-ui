# Publicação do Quembi UI — Cloudflare Pages

**Destino pretendido:** https://ui.josequembi.com/  
**Fonte:** repositório público `jquembi/quembi-ui`, branch `main`.  
**Estado:** configuração do código pronta; a criação do projecto Cloudflare, ligação ao GitHub e associação do domínio dependem do titular da conta. Não afirmar que o domínio já está activo sem confirmar o deploy.

O website é estático (Vite, React e Tailwind CSS) e a compilação usa `base: '/'`, pois o subdomínio serve o site na raiz. O Premium no catálogo consiste apenas em demonstrações conceptuais; não há checkout, login ou distribuição comercial funcional.

## 1. Validar o código

Na raiz do repositório, com Node.js 22 e npm:

```bash
npm ci
npm run verify
npm run check
npm run smoke
npm run preview
```

Abre o URL apresentado pelo comando `preview` e valida visualmente homepage, pesquisa, filtros, modal, cópia de código, teclado e diferentes tamanhos de ecrã. A integração contínua verifica a compilação mas não substitui um teste visual no browser. A CI conserva o artefacto `quembi-ui-website` durante sete dias.

## 2. Criar Cloudflare Pages ligado ao GitHub (uma única vez)

Na conta Cloudflare que irá gerir o site:

1. Abre **Workers & Pages → Create → Pages → Connect to Git** (os nomes podem variar no painel).
2. Autoriza o acesso ao GitHub e selecciona **`jquembi/quembi-ui`**. Não autorizes mais repositórios do que os necessários.
3. Escolhe **`main`** como production branch e um nome de projecto Pages disponível, por exemplo **`quembi-ui`**. O endereço temporário será atribuído pela Cloudflare; não assumes que `quembi-ui.pages.dev` está disponível antes de o painel confirmar.
4. Configura a compilação a partir da **raiz do monorepo**, e não apenas de `apps/web`:

| Campo | Valor |
| --- | --- |
| Framework preset | `None` ou Vite, desde que os campos manuais abaixo sejam respeitados |
| Root directory | raiz do repositório (em branco ou `/`, segundo o painel) |
| Build command | `npm ci && npm run verify && npm run check && npm run smoke` |
| Build output directory | `apps/web/dist` |
| Production branch | `main` |
| Environment variable | `NODE_VERSION=22` (quando necessário para seleccionar Node 22) |

Se o ambiente já instalar as dependências automaticamente, `npm ci` continuará a criar uma instalação reprodutível a partir do `package-lock.json`. Não configures `GITHUB_PAGES=true`: foi descontinuado. Não uses `/quembi-ui/` como caminho base.

5. Executa o primeiro deploy. Verifica o endereço `*.pages.dev` que a Cloudflare atribuir e confirma que HTML, CSS, JS e favicon carregam sem 404.

Após a integração Git estar activa, novos commits na `main` desencadeiam deploys automáticos pela própria Cloudflare, sem tokens Cloudflare no repositório e sem GitHub Actions de deploy. A CI no GitHub continua a executar verificações independentes.

## 3. Ligar o subdomínio ui.josequembi.com

No projecto Pages criado, abre **Custom domains → Set up a custom domain** e introduz **`ui.josequembi.com`**. Segue as instruções mostradas no painel:

- Se a zona `josequembi.com` estiver activa na mesma conta Cloudflare, o assistente poderá criar/gerir automaticamente o registo DNS necessário. Confirma o registo e evita criar outro com o mesmo nome.
- Se o DNS estiver noutro fornecedor, segue o destino CNAME **exacto** indicado pelo projecto Pages; não adivinhes o endereço `*.pages.dev`. Se o painel exigir mover a zona para a Cloudflare ou confirmar titularidade, conclui esse processo pelo proprietário.
- Não alteres o registo do domínio principal `josequembi.com` ou os registos de email (MX, SPF, DKIM). Se `ui` já estiver em uso, verifica o serviço actual antes de substituir o DNS.
- Aguarda a validação do domínio e emissão/activação de HTTPS pelo painel; confirma que `https://ui.josequembi.com/` carrega o site e os recursos `/assets/...` e `/favicon.svg`.

A associação do domínio não pode ser feita apenas por um commit no GitHub: requer acesso à conta Cloudflare e, consoante o caso, às definições DNS do domínio.

## 4. Segurança, produção e diagnóstico

- Publica **apenas `apps/web/dist`**. Nunca disponibilizes a raiz do repositório, `.env`, tokens, ou ficheiros Premium privados.
- `VITE_SALES_EMAIL` é opcional e será visível no browser. Não uses variáveis `VITE_*` para segredos ou chaves de pagamento.
- Se o build passar mas o domínio não abrir, confirma o primeiro deploy `*.pages.dev`, o estado de **Custom domains**, os registos DNS e o certificado SSL/TLS. Se CSS/JS falharem com 404, confirma que a compilação usa `base: '/'`, a raiz do monorepo e a pasta de saída correcta.
- O antigo workflow de GitHub Pages foi removido para evitar publicações duplicadas e execuções a falhar. A hospedagem principal é Cloudflare Pages com integração Git.

## Checklist de lançamento

- [x] Código com caminhos de assets para a raiz do domínio e CI com instalação/compilação/smoke tests.
- [ ] Projecto Pages criado e GitHub associado pelo titular da conta Cloudflare.
- [ ] Primeiro deploy confirmado no endereço `*.pages.dev` fornecido pelo painel.
- [ ] Subdomínio `ui.josequembi.com` associado e HTTPS confirmado.
- [ ] Teste manual da interface e navegação em telemóvel e desktop.
- [ ] Termos/privacidade reais antes de recolher dados pessoais; infraestrutura privada separada antes de comercializar Premium.
