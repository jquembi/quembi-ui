# Política de licenças — proposta para lançamento

## Free — código presente neste repositório

O código publicado sob `LICENSE` está sujeito à licença MIT. Confere no ficheiro de licença os termos exactos. Documentação de marca e nomes comerciais exigem revisão jurídica antes de uma loja pública; a licença MIT do código não cria, por si só, direitos de utilização de marcas de terceiros.

## Premium — produto não entregue neste repositório

As entradas Premium actuais são **apenas demonstrações conceptuais**, não produtos concluídos. Não existe código Premium distribuível, preço vinculativo, contrato de licença, subscrição, gateway de pagamento ou autenticação de clientes. Nunca colocar `.zip` comerciais na pasta `public/` nem confiar em um botão bloqueado no frontend para controlar downloads.

### Pontos a definir num contrato comercial real

- Tipo de licença (individual, equipa ou organização), número de projectos e utilizadores autorizados.
- Direito de modificar código, incluir em produtos finais, trabalhar para clientes e eventual transferência.
- Proibição ou autorização de redistribuir ficheiros fonte, revender a biblioteca e publicar layouts como concorrentes directos.
- Prazo de acesso, actualizações incluídas, suporte, reembolsos e restrições de uso.
- Direito aplicável, facturação e privacidade conforme a jurisdição de operação.

> Este texto é uma proposta de estrutura comercial e não substitui termos jurídicos nem constitui uma licença Premium vinculativa.

## Entrega segura futura

1. Confirmar o pagamento exclusivamente no servidor, através de webhook com assinatura validada.
2. Registar a licença e o titular no backend e aplicar limites conforme o contrato.
3. Entregar o produto por link temporário assinado ou serviço privado autenticado.
4. Auditar downloads, revogar acessos conforme termos e comunicar actualizações.
5. Manter código Premium e credenciais exclusivamente em recursos privados.
