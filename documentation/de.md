<!-- ELUCENIA technical documentation · zonas-de-treino-karvonen · de · no clinical/professional/rights approval -->

# Trainingszonen nach Herzfrequenzreserve (Karvonen)

[Bedingungen, Quellen und Berechtigungen](https://elucenia.org/de/werkzeuge/zonas-de-treino-karvonen)

## Verwendung

Verwenden Sie das Werkzeug im Portal oder öffnen Sie index.html über einen lokalen HTTP-Server. Wählen Sie die Sprache, füllen Sie die Felder aus und berechnen Sie das Ergebnis.

## Eingaben und Einheiten

### Alter

`idade`

Jahre · Bereich: 10–100

### Ruheherzfrequenz (beim Aufwachen)

`fcrep`

bpm · Bereich: 30–120

### Im Test gemessene maximale Herzfrequenz (falls vorhanden)

`fcmax`

bpm · optional · Bereich: 100–230

## Fassung der Methode

Karvonen 1957 HF-Reserve; Tanaka 2001 HFmax 208−0,7Alter; vorgegebene Intensität

## Dokumentierte Formel

Ziel-HF = Ruhe-HF + % Intensität × (maximale HF − Ruhe-HF).

Ohne Test, Maximal-HF geschätzt nach Tanaka: 208 − 0,7 × Alter.

## Grenzen und Population

Die Karvonen-Zone nutzt Ruheherzfrequenz und Herzfrequenzreserve; die Intensität muss für die Person und ihren Trainingskontext vorgegeben werden. Ohne Test ist das Maximum eine bei gesunden Erwachsenen abgeleitete Schätzung nach Tanaka 2001, kein gemessenes Maximum und keine Sicherheitsgarantie. Die zitierte ACSM-Empfehlung gilt für offenbar gesunde Erwachsene; bei chronischen Erkrankungen oder Einschränkungen ist eine geeignete Beurteilung erforderlich. Übertragen Sie die Gleichung nicht automatisch auf Kinder oder Zustände, die die Herzfrequenzreaktion verändern.

## Referenzen

- [Karvonen MJ, Kentala E, Mustala O. The effects of training on heart rate: a longitudinal study. Ann Med Exp Biol Fenn, 1957.](https://pubmed.ncbi.nlm.nih.gov/13470504/)

- [Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol, 2001.](https://doi.org/10.1016/S0735-1097(00)01054-8)

- [Garber CE et al. Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults. Med Sci Sports Exerc, 2011.](https://doi.org/10.1249/MSS.0b013e318213fefb)

## Technische Tests reproduzieren

Führen Sie node test.cjs im Stammverzeichnis dieses Repositorys aus, um die dokumentierten synthetischen Fälle zu wiederholen. Ursprüngliche Eingaben, erwartete Ergebnisse und Toleranzen bleiben erhalten. Technische Tests stellen keine klinische Validierung dar.

```sh
node test.cjs
```

tool.json enthält Quellen, Ausgabe und Umfang der Überprüfung. examples.json bewahrt die synthetischen Eingaben und erwarteten Ergebnisse; results.json dokumentiert die tatsächlich erhaltenen Ergebnisse.

[Eintrag und Referenzen](../tool.json) · [JavaScript-Code](../calculator.js) · [Referenzfälle](../examples.json) · [results.json](../results.json)

## Überprüfung und Nutzungsbedingungen

Eine unabhängige klinische Prüfung wurde nicht durchgeführt.

Diese Benutzeroberfläche ist eine selbst erstellte Übersetzung und keine offizielle oder zertifizierte Ausgabe. Eine unabhängige klinische Überprüfung, eine professionelle sprachliche Prüfung und eine Klärung der Rechte an den Instrumenten wurden nicht durchgeführt.

Ergebnis der Formel oder Klassifikation. Interpretation, Vorgehen und Anwendbarkeit hängen von der fachlichen Beurteilung und der ausgewählten Quelle ab.

## Lizenz und Urheberangaben

Apache-2.0 gilt nur für den ELUCENIA-Code. Die Rechte an Instrumenten, Veröffentlichungen, Übersetzungen und Daten verbleiben bei den jeweiligen Rechteinhabern. Bewahren Sie LICENSE und NOTICE auf.

ELUCENIA · Felipe Guedes · Copyright © 2026

## Dokumentierte Ergebnisse

Die folgenden Angaben bewahren die Ausgaben der Methode für synthetische Beispiele. Sie stellen keine unabhängige klinische Validierung dar.

### 1

Intensive Belastung: 132 bis 167 bpm (60 bis 89 % der Reserve)

| Ergebnisdetails | |
| --- | --- |
| Maximale Herzfrequenz (Tanaka: 208 − 0,7 × Alter) | 180 bpm |
| Reserveherzfrequenz | 120 bpm |
| Sehr leicht (< 30 %) | < 96 bpm |
| Leicht (30 bis 39 %) | 96–107 bpm |
| Mäßig (40 bis 59 %) | 108–131 bpm |
| Intensiv (60 bis 89 %) | 132–167 bpm |
| Nahe am Maximum (≥ 90 %) | ≥ 168 bpm |

Bei Betablockertherapie, Herzerkrankung oder als Athlet bevorzugen Sie die in einem Belastungs- oder kardiopulmonalen Test gemessene maximale Herzfrequenz.


### 2

Intensive Belastung: 142 bis 177 bpm (60 bis 89 % der Reserve)

| Ergebnisdetails | |
| --- | --- |
| Maximale Herzfrequenz (gemessen) | 190 bpm |
| Reserveherzfrequenz | 120 bpm |
| Sehr leicht (< 30 %) | < 106 bpm |
| Leicht (30 bis 39 %) | 106–117 bpm |
| Mäßig (40 bis 59 %) | 118–141 bpm |
| Intensiv (60 bis 89 %) | 142–177 bpm |
| Nahe am Maximum (≥ 90 %) | ≥ 178 bpm |

