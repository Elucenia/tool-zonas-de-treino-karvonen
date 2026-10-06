<!-- ELUCENIA technical documentation · zonas-de-treino-karvonen · zh · no clinical/professional/rights approval -->

# 基于储备心率的训练区间（Karvonen）

[条件、来源与许可](https://elucenia.org/zh/tools/zonas-de-treino-karvonen)

## 使用方法

在门户中使用工具，或通过本地 HTTP 服务器打开 index.html。选择语言，填写各字段，然后计算。

## 输入与单位

### 年龄

`idade`

年 · 范围: 10–100

### 静息心率（醒来时）

`fcrep`

次心搏/分钟 · 范围: 30–120

### 试验实测最大心率（如有）

`fcmax`

次心搏/分钟 · 选填 · 范围: 100–230

## 方法版本

Karvonen 1957心率储备；Tanaka 2001最大心率208−0.7年龄；规定强度

## 已记录的公式

目标心率 = 静息心率 + 强度% × (最大心率 − 静息心率).

无试验时最大心率由此式估计 Tanaka: 208 − 0.7 × 年龄.

## 限制与适用人群

Karvonen区间使用静息心率和心率储备；强度必须根据个人及运动情境制定。未经测试时，最大心率是Tanaka2001在健康成人中得出的估计值，而非实测最大值或安全保证。所引ACSM指导针对表面健康的成人；用于慢性疾病或功能限制时，需要适当评估。不要自动将该公式推广至儿童或改变心率反应的情境。

## 参考文献

- [Karvonen MJ, Kentala E, Mustala O. The effects of training on heart rate: a longitudinal study. Ann Med Exp Biol Fenn, 1957.](https://pubmed.ncbi.nlm.nih.gov/13470504/)

- [Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol, 2001.](https://doi.org/10.1016/S0735-1097(00)01054-8)

- [Garber CE et al. Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults. Med Sci Sports Exerc, 2011.](https://doi.org/10.1249/MSS.0b013e318213fefb)

## 复现技术测试

在此仓库的根目录中运行 node test.cjs，以重复已记录的合成案例。原始输入、预期结果和容差保持不变。技术测试不构成临床验证。

```sh
node test.cjs
```

tool.json 包含来源、版本和审查范围。examples.json 保留合成输入与预期结果；results.json 记录实际得到的结果。

[记录与参考文献](../tool.json) · [JavaScript代码](../calculator.js) · [参考案例](../examples.json) · [results.json](../results.json)

## 审查与使用条件

尚未开展独立临床审查。

此界面为自主编写的翻译，并非官方或认证版本。尚未完成独立临床审查、专业语言审查或工具权利授权。

公式或分类结果。解释、处理及适用性须结合专业评估和所选来源。

## 许可与署名

Apache-2.0 仅适用于 ELUCENIA 代码。工具、出版物、翻译和数据的权利仍归各自权利人所有。请保留 LICENSE 和 NOTICE。

ELUCENIA · Felipe Guedes · Copyright © 2026

## 已记录的结果

以下信息保留该方法对合成示例的输出，不构成独立的临床验证。

### 1

剧烈强度：132 至 167 bpm（储备的 60 至 89%）

| 结果详情 | |
| --- | --- |
| 最大心率（Tanaka：208 − 0.7 × 年龄） | 180 bpm |
| 储备心率 | 120 bpm |
| 非常轻度（< 30%） | < 96 bpm |
| 轻度（30 至 39%） | 96–107 bpm |
| 中等（40 至 59%） | 108–131 bpm |
| 剧烈（60 至 89%） | 132–167 bpm |
| 接近最大强度（≥ 90%） | ≥ 168 bpm |

如使用β受体阻滞剂、患有心脏病或为运动员，优先采用在运动平板试验或心肺运动试验中测得的最大心率。


### 2

剧烈强度：142 至 177 bpm（储备的 60 至 89%）

| 结果详情 | |
| --- | --- |
| 最大心率（实测） | 190 bpm |
| 储备心率 | 120 bpm |
| 非常轻度（< 30%） | < 106 bpm |
| 轻度（30 至 39%） | 106–117 bpm |
| 中等（40 至 59%） | 118–141 bpm |
| 剧烈（60 至 89%） | 142–177 bpm |
| 接近最大强度（≥ 90%） | ≥ 178 bpm |

