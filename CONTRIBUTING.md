# Como contribuir

Obrigado. Este pacote reproduz uma fórmula ou escore clínico, e cada mudança precisa de três coisas.

## Uma mudança

1. A fonte bibliográfica (artigo, diretriz ou sociedade médica, com ano) que justifica a mudança, em `tool.json` e `README.md`.
2. Um caso de referência novo ou alterado em `examples.json`, com o valor esperado calculado a partir da fonte.
3. `node test.cjs` passando.

Nunca inclua dados reais de pacientes, nem "anonimizados". Nenhuma dependência npm.

## Assinatura

Ao enviar um pull request você certifica o Developer Certificate of Origin (developercertificate.org): a contribuição é sua para dar e você concorda que ela é publicada sob a licença Apache-2.0 deste projeto. Adicione `Signed-off-by: Seu Nome <email>` aos commits.

Você mantém o copyright da sua contribuição e concede a Elucenia · Felipe Guedes o direito perpétuo, irrevogável e mundial de distribuí-la como parte deste pacote sob a Apache-2.0 e, somente como parte deste pacote, sob licença comercial separada.

## Atribuição

Criado e mantido por Felipe Guedes para a Elucenia. Forks e derivados devem manter o copyright, o `NOTICE` e a `LICENSE`. Uma menção "baseado em tool-zonas-de-treino-karvonen de Elucenia · Felipe Guedes" é bem-vinda.

## Issues

- Resultado errado: abra uma issue com a entrada, o resultado obtido, o esperado e a fonte.
- Ideia de ferramenta: abra uma issue com o nome do escore e a referência original.
