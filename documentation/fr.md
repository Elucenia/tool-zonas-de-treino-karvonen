<!-- ELUCENIA technical documentation · zonas-de-treino-karvonen · fr · no clinical/professional/rights approval -->

# Zones d’entraînement selon la réserve de fréquence cardiaque (Karvonen)

[conditions, sources et autorisations](https://elucenia.org/fr/outils/zonas-de-treino-karvonen)

## Mode d’emploi

Utilisez l’outil sur le portail ou ouvrez index.html via un serveur HTTP local. Sélectionnez la langue, remplissez les champs et lancez le calcul.

## Données d’entrée et unités

### Âge

`idade`

ans · intervalle: 10–100

### Fréquence cardiaque au repos (au réveil)

`fcrep`

bpm · intervalle: 30–120

### Fréquence cardiaque maximale mesurée au test (si disponible)

`fcmax`

bpm · facultatif · intervalle: 100–230

## Édition de la méthode

Karvonen 1957 réserve FC; Tanaka 2001 FCmax 208−0,7âge; intensité prescrite

## Formule documentée

FC cible = FC repos + % intensité × (FCmax − FC repos).

Sans test, FCmax estimée par Tanaka: 208 − 0,7 × âge.

## Limites et population

La zone de Karvonen utilise la fréquence cardiaque au repos et la réserve de fréquence cardiaque ; l’intensité doit être prescrite pour la personne et son contexte d’exercice. Sans test, la fréquence maximale est une estimation de Tanaka 2001, établie chez des adultes en bonne santé, et non une valeur mesurée ou une garantie de sécurité. L’orientation ACSM citée concerne les adultes apparemment en bonne santé ; l’application aux maladies chroniques ou limitations exige une évaluation appropriée. N’extrapolez pas automatiquement l’équation aux enfants ou aux états modifiant la réponse de fréquence cardiaque.

## Références

- [Karvonen MJ, Kentala E, Mustala O. The effects of training on heart rate: a longitudinal study. Ann Med Exp Biol Fenn, 1957.](https://pubmed.ncbi.nlm.nih.gov/13470504/)

- [Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol, 2001.](https://doi.org/10.1016/S0735-1097(00)01054-8)

- [Garber CE et al. Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults. Med Sci Sports Exerc, 2011.](https://doi.org/10.1249/MSS.0b013e318213fefb)

## Reproduire les tests techniques

Exécutez node test.cjs dans le répertoire racine de ce dépôt pour reproduire les cas synthétiques enregistrés. Les données d’entrée, les résultats attendus et les tolérances d’origine sont conservés. Les tests techniques ne constituent pas une validation clinique.

```sh
node test.cjs
```

tool.json contient les sources, l’édition et le périmètre de la revue. examples.json conserve les données d’entrée et les résultats attendus des cas synthétiques ; results.json consigne les résultats obtenus.

[Fiche et références](../tool.json) · [Code JavaScript](../calculator.js) · [Cas de référence](../examples.json) · [results.json](../results.json)

## Revue et conditions d’utilisation

Aucune révision clinique indépendante n’a été effectuée.

Cette interface est une traduction réalisée par nos soins, et non une édition officielle ou certifiée. La revue clinique indépendante, la révision linguistique professionnelle et l’autorisation des droits sur les instruments n’ont pas été réalisées.

Résultat de la formule ou de la classification. L’interprétation, la conduite et l’applicabilité dépendent de l’évaluation professionnelle et de la source sélectionnée.

## Licence et attribution

Apache-2.0 s’applique uniquement au code d’ELUCENIA. Les droits sur les instruments, publications, traductions et données restent ceux de leurs titulaires respectifs. Conservez LICENSE et NOTICE.

ELUCENIA · Felipe Guedes · Copyright © 2026

## Résultats documentés

Les informations ci-dessous conservent les sorties de la méthode pour des exemples synthétiques. Elles ne constituent pas une validation clinique indépendante.

### 1

Intensité vigoureuse : 132 à 167 bpm (60 à 89 % de la réserve)

| Détails du résultat | |
| --- | --- |
| FC maximale (Tanaka : 208 − 0,7 × âge) | 180 bpm |
| FC de réserve | 120 bpm |
| Très légère (< 30 %) | < 96 bpm |
| Légère (30 à 39 %) | 96–107 bpm |
| Modérée (40 à 59 %) | 108–131 bpm |
| Vigoureuse (60 à 89 %) | 132–167 bpm |
| Proche du maximum (≥ 90 %) | ≥ 168 bpm |

Avec un bêtabloquant, une cardiopathie ou chez un athlète, privilégiez la FC maximale mesurée lors d’une épreuve d’effort ou d’un test cardiopulmonaire.


### 2

Intensité vigoureuse : 142 à 177 bpm (60 à 89 % de la réserve)

| Détails du résultat | |
| --- | --- |
| FC maximale (mesurée) | 190 bpm |
| FC de réserve | 120 bpm |
| Très légère (< 30 %) | < 106 bpm |
| Légère (30 à 39 %) | 106–117 bpm |
| Modérée (40 à 59 %) | 118–141 bpm |
| Vigoureuse (60 à 89 %) | 142–177 bpm |
| Proche du maximum (≥ 90 %) | ≥ 178 bpm |

