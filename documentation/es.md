<!-- ELUCENIA technical documentation · zonas-de-treino-karvonen · es · no clinical/professional/rights approval -->

# Zonas de entrenamiento por reserva de frecuencia cardíaca (Karvonen)

[condiciones, fuentes y permisos](https://elucenia.org/es/herramientas/zonas-de-treino-karvonen)

## Cómo usar

Utilice la herramienta en el portal o abra index.html mediante un servidor HTTP local. Seleccione el idioma, complete los campos y calcule.

## Entradas y unidades

### Edad

`idade`

años · intervalo: 10–100

### Frecuencia cardíaca en reposo (al despertar)

`fcrep`

bpm · intervalo: 30–120

### Frecuencia cardíaca máxima medida en prueba (si está disponible)

`fcmax`

bpm · opcional · intervalo: 100–230

## Edición del método

Karvonen 1957 reserva FC; Tanaka 2001 FCmáx 208−0,7edad; intensidad prescrita

## Fórmula documentada

FC objetivo = FC reposo + % intensidad × (FCmáx − FC reposo).

Sin prueba, FCmáx se estima por Tanaka: 208 − 0,7 × edad.

## Límites y población

La zona de Karvonen usa frecuencia cardíaca en reposo y reserva de frecuencia cardíaca; la intensidad debe prescribirse para la persona y su contexto de ejercicio. Sin una prueba, la máxima es una estimación de Tanaka 2001 derivada en adultos sanos, no una máxima medida ni una garantía de seguridad. La orientación ACSM citada es para adultos aparentemente sanos; la aplicación a enfermedades crónicas o limitaciones exige evaluación apropiada. No extrapole automáticamente la ecuación a niños ni a condiciones que alteren la respuesta de frecuencia cardíaca.

## Referencias

- [Karvonen MJ, Kentala E, Mustala O. The effects of training on heart rate: a longitudinal study. Ann Med Exp Biol Fenn, 1957.](https://pubmed.ncbi.nlm.nih.gov/13470504/)

- [Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol, 2001.](https://doi.org/10.1016/S0735-1097(00)01054-8)

- [Garber CE et al. Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults. Med Sci Sports Exerc, 2011.](https://doi.org/10.1249/MSS.0b013e318213fefb)

## Reproducir las pruebas técnicas

Ejecute node test.cjs en el directorio raíz de este repositorio para repetir los casos sintéticos registrados. Se conservan las entradas, los resultados esperados y las tolerancias originales. Las pruebas técnicas no constituyen validación clínica.

```sh
node test.cjs
```

tool.json contiene las fuentes, la edición y el alcance de la revisión. examples.json conserva las entradas y los resultados esperados de los casos sintéticos; results.json registra los resultados obtenidos.

[Ficha y referencias](../tool.json) · [Código JavaScript](../calculator.js) · [Casos de referencia](../examples.json) · [results.json](../results.json)

## Revisión y condiciones de uso

No se ha realizado una revisión clínica independiente.

Esta interfaz es una traducción de elaboración propia, no una edición oficial o certificada. No se han realizado la revisión clínica independiente, la revisión lingüística profesional ni la autorización de derechos de los instrumentos.

Resultado de la fórmula o clasificación. La interpretación, la conducta y la aplicabilidad dependen de la evaluación profesional y de la fuente seleccionada.

## Licencia y atribución

Apache-2.0 se aplica únicamente al código de ELUCENIA. Los derechos de los instrumentos, publicaciones, traducciones y datos permanecen en manos de sus respectivos titulares. Conserve LICENSE y NOTICE.

ELUCENIA · Felipe Guedes · Copyright © 2026

## Resultados documentados

La información siguiente conserva las salidas del método para ejemplos sintéticos. No constituye una validación clínica independiente.

### 1

Intensidad vigorosa: 132 a 167 lpm (60 a 89% de la reserva)

| Detalles del resultado | |
| --- | --- |
| FC máxima (Tanaka: 208 − 0,7 × edad) | 180 lpm |
| FC de reserva | 120 lpm |
| Muy leve (< 30%) | < 96 lpm |
| Leve (30 a 39%) | 96–107 lpm |
| Moderada (40 a 59%) | 108–131 lpm |
| Vigorosa (60 a 89%) | 132–167 lpm |
| Próxima a la máxima (≥ 90%) | ≥ 168 lpm |

Con betabloqueador, cardiopatía o en atletas, prefiera la FC máxima medida en prueba ergométrica o cardiopulmonar.


### 2

Intensidad vigorosa: 142 a 177 lpm (60 a 89% de la reserva)

| Detalles del resultado | |
| --- | --- |
| FC máxima (medida) | 190 lpm |
| FC de reserva | 120 lpm |
| Muy leve (< 30%) | < 106 lpm |
| Leve (30 a 39%) | 106–117 lpm |
| Moderada (40 a 59%) | 118–141 lpm |
| Vigorosa (60 a 89%) | 142–177 lpm |
| Próxima a la máxima (≥ 90%) | ≥ 178 lpm |

