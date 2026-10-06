<!-- ELUCENIA technical documentation · zonas-de-treino-karvonen · it · no clinical/professional/rights approval -->

# Zone di allenamento dalla riserva di frequenza cardiaca (Karvonen)

[condizioni, fonti e autorizzazioni](https://elucenia.org/it/strumenti/zonas-de-treino-karvonen)

## Come usare

Usi lo strumento nel portale oppure apra index.html tramite un server HTTP locale. Selezioni la lingua, compili i campi ed esegua il calcolo.

## Dati di ingresso e unità

### Età

`idade`

anni · intervallo: 10–100

### Frequenza cardiaca a riposo (al risveglio)

`fcrep`

bpm · intervallo: 30–120

### Frequenza cardiaca massima misurata al test (se disponibile)

`fcmax`

bpm · facoltativo · intervallo: 100–230

## Edizione del metodo

Karvonen 1957 riserva FC; Tanaka 2001 FCmax 208−0,7età; intensità prescritta

## Formula documentata

FC obiettivo = FC riposo + % intensità × (FCmax − FC riposo).

Senza test, FCmax stimata da Tanaka: 208 − 0,7 × età.

## Limiti e popolazione

La zona di Karvonen usa frequenza cardiaca a riposo e riserva di frequenza cardiaca; l’intensità va prescritta per la persona e il contesto di esercizio. Senza test, la massima è una stima di Tanaka 2001 derivata in adulti sani, non una massima misurata né una garanzia di sicurezza. L’orientamento ACSM citato riguarda adulti apparentemente sani; l’applicazione a malattie croniche o limitazioni richiede una valutazione appropriata. Non estendere automaticamente l’equazione a bambini o condizioni che modificano la risposta della frequenza cardiaca.

## Riferimenti

- [Karvonen MJ, Kentala E, Mustala O. The effects of training on heart rate: a longitudinal study. Ann Med Exp Biol Fenn, 1957.](https://pubmed.ncbi.nlm.nih.gov/13470504/)

- [Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol, 2001.](https://doi.org/10.1016/S0735-1097(00)01054-8)

- [Garber CE et al. Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults. Med Sci Sports Exerc, 2011.](https://doi.org/10.1249/MSS.0b013e318213fefb)

## Riprodurre i test tecnici

Esegua node test.cjs nella cartella principale di questo repository per ripetere i casi sintetici registrati. Gli input, i risultati attesi e le tolleranze originali sono conservati. I test tecnici non costituiscono validazione clinica.

```sh
node test.cjs
```

tool.json contiene le fonti, l’edizione e l’ambito della revisione. examples.json conserva gli input e i risultati attesi dei casi sintetici; results.json registra i risultati ottenuti.

[Scheda e riferimenti](../tool.json) · [Codice JavaScript](../calculator.js) · [Casi di riferimento](../examples.json) · [results.json](../results.json)

## Revisione e condizioni d’uso

Non è stata effettuata una revisione clinica indipendente.

Questa interfaccia è una traduzione realizzata dagli autori, non un’edizione ufficiale o certificata. Non sono state eseguite la revisione clinica indipendente, la revisione linguistica professionale né la verifica delle autorizzazioni relative ai diritti sugli strumenti.

Risultato della formula o classificazione. Interpretazione, condotta e applicabilità dipendono dalla valutazione professionale e dalla fonte selezionata.

## Licenza e attribuzione

Apache-2.0 si applica solo al codice di ELUCENIA. I diritti su strumenti, pubblicazioni, traduzioni e dati restano ai rispettivi titolari. Conservi LICENSE e NOTICE.

ELUCENIA · Felipe Guedes · Copyright © 2026

## Risultati documentati

Le informazioni seguenti conservano gli output del metodo per esempi sintetici. Non costituiscono una validazione clinica indipendente.

### 1

Intensità vigorosa: 132 a 167 bpm (60 a 89% della riserva)

| Dettagli del risultato | |
| --- | --- |
| FC massima (Tanaka: 208 − 0,7 × età) | 180 bpm |
| FC di riserva | 120 bpm |
| Molto leggera (< 30%) | < 96 bpm |
| Leggera (30 a 39%) | 96–107 bpm |
| Moderata (40 a 59%) | 108–131 bpm |
| Vigorosa (60 a 89%) | 132–167 bpm |
| Prossima alla massima (≥ 90%) | ≥ 168 bpm |

Con betabloccante, cardiopatia o in atleta, preferire la FC massima misurata in test ergometrico o cardiopolmonare.


### 2

Intensità vigorosa: 142 a 177 bpm (60 a 89% della riserva)

| Dettagli del risultato | |
| --- | --- |
| FC massima (misurata) | 190 bpm |
| FC di riserva | 120 bpm |
| Molto leggera (< 30%) | < 106 bpm |
| Leggera (30 a 39%) | 106–117 bpm |
| Moderata (40 a 59%) | 118–141 bpm |
| Vigorosa (60 a 89%) | 142–177 bpm |
| Prossima alla massima (≥ 90%) | ≥ 178 bpm |

