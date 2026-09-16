# Publicação do website Quembi UI

> Estado: o website é estático. O catálogo Premium contém apenas demonstrações conceptuais; não existe checkout, autenticação ou entrega de produtos pagos.

## Antes de publicar

Na raiz do monorepo, com Node.js 22+ e npm:

```bash
npm ci
npm run verify
npm run check
npm run smoke
npm run preview
```

Abre o endereço apresentado por `npm run preview` e revê manualmente a homepage, pesquisa, filtros, navegação por teclado, modal, pré-visualizações e disposição em ecrãs móveis e desktop. **A compilação automática não substitui esta revisão visual.** Não introduzas produtos Premium privados no repositório público nem em `apps/web/public`.

A pipeline GitHub Actions executa as verificações anteriores (excepto `preview`) e guarda um artefacto `quembi-ui-website` com o conteúdo de `apps/web/dist` por 7 dias. Para o obter, abre a execução de CI bem-sucedida em **Actions → CI → Artifacts**. Esse ZIP é um build estático, não o código-fonte.

## Cloudflare Pages ligado ao GitHub

1. No painel Cloudflare, abre **Workers & Pages** e cria um projecto **Pages** ligado ao GitHub.
2. Escolhe `jquembi/quembi-ui` e o ramo de produção `main`.
3. Configura as opções de compilação:

   | Campo | Valor |
   | --- | --- |
   | Root directory | Raiz do repositório (em branco ou `/`, conforme o painel) |
   | Build command | `npm run check && npm run smoke` |
   | Build output directory | `apps/web/dist` |
   | Node.js | 22+ (configuração do ambiente de compilação) |

4. Publica, abre o URL `*.pages.dev` atribuído pela Cloudflare e testa novamente mobile e desktop.
5. Liga um domínio personalizado apenas depois de confirmares o domínio e a titularidade da marca.

`VITE_SALES_EMAIL` é opcional: deve conter apenas um endereço comercial público para um link `mailto:`. **Qualquer variável `VITE_*` é incluída no código do browser: nunca coloques tokens, chaves de pagamento ou segredos nestas variáveis.**

## Publicação estática manual

Depois de `npm run check && npm run smoke`, publica **só os ficheiros de `apps/web/dist/`** num serviço de hosting estático. Não publiques a raiz do monorepo, `packages/`, ficheiros `.env` ou código comercial privado.

## Checklist de lançamento

- [x] `package-lock.json` versionado; CI instala com `npm ci`.
- [x] CI verifica integridade, TypeScript, build e existência dos recursos estáticos.
- [x] O build está disponível como artefacto temporário da CI.
- [ ] Rever visualmente o site em browser, mobile e desktop e confirmar navegação por teclado.
- [ ] Publicar o site no Cloudflare Pages e testar o URL real.
- [ ] Confirmar domínio, direitos de marca, contactos e identidade comercial.
- [ ] Disponibilizar termos e privacidade reais antes de recolher dados pessoais.
- [ ] Implementar pagamentos, licenças e entrega em infraestrutura privada antes de oferecer checkout Premium.
