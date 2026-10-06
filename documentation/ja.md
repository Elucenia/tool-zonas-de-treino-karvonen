<!-- ELUCENIA technical documentation · zonas-de-treino-karvonen · ja · no clinical/professional/rights approval -->

# 心拍予備能によるトレーニングゾーン（Karvonen）

[条件・出典・許諾](https://elucenia.org/ja/tools/zonas-de-treino-karvonen)

## 使い方

ポータルでツールを使用するか、ローカルHTTPサーバー経由でindex.htmlを開いてください。言語を選択し、項目を入力して計算してください。

## 入力項目と単位

### 年齢

`idade`

年 · 範囲: 10–100

### 安静時心拍数（起床時）

`fcrep`

拍/分 · 範囲: 30–120

### 検査で測定した最大心拍数（あれば）

`fcmax`

拍/分 · 任意 · 範囲: 100–230

## 方法の版

Karvonen 1957心拍予備能、Tanaka 2001最大心拍208−0.7年齢、指定強度

## 記載された計算式

目標心拍数 = 安静心拍数 + 強度% × (最大心拍数 − 安静心拍数).

試験なしの場合は最大心拍を次式で推定 Tanaka: 208 − 0.7 × 年齢.

## 限界・対象集団

Karvonenのゾーンは安静時心拍数と心拍予備能を用い、運動強度は個人と運動状況に合わせて処方する必要があります。試験なしの最大心拍数は、健康成人から得られたTanaka2001の推定値で、実測最大値でも安全保証でもありません。引用したACSMの指針は見かけ上健康な成人を対象とし、慢性疾患や制限への適用には適切な評価が必要です。心拍反応を変える状態や小児へ自動的に外挿しないでください。

## 参考文献

- [Karvonen MJ, Kentala E, Mustala O. The effects of training on heart rate: a longitudinal study. Ann Med Exp Biol Fenn, 1957.](https://pubmed.ncbi.nlm.nih.gov/13470504/)

- [Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol, 2001.](https://doi.org/10.1016/S0735-1097(00)01054-8)

- [Garber CE et al. Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults. Med Sci Sports Exerc, 2011.](https://doi.org/10.1249/MSS.0b013e318213fefb)

## 技術テストの再現

このリポジトリのルートディレクトリでnode test.cjsを実行すると、記録された合成ケースを再実行できます。元の入力、期待結果、許容誤差は保持されています。技術テストは臨床的検証を意味しません。

```sh
node test.cjs
```

tool.jsonには出典、版、確認範囲が記録されています。examples.jsonには合成入力と期待結果が保持され、results.jsonには実際に得られた結果が記録されています。

[記録・参考文献](../tool.json) · [JavaScriptコード](../calculator.js) · [参照ケース](../examples.json) · [results.json](../results.json)

## 確認状況と使用条件

独立した臨床レビューは実施されていません。

このインターフェースは独自に作成した翻訳であり、公式版や認証済みの版ではありません。独立した臨床レビュー、専門家による言語レビュー、評価尺度等の権利許諾の確認は実施されていません。

式または分類の結果です。解釈、対応、適用可能性は専門家による評価と選択した出典に依存します。

## ライセンスと帰属表示

Apache-2.0はELUCENIAのコードにのみ適用されます。評価尺度等、出版物、翻訳、データの権利は、それぞれの権利者に帰属します。LICENSEとNOTICEを保持してください。

ELUCENIA · Felipe Guedes · Copyright © 2026

## 記録された結果

以下の情報は、合成例に対する手法の出力を保持したものです。独立した臨床的検証を示すものではありません。

### 1

高強度：132～167 bpm（予備能の60～89%）

| 結果の詳細 | |
| --- | --- |
| 最大心拍数（Tanaka: 208 − 0.7 × 年齢） | 180 bpm |
| 予備心拍数 | 120 bpm |
| 非常に軽い（< 30%） | < 96 bpm |
| 軽い（30～39%） | 96–107 bpm |
| 中等度（40～59%） | 108–131 bpm |
| 高強度（60～89%） | 132–167 bpm |
| 最大に近い（≥ 90%） | ≥ 168 bpm |

β遮断薬使用時、心疾患がある場合、またはアスリートでは、運動負荷試験または心肺運動負荷試験で測定した最大心拍数を優先してください。


### 2

高強度：142～177 bpm（予備能の60～89%）

| 結果の詳細 | |
| --- | --- |
| 最大心拍数（測定値） | 190 bpm |
| 予備心拍数 | 120 bpm |
| 非常に軽い（< 30%） | < 106 bpm |
| 軽い（30～39%） | 106–117 bpm |
| 中等度（40～59%） | 118–141 bpm |
| 高強度（60～89%） | 142–177 bpm |
| 最大に近い（≥ 90%） | ≥ 178 bpm |

