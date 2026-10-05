<!-- ELUCENIA technical documentation · zonas-de-treino-karvonen · en · no clinical/professional/rights approval -->

# Training zones by heart rate reserve (Karvonen)

[conditions, sources and permissions](https://elucenia.org/en/tools/zonas-de-treino-karvonen)

## How to use

Use the tool in the portal or open index.html through a local HTTP server. Select the language, complete the fields and calculate.

## Inputs and units

### Age

`idade`

years · range: 10–100

### Resting heart rate (on waking)

`fcrep`

bpm · range: 30–120

### Maximum heart rate measured in a test (if available)

`fcmax`

bpm · optional · range: 100–230

## Method edition

Karvonen 1957 HR reserve; Tanaka 2001 HRmax 208−0.7age; prescribed intensity

## Documented formula

Target HR = resting HR + % intensity × (maximal HR − resting HR).

Without a test, maximal HR is estimated by Tanaka: 208 − 0.7 × age.

## Limits and population

Karvonen zones use resting heart rate and heart-rate reserve; intensity must be prescribed for the individual and exercise context. Without testing, the maximum is a Tanaka 2001 estimate derived in healthy adults, not a measured maximum or a guarantee of safety. The cited ACSM guidance is for apparently healthy adults; application to chronic disease or limitations requires appropriate assessment. Do not automatically extrapolate the equation to children or conditions that alter the heart-rate response.

## References

- [Karvonen MJ, Kentala E, Mustala O. The effects of training on heart rate: a longitudinal study. Ann Med Exp Biol Fenn, 1957.](https://pubmed.ncbi.nlm.nih.gov/13470504/)

- [Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol, 2001.](https://doi.org/10.1016/S0735-1097(00)01054-8)

- [Garber CE et al. Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults. Med Sci Sports Exerc, 2011.](https://doi.org/10.1249/MSS.0b013e318213fefb)

## Reproduce the technical tests

Run node test.cjs in the root directory of this repository to repeat the recorded synthetic cases. Original inputs, expectations and tolerances are preserved. Technical tests do not constitute clinical validation.

```sh
node test.cjs
```

tool.json contains sources, edition and review scope. examples.json retains synthetic inputs and expectations; results.json records the obtained results.

[Record and references](../tool.json) · [JavaScript code](../calculator.js) · [Reference cases](../examples.json) · [results.json](../results.json)

## Review and conditions of use

Independent clinical review has not been performed.

This interface is an authorial translation, not an official or certified edition. Independent clinical review, professional language review and instrument rights clearance have not been performed.

Formula or classification result. Interpretation, care and applicability depend on professional assessment and the selected source.

## License and attribution

Apache-2.0 applies only to ELUCENIA code. Rights to instruments, publications, translations and data remain with their respective holders. Preserve LICENSE and NOTICE.

ELUCENIA · Felipe Guedes · Copyright © 2026
