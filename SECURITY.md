# Política de segurança

Este pacote lê os campos informados e devolve o resultado de uma fórmula ou escore. Não faz chamadas de rede, não executa código externo, não grava nada no navegador nem no disco e não identifica pacientes.

## Como relatar uma vulnerabilidade

Se encontrar um jeito de fazer este pacote executar código, vazar dados, aceitar entrada fora do intervalo sem erro ou devolver resultado não finito, escreva para **contato@elucenia.org** com os passos para reproduzir. Não abra issue pública para problema de segurança. Você recebe resposta em até três dias úteis e crédito na correção, se quiser.

## Escopo

- Erro de fórmula, faixa clínica ou interpretação é um problema normal, não uma vulnerabilidade: abra uma issue com a fonte bibliográfica e o caso numérico.
- Os casos em `examples.json` são sintéticos. Não são dados de pacientes.
