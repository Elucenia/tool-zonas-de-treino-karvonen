<!-- ELUCENIA technical documentation · zonas-de-treino-karvonen · pt-BR · no clinical/professional/rights approval -->

# Zonas de treino pela FC de reserva (Karvonen)

[condições, fontes e permissões](https://elucenia.org/pt-br/ferramentas/zonas-de-treino-karvonen)

## Como usar

Use a ferramenta no portal ou abra index.html em um servidor HTTP local. Selecione o idioma, preencha os campos e calcule.

## Entradas e unidades

### Idade

`idade`

anos · intervalo: 10–100

### FC de repouso (ao acordar)

`fcrep`

bpm · intervalo: 30–120

### FC máxima medida em teste (se houver)

`fcmax`

bpm · opcional · intervalo: 100–230

## Edição do método

Karvonen 1957 FCreserva; Tanaka 2001 FCmax 208−0,7 idade; intensidadeprescrita

## Fórmula documentada

FC-alvo = FC de repouso + % de intensidade × (FC máxima − FC de repouso).

Sem teste, a FC máxima é estimada pela equação de Tanaka: 208 − 0,7 × idade.

## Limites e população

A zona de Karvonen usa frequência de repouso e reserva de frequência cardíaca; a intensidade deve ser prescrita para a pessoa e seu contexto de exercício. Sem teste, a máxima é uma estimativa de Tanaka 2001, derivada em adultos saudáveis, não uma máxima medida nem uma garantia de segurança. A orientação ACSM citada é para adultos aparentemente saudáveis; aplicação a doenças crônicas ou limitações exige avaliação apropriada. Não extrapole automaticamente a equação para crianças ou para condições que alterem a resposta da frequência cardíaca.

## Referências

- [Karvonen MJ, Kentala E, Mustala O. The effects of training on heart rate: a longitudinal study. Ann Med Exp Biol Fenn, 1957.](https://pubmed.ncbi.nlm.nih.gov/13470504/)

- [Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol, 2001.](https://doi.org/10.1016/S0735-1097(00)01054-8)

- [Garber CE et al. Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults. Med Sci Sports Exerc, 2011.](https://doi.org/10.1249/MSS.0b013e318213fefb)

## Reproduzir os testes técnicos

Execute node test.cjs na pasta raiz deste repositório para repetir os casos sintéticos registrados. As entradas, expectativas e tolerâncias originais são preservadas. Testes técnicos não constituem validação clínica.

```sh
node test.cjs
```

tool.json contém fontes, edição e escopo de revisão. examples.json conserva as entradas e expectativas sintéticas; results.json registra os resultados obtidos.

[Ficha e referências](../tool.json) · [Código JavaScript](../calculator.js) · [Casos de referência](../examples.json) · [results.json](../results.json)

## Revisão e condições de uso

Revisão clínica independente não realizada.

Esta interface é uma tradução autoral, não uma edição oficial ou certificada. Revisão clínica independente, revisão linguística profissional e autorização de direitos de instrumentos não foram realizadas.

Resultado da fórmula ou classificação. Interpretação, conduta e aplicabilidade dependem da avaliação profissional e da fonte selecionada.

## Licença e atribuição

Apache-2.0 aplica-se somente ao código da ELUCENIA. Os instrumentos, publicações, traduções e dados mantêm os direitos dos respectivos titulares. Preserve LICENSE e NOTICE.

ELUCENIA · Felipe Guedes · Copyright © 2026

## Resultados documentados

As informações abaixo preservam as saídas do método para exemplos sintéticos. Não constituem validação clínica independente.

### 1

Intensidade vigorosa: 132 a 167 bpm (60 a 89% da reserva)

| Detalhes do resultado | |
| --- | --- |
| FC máxima (Tanaka: 208 − 0,7 × idade) | 180 bpm |
| FC de reserva | 120 bpm |
| Muito leve (< 30%) | < 96 bpm |
| Leve (30 a 39%) | 96–107 bpm |
| Moderada (40 a 59%) | 108–131 bpm |
| Vigorosa (60 a 89%) | 132–167 bpm |
| Próxima da máxima (≥ 90%) | ≥ 168 bpm |

Com betabloqueador, cardiopatia ou atleta, prefira a FC máxima medida em teste ergométrico ou cardiopulmonar.


### 2

Intensidade vigorosa: 142 a 177 bpm (60 a 89% da reserva)

| Detalhes do resultado | |
| --- | --- |
| FC máxima (medida) | 190 bpm |
| FC de reserva | 120 bpm |
| Muito leve (< 30%) | < 106 bpm |
| Leve (30 a 39%) | 106–117 bpm |
| Moderada (40 a 59%) | 118–141 bpm |
| Vigorosa (60 a 89%) | 142–177 bpm |
| Próxima da máxima (≥ 90%) | ≥ 178 bpm |

