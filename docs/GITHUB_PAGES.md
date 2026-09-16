# Publicar Quembi UI no GitHub Pages

Website público previsto: **https://jquembi.github.io/quembi-ui/**.

O website é uma aplicação estática Vite + React. O workflow [`.github/workflows/pages.yml`](../.github/workflows/pages.yml) instala, valida, compila com `GITHUB_PAGES=true`, testa os caminhos dos assets e publica **apenas** `apps/web/dist` usando as GitHub Pages Actions oficiais. A licença Free e as demonstrações conceptuais Premium permanecem no site; nunca coloques código Premium privado, tokens ou chaves de pagamento neste repositório público.

## Activação inicial (uma única vez pelo proprietário)

1. Abre **https://github.com/jquembi/quembi-ui/settings/pages**.
2. Em **Build and deployment → Source**, selecciona **GitHub Actions** (não «Deploy from a branch»). Guarda, se o GitHub pedir.
3. Abre **https://github.com/jquembi/quembi-ui/actions/workflows/pages.yml** e confirma a execução do workflow «Deploy GitHub Pages» após um push na `main`. Se ainda não tiver começado, escolhe **Run workflow → main → Run workflow**.
4. Aguarda pelo job `deploy` com sucesso e usa a URL indicada no ambiente `github-pages`. Se a página apresentar 404 logo após a primeira publicação, aguarda alguns minutos e tenta novamente.

Se o workflow falhar em `Configure GitHub Pages` ou `Deploy to GitHub Pages` com mensagem sobre configuração, permissões ou ambiente, confirma a opção **Source = GitHub Actions** e as regras de protecção do ambiente `github-pages` em **Settings → Environments**. O workflow declara `pages: write` e `id-token: write`, mas a activação inicial nas Settings pode exigir acção do proprietário.

## Caminhos e desenvolvimento

O projecto Pages vive sob `/quembi-ui/`, não na raiz de `github.io`.

- `GITHUB_PAGES=true npm run build` gera os caminhos de produção com `base: '/quembi-ui/'`.
- `GITHUB_PAGES=true npm run smoke` verifica HTML, favicon, CSS e JS da compilação Pages.
- `npm run dev` e `npm run build` sem a variável continuam a usar `/` (desenvolvimento local e outras hospedagens).
- O ficheiro `apps/web/index.html` usa `%BASE_URL%favicon.svg`, para que o ícone funcione em ambos os ambientes.

Não uses `gh-pages`, não faças commit do directório `dist` e não configures simultaneamente «Deploy from a branch». O GitHub Actions publica o artefacto estático, sem precisar de uma branch `gh-pages`.

## Limitações desta fase

GitHub Pages serve ficheiros estáticos. Autenticação, pagamentos, licenças e distribuição do código Premium exigirão um serviço seguro separado, quando forem implementados. Não introduzas secrets em variáveis `VITE_*`, pois Vite inclui-as no JavaScript enviado ao browser.

Quando ligares um domínio próprio, actualiza a estratégia do `base` para o caminho correcto desse domínio, testa o site e só depois muda as configurações em **Settings → Pages → Custom domain**.
