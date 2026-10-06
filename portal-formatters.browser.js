/* Copyright (c) 2026 ELUCENIA · Felipe Guedes. Public per-tool support only; preserve LICENSE/NOTICE and separate instrument rights. */
(function(){"use strict";const factories={"locale-number-format.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uiNumberingSystem = uiNumberingSystem;
exports.localeNumberFormat = localeNumberFormat;
exports.localeDateTimeFormat = localeDateTimeFormat;
// ELUCENIA display convention: deterministic native Arabic digits; Latin digits in the other nine UI locales.
// Intl still determines localized separators, wording and precision from the unchanged caller options.
function uiNumberingSystem(locale) { return locale.split('-')[0].toLowerCase() === 'ar' ? 'arab' : 'latn'; }
function localeNumberFormat(locale, options = {}) { return new Intl.NumberFormat(locale, { ...options, numberingSystem: uiNumberingSystem(locale) }); }
function localeDateTimeFormat(locale, options = {}) { return new Intl.DateTimeFormat(locale, { ...options, numberingSystem: uiNumberingSystem(locale) }); }

},
"numeric-input.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLocalizedDecimal = parseLocalizedDecimal;
exports.requiredDecimal = requiredDecimal;
const locale_number_format_1 = require("./locale-number-format");
function normalizedDigits(raw) {
    return raw.normalize('NFKC')
        .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 0x660))
        .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 0x6f0))
        .replace(/[०-९]/g, digit => String(digit.charCodeAt(0) - 0x966))
        .replace(/\u066b/g, ',')
        .replace(/\u2212/g, '-')
        .replace(/[\u061c\u200e\u200f]/g, '');
}
/** Parse locale grouping and decimal notation; blank and malformed values are never zero. */
function parseLocalizedDecimal(raw, locale) {
    let normalized = normalizedDigits(raw.trim());
    if (!normalized)
        return null;
    if (locale) {
        const format = (0, locale_number_format_1.localeNumberFormat)(locale);
        const parts = format.formatToParts(123456789.5);
        const group = normalized.includes('٬') ? '٬' : normalizedDigits(parts.find(part => part.type === 'group')?.value || '');
        const decimal = raw.includes('٫') ? ',' : normalizedDigits(parts.find(part => part.type === 'decimal')?.value || '.');
        if (group && normalized.includes(group)) {
            const unsigned = normalized.replace(/^[+-]/, '');
            const pieces = unsigned.split(decimal);
            // The comma is also accepted as an ungrouped decimal on dot-decimal
            // keyboards. A valid locale group, however, always retains its meaning.
            const integer = pieces[0], groups = integer.split(group);
            const integers = parts.filter(part => part.type === 'integer').map(part => normalizedDigits(part.value));
            const middleSize = integers.length > 2 ? integers[integers.length - 2].length : 3;
            const grouped = groups.length > 1 && /^[1-9]\d*$/.test(groups[0]) && groups[0].length <= middleSize &&
                groups.slice(1, -1).every(part => new RegExp('^\\d{' + middleSize + '}$').test(part)) && /^\d{3}$/.test(groups.at(-1) || '') &&
                pieces.length <= 2 && (pieces.length === 1 || /^\d+$/.test(pieces[1]));
            if (grouped)
                normalized = normalized.split(group).join('').replace(decimal, '.');
            else if (groups.length > 2 || pieces.length > 2 || group === ' ' || group === '٬' ||
                groups.length === 2 && /^\d{3}$/.test(groups[1]) && groups[0] !== '0')
                return NaN;
        }
    }
    if (!/^[+-]?\d+(?:[.,]\d+)?$/.test(normalized))
        return NaN;
    return Number(normalized.replace(',', '.'));
}
function requiredDecimal(data, name, min, max, locale) {
    const value = data.get(name);
    const parsed = parseLocalizedDecimal(typeof value === 'string' ? value : '', locale);
    if (parsed === null || !Number.isFinite(parsed) || parsed < min || parsed > max) {
        throw new RangeError(name);
    }
    return parsed;
}

},
"calculator-result-localization.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultLabelText = resultLabelText;
exports.resultValueText = resultValueText;
exports.resultUnitText = resultUnitText;
exports.resultTitleText = resultTitleText;
const locale_number_format_1 = require("./locale-number-format");
const numberPattern = '[+-]?(?:[1-9]\\d{0,2}(?:\\.\\d{3})+|\\d+)(?:,\\d+)?';
const numberRegex = new RegExp('^' + numberPattern + '$');
function numberToken(source) {
    if (!numberRegex.test(source))
        return null;
    const value = Number(source.replaceAll('.', '').replace(',', '.'));
    return Number.isFinite(value) ? { value, digits: source.split(',')[1]?.length || 0 } : null;
}
function numberText(source, locale, percent = false) {
    const n = numberToken(source);
    if (!n || n.digits > 20)
        return null;
    const formatter = (0, locale_number_format_1.localeNumberFormat)(locale, { useGrouping: false, minimumFractionDigits: n.digits, maximumFractionDigits: n.digits, ...(source.startsWith('+') ? { signDisplay: 'always' } : {}), ...(percent ? { style: 'percent', } : {}) });
    // ECMA-402 accepts an exact decimal string. Preserve authored decimal digits;
    // the percent branch deliberately retains its existing numerical contract.
    const format = formatter.format;
    return format(percent ? n.value / 100 : source.replaceAll('.', '').replace(',', '.'));
}
function authored(text, locale, template, sourceNumbers) { return { text, locale, template, ...(sourceNumbers ? { sourceNumbers } : {}) }; }
function fallback(source, locale, exact, neutral = false) {
    if (locale === 'pt-BR')
        return authored(source, locale, 'source');
    const translated = exact?.[source];
    if (translated)
        return authored(translated, locale, 'exact-authored');
    return authored(source, neutral ? locale : 'pt-BR', neutral ? 'neutral' : 'source-language-fallback');
}
const terms = {
    en: { sensitivity: 'Sensitivity', rr: 'Relative risk (RR)', or: 'Odds ratio (OR)', ci: '95% CI', oneIn: n => '1 in ' + n, points: n => n + ' points' },
    es: { sensitivity: 'Sensibilidad', rr: 'Riesgo relativo (RR)', or: 'Odds ratio (OR)', ci: 'IC del 95%', oneIn: n => '1 de cada ' + n, points: n => n + ' puntos' },
    fr: { sensitivity: 'Sensibilité', rr: 'Risque relatif (RR)', or: 'Odds ratio (OR)', ci: 'IC à 95 %', oneIn: n => '1 sur ' + n, points: n => n + ' points' },
    de: { sensitivity: 'Sensitivität', rr: 'Relatives Risiko (RR)', or: 'Odds Ratio (OR)', ci: '95%-Konfidenzintervall', oneIn: n => '1 von ' + n, points: n => n + ' Punkte' },
    it: { sensitivity: 'Sensibilità', rr: 'Rischio relativo (RR)', or: 'Odds ratio (OR)', ci: 'IC al 95%', oneIn: n => '1 su ' + n, points: n => n + ' punti' },
    ar: { sensitivity: 'الحساسية', rr: 'الخطر النسبي (RR)', or: 'نسبة الأرجحية (OR)', ci: 'فاصل الثقة ٩٥٪', oneIn: n => '١ من كل ' + n, points: n => n + ' نقطة' },
    zh: { sensitivity: '灵敏度', rr: '相对风险（RR）', or: '比值比（OR）', ci: '95%置信区间', oneIn: n => '每' + n + '中有1', points: n => n + '分' },
    ja: { sensitivity: '感度', rr: '相対リスク（RR）', or: 'オッズ比（OR）', ci: '95%信頼区間', oneIn: n => n + 'につき1', points: n => n + '点' },
    hi: { sensitivity: 'संवेदनशीलता', rr: 'रिलेटिव रिस्क (RR)', or: 'ऑड्स रेशियो (OR)', ci: '95% विश्वास अंतराल', oneIn: n => n + ' में 1', points: n => n + ' अंक' },
};
const scientificLabels = { "acr-ti-rads": ["ACR TI-RADS"], "apache-ii": ["APACHE II"], "apri": ["APRI"], "ariscat": ["ARISCAT"], "audit": ["AUDIT"], "bed-e-eqd2": ["EQD2"], "cdai-sdai": ["CDAI"], "gold-dpoc": ["GOLD 2026"], "criterios-acr-eular-artrite-reumatoide": ["ACR/EULAR 2010"], "criterios-acr-eular-gota": ["ACR/EULAR 2015"], "cts-6": ["CTS-6"], "curb-65": ["CURB-65"], "das28": [], "easi": ["EASI"], "rass": ["RASS"], "gds-15": ["GDS-15"], "escala-de-edimburgo-epds": ["EPDS"], "escala-lanss": ["LANSS"], "gad-7": ["GAD-7"], "abcd2": ["ABCD²"], "bisap": ["BISAP"], "escore-twist": ["TWIST"], "fib-4": ["FIB-4"], "findrisc": ["FINDRISC"], "has-bled": ["HAS-BLED"], "homa-ir": ["HOMA-IR"], "ibutg": [], "indice-de-risco-cardiaco-revisado": ["RCRI"], "indice-de-van-nuys": ["USC/VNPI"], "ipi-linfoma": ["IPI"], "ipss": ["IPSS"], "escore-macis": ["MACIS"], "escore-mess": ["MESS"], "news2": ["NEWS2"], "nihss": ["NIHSS"], "numero-necessario-para-tratar": ["NNT"], "nrs-2002": ["NRS-2002"], "pasi": ["PASI"], "pediatric-appendicitis-score": ["PAS"], "psi-port": ["PSI/PORT"], "cage": ["CAGE"], "phq-9": ["PHQ-9"], "scorad": ["SCORAD"], "srq-20": ["SRQ-20"], "uas7": ["UAS7"] };
const ciRegex = new RegExp('^(Sensibilidade|Risco relativo \\(RR\\)|Odds ratio \\(OR\\)) \\(IC 95%: (' + numberPattern + ')(%)? a (' + numberPattern + ')(%)?\\)$');
function resultLabelText(id, source, locale, exact) {
    if (locale !== 'pt-BR') {
        const m = ciRegex.exec(source), allowed = m && (id === 'teste-diagnostico-2x2' && m[1] === 'Sensibilidade' && m[3] === '%' && m[5] === '%' || id === 'risco-relativo-e-odds-ratio' && m[1] !== 'Sensibilidade' && !m[3] && !m[5]);
        if (allowed) {
            const lo = numberToken(m[2]), hi = numberToken(m[4]), a = numberText(m[2], locale, Boolean(m[3])), b = numberText(m[4], locale, Boolean(m[5]));
            if (lo && hi && a !== null && b !== null) {
                const t = terms[locale], name = m[1] === 'Sensibilidade' ? t.sensitivity : m[1].startsWith('Risco') ? t.rr : t.or;
                return authored(name + ' (' + t.ci + ': ' + a + '–' + b + ')', locale, 'confidence-interval', [95, lo.value, hi.value]);
            }
        }
    }
    return fallback(source, locale, exact, (scientificLabels[id] || []).includes(source));
}
function durationText(locale, parts) {
    const values = parts.map(([value, unit]) => (0, locale_number_format_1.localeNumberFormat)(locale, { style: 'unit', unit, unitDisplay: 'long', useGrouping: false, maximumFractionDigits: 0 }).format(value));
    return new Intl.ListFormat(locale, { style: 'long', type: 'unit' }).format(values);
}
function neutralValue(id, source) {
    if (source === '∞')
        return true;
    if (id === 'escala-de-ashworth-modificada' && source === '1+')
        return true;
    if (id === 'acr-ti-rads' && /^TR[1-5]$/.test(source))
        return true;
    if (['escala-de-house-brackmann', 'sistema-de-bethesda-tireoide'].includes(id) && /^(I|II|III|IV|V|VI)$/.test(source))
        return true;
    if (id === 'tokyo-2018-colecistite' && /^(I|II|III)$/.test(source))
        return true;
    if (id === 'classificacao-de-tubiana' && source === 'N')
        return true;
    if (id === 'gold-dpoc' && /^GOLD [1-4] \/ [ABE]$/.test(source))
        return true;
    if (id === 'ecog-karnofsky' && /^ECOG [0-5]$/.test(source))
        return true;
    if (id === 'escala-de-coma-de-glasgow' && /^E(?:[1-4]|NT) V(?:[1-5]|NT) M(?:[1-6]|NT)$/.test(source))
        return true;
    if (id === 'criterios-de-framingham-ic' && /^\d+ \+ \d+$/.test(source))
        return true;
    if (id === 'classificacao-de-forrest' && /^(Ia|Ib|IIa|IIb|IIc|III)$/.test(source))
        return true;
    if (id === 'estadiamento-kdigo' && /^G[1-5](?:a|b)? A[1-3]$/.test(source))
        return true;
    return false;
}
function resultValueText(id, input, locale, exact) {
    const source = String(input);
    if (typeof input === 'number' && Number.isFinite(input))
        return authored((0, locale_number_format_1.localeNumberFormat)(locale, { maximumFractionDigits: 20 }).format(input), locale, 'numeric-primitive', [input]);
    if (locale === 'pt-BR')
        return authored(source, locale, 'source');
    const n = numberToken(source), plain = n && numberText(source, locale);
    if (n && plain !== null)
        return authored(plain, locale, 'numeric', [n.value]);
    const pct = new RegExp('^(' + numberPattern + ')%$').exec(source);
    if (pct) {
        const n = numberToken(pct[1]), v = numberText(pct[1], locale, true);
        if (n && v !== null)
            return authored(v, locale, 'percentage', [n.value]);
    }
    if (['hardy-weinberg', 'risco-de-trissomia-21-pela-idade-materna'].includes(id)) {
        const m = /^1 em (\d{1,3}(?:\.\d{3})*|\d+)$/.exec(source);
        if (m) {
            const n = numberToken(m[1]), v = numberText(m[1], locale);
            if (n && v !== null)
                return authored(terms[locale].oneIn(v), locale, 'one-in-denominator', [1, n.value]);
        }
    }
    if (['idade-corrigida-do-prematuro', 'idade-gestacional-e-dpp', 'idade-gestacional-pelo-ccn', 'metodo-de-capurro'].includes(id)) {
        const m = /^(\d+)s (\d+)d$/.exec(source);
        if (m) {
            const weeks = Number(m[1]), days = Number(m[2]);
            if (Number.isSafeInteger(weeks) && Number.isSafeInteger(days) && days <= 6)
                return authored(durationText(locale, [[weeks, 'week'], [days, 'day']]), locale, 'weeks-days', [weeks, days]);
        }
    }
    if (id === 'idade-corrigida-do-prematuro') {
        const m = /^(?:(\d+) anos?, )?(?:(\d+) m(?:ês|eses) e )?(\d+) dias?$/.exec(source);
        if (m) {
            const parts = [];
            if (m[1])
                parts.push([Number(m[1]), 'year']);
            if (m[2])
                parts.push([Number(m[2]), 'month']);
            parts.push([Number(m[3]), 'day']);
            if (parts.every(([n]) => Number.isSafeInteger(n)))
                return authored(durationText(locale, parts), locale, 'calendar-age', parts.map(([n]) => n));
        }
    }
    if (['ganho-de-peso-gestacional', 'zonas-de-treino-karvonen'].includes(id)) {
        const m = new RegExp('^(' + numberPattern + ')(?: a |–)(' + numberPattern + ')$').exec(source);
        if (m) {
            const a = numberToken(m[1]), b = numberToken(m[2]), at = numberText(m[1], locale), bt = numberText(m[2], locale);
            if (a && b && at !== null && bt !== null)
                return authored(at + '–' + bt, locale, 'numeric-range', [a.value, b.value]);
        }
    }
    return fallback(source, locale, exact, neutralValue(id, source));
}
function pointsText(locale, formatted, value) {
    const category = new Intl.PluralRules(locale).select(value), one = category === 'one';
    if (locale === 'ar')
        return category === 'two' ? 'نقطتان (' + formatted + ')' : formatted + ' ' + (category === 'zero' || category === 'few' ? 'نقاط' : 'نقطة');
    const nouns = { en: one ? 'point' : 'points', es: one ? 'punto' : 'puntos', fr: one ? 'point' : 'points', de: one ? 'Punkt' : 'Punkte', it: one ? 'punto' : 'punti', zh: '分', ja: '点', hi: 'अंक' };
    return formatted + (locale === 'zh' || locale === 'ja' ? '' : ' ') + nouns[locale];
}
function resultUnitText(id, source, locale, exact) {
    if (locale !== 'pt-BR' && id === 'psi-port') {
        const m = /^(\d+) pontos?$/.exec(source);
        if (m) {
            const n = numberToken(m[1]), v = numberText(m[1], locale);
            if (n && v !== null)
                return authored(pointsText(locale, v, n.value), locale, 'score-points', [n.value]);
        }
    }
    if (locale !== 'pt-BR' && source === 'mL/min/1,73 m²') {
        const index = numberText('1,73', locale);
        if (index !== null)
            return authored('mL/min/' + index + ' m²', locale, 'indexed-surface-unit', [1.73]);
    }
    const neutral = new Set(["", "%", "/µL", "D", "Gy", "L", "METs", "cm", "cmH₂O", "cm²", "g", "g/L", "g/m²", "kcal", "kg", "kg/m²", "logMAR", "m", "mEq/L", "mL", "mL/h", "mL/min", "mOsm", "mOsm/L", "mcg/kg/min", "mcg/min", "mg", "mg/L", "mg/dL", "mm", "mmHg", "mmol/L", "ms", "m²", "ng/mL/cm³", "pH", "°C", "µmol/L"]).has(source);
    return fallback(source, locale, exact, neutral);
}
function resultTitleText(title, titleLocale) {
    const allowed = ['pt-BR', 'en', 'es', 'fr', 'de', 'it', 'ar', 'zh', 'ja', 'hi'];
    return authored(title, allowed.includes(titleLocale || '') ? titleLocale : 'pt-BR', 'title-metadata');
}

},
"calculator-locale.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatorCopy = void 0;
exports.calculatorLocale = calculatorLocale;
// Shared interface copy. Clinical text is injected per tool from reviewed
// editions; the private preview can display explicitly unreviewed drafts.
exports.calculatorCopy = {
    'pt-BR': { select: 'Selecione', yes: 'Sim', no: 'Não', optional: 'opcional', numeric: 'Valor numérico', range: 'intervalo', calculate: 'Calcular', calculating: 'Calculando…', clear: 'Limpar', heading: 'Calcular com transparência', intro: 'Confira população, unidades e versão. O resultado apresenta a fórmula ou classificação, sem decisão terapêutica automática.', restricted: 'Ficha disponível para consulta', restrictedNote: 'Cálculo suspenso nesta edição. O inventário, a pendência e as fontes permanecem públicos.', resultNote: 'Resultado da fórmula ou classificação. Interpretação, conduta e aplicabilidade dependem da avaliação profissional e da fonte selecionada.', invalid: 'Não foi possível calcular com esses valores. Confira as condições de uso.', unavailable: 'O serviço de cálculo está indisponível. Tente novamente.', connection: 'Não foi possível consultar o serviço de cálculo. Verifique a conexão e tente novamente.', check: 'Confira os valores informados.', fleischner: 'Antes de calcular: referência para nódulos pulmonares incidentais. As recomendações não se aplicam a pessoas com menos de 35 anos, rastreamento de câncer de pulmão, imunossupressão ou câncer primário conhecido.', cfsRecordingIntro: "Selecione o nível CFS já atribuído por avaliação clínica. Este formulário registra o nível escolhido; não realiza uma avaliação clínica automática." },
    en: { select: 'Select', yes: 'Yes', no: 'No', optional: 'optional', numeric: 'Numeric value', range: 'range', calculate: 'Calculate', calculating: 'Calculating…', clear: 'Clear', heading: 'Calculate with transparency', intro: 'Check the population, units and version. The result shows the formula or classification; it does not make an automatic treatment decision.', restricted: 'Record available for reference', restrictedNote: 'Calculation is suspended in this release. The inventory, outstanding review and sources remain public.', resultNote: 'Formula or classification result. Interpretation, care and applicability depend on professional assessment and the selected source.', invalid: 'Unable to calculate with these values. Check the conditions of use.', unavailable: 'The calculation service is unavailable. Try again.', connection: 'Unable to reach the calculation service. Check your connection and try again.', check: 'Check the values entered.', fleischner: 'Before calculating: reference for incidental pulmonary nodules. The recommendations do not apply to people under 35, lung cancer screening, immunosuppression or known primary cancer.', cfsRecordingIntro: "Select the CFS level already assigned through clinical assessment. This form records the selected level; it does not perform an automatic clinical assessment." },
    es: { select: 'Seleccione', yes: 'Sí', no: 'No', optional: 'opcional', numeric: 'Valor numérico', range: 'intervalo', calculate: 'Calcular', calculating: 'Calculando…', clear: 'Limpiar', heading: 'Calcular con transparencia', intro: 'Compruebe la población, las unidades y la versión. El resultado presenta la fórmula o clasificación, sin decisión terapéutica automática.', restricted: 'Ficha disponible para consulta', restrictedNote: 'Cálculo suspendido en esta edición. El inventario, la revisión pendiente y las fuentes siguen siendo públicos.', resultNote: 'Resultado de la fórmula o clasificación. La interpretación, la conducta y la aplicabilidad dependen de la evaluación profesional y de la fuente seleccionada.', invalid: 'No se puede calcular con estos valores. Compruebe las condiciones de uso.', unavailable: 'El servicio de cálculo no está disponible. Inténtelo de nuevo.', connection: 'No se pudo consultar el servicio de cálculo. Compruebe la conexión e inténtelo de nuevo.', check: 'Compruebe los valores introducidos.', fleischner: 'Antes de calcular: referencia para nódulos pulmonares incidentales. Las recomendaciones no se aplican a menores de 35 años, cribado de cáncer de pulmón, inmunosupresión o cáncer primario conocido.', cfsRecordingIntro: "Seleccione el nivel CFS ya asignado mediante evaluación clínica. Este formulario registra el nivel seleccionado; no realiza una evaluación clínica automática." },
    fr: { select: 'Sélectionner', yes: 'Oui', no: 'Non', optional: 'facultatif', numeric: 'Valeur numérique', range: 'intervalle', calculate: 'Calculer', calculating: 'Calcul en cours…', clear: 'Effacer', heading: 'Calculer en toute transparence', intro: 'Vérifiez la population, les unités et la version. Le résultat présente la formule ou la classification, sans décision thérapeutique automatique.', restricted: 'Fiche disponible à la consultation', restrictedNote: 'Calcul suspendu dans cette version. L’inventaire, la révision en attente et les sources restent publics.', resultNote: 'Résultat de la formule ou de la classification. L’interprétation, la conduite et l’applicabilité dépendent de l’évaluation professionnelle et de la source sélectionnée.', invalid: 'Calcul impossible avec ces valeurs. Vérifiez les conditions d’utilisation.', unavailable: 'Le service de calcul est indisponible. Réessayez.', connection: 'Impossible de joindre le service de calcul. Vérifiez la connexion et réessayez.', check: 'Vérifiez les valeurs saisies.', fleischner: 'Avant le calcul : référence pour les nodules pulmonaires fortuits. Les recommandations ne s’appliquent pas aux personnes de moins de 35 ans, au dépistage du cancer du poumon, à l’immunosuppression ou à un cancer primitif connu.', cfsRecordingIntro: "Sélectionnez le niveau CFS déjà attribué lors de l’évaluation clinique. Ce formulaire enregistre le niveau choisi ; il ne réalise pas d’évaluation clinique automatique." },
    de: { select: 'Auswählen', yes: 'Ja', no: 'Nein', optional: 'optional', numeric: 'Numerischer Wert', range: 'Bereich', calculate: 'Berechnen', calculating: 'Berechnung läuft…', clear: 'Löschen', heading: 'Transparent berechnen', intro: 'Prüfen Sie Population, Einheiten und Version. Das Ergebnis zeigt die Formel oder Klassifikation, ohne automatisch eine Therapieentscheidung zu treffen.', restricted: 'Eintrag zur Einsicht verfügbar', restrictedNote: 'Die Berechnung ist in dieser Version ausgesetzt. Inventar, ausstehende Prüfung und Quellen bleiben öffentlich.', resultNote: 'Ergebnis der Formel oder Klassifikation. Interpretation, Vorgehen und Anwendbarkeit hängen von der fachlichen Beurteilung und der ausgewählten Quelle ab.', invalid: 'Berechnung mit diesen Werten nicht möglich. Prüfen Sie die Nutzungsbedingungen.', unavailable: 'Der Berechnungsdienst ist nicht verfügbar. Versuchen Sie es erneut.', connection: 'Der Berechnungsdienst ist nicht erreichbar. Prüfen Sie die Verbindung und versuchen Sie es erneut.', check: 'Prüfen Sie die eingegebenen Werte.', fleischner: 'Vor der Berechnung: Referenz für zufällig entdeckte Lungenrundherde. Die Empfehlungen gelten nicht für Personen unter 35 Jahren, Lungenkrebs-Screening, Immunsuppression oder bekannten Primärkrebs.', cfsRecordingIntro: "Wählen Sie die bereits durch klinische Beurteilung zugewiesene CFS-Stufe. Dieses Formular erfasst die ausgewählte Stufe; es führt keine automatische klinische Beurteilung durch." },
    it: { select: 'Seleziona', yes: 'Sì', no: 'No', optional: 'facoltativo', numeric: 'Valore numerico', range: 'intervallo', calculate: 'Calcola', calculating: 'Calcolo in corso…', clear: 'Cancella', heading: 'Calcolare con trasparenza', intro: 'Verifica popolazione, unità e versione. Il risultato mostra la formula o la classificazione, senza una decisione terapeutica automatica.', restricted: 'Scheda disponibile per consultazione', restrictedNote: 'Calcolo sospeso in questa versione. Inventario, revisione in sospeso e fonti rimangono pubblici.', resultNote: 'Risultato della formula o classificazione. Interpretazione, condotta e applicabilità dipendono dalla valutazione professionale e dalla fonte selezionata.', invalid: 'Impossibile calcolare con questi valori. Verifica le condizioni d’uso.', unavailable: 'Il servizio di calcolo non è disponibile. Riprova.', connection: 'Impossibile contattare il servizio di calcolo. Verifica la connessione e riprova.', check: 'Verifica i valori inseriti.', fleischner: 'Prima del calcolo: riferimento per noduli polmonari incidentali. Le raccomandazioni non si applicano a persone di età inferiore a 35 anni, screening del cancro del polmone, immunosoppressione o tumore primario noto.', cfsRecordingIntro: "Selezionare il livello CFS già attribuito mediante valutazione clinica. Questo modulo registra il livello scelto; non esegue una valutazione clinica automatica." },
    ar: { select: 'اختر', yes: 'نعم', no: 'لا', optional: 'اختياري', numeric: 'قيمة رقمية', range: 'النطاق', calculate: 'احسب', calculating: 'جارٍ الحساب…', clear: 'مسح', heading: 'حساب بشفافية', intro: 'تحقق من الفئة السكانية والوحدات والإصدار. تعرض النتيجة المعادلة أو التصنيف دون اتخاذ قرار علاجي تلقائي.', restricted: 'السجل متاح للاطلاع', restrictedNote: 'الحساب معلّق في هذا الإصدار. يظل السجل والمراجعة المعلّقة والمصادر متاحة للعامة.', resultNote: 'نتيجة المعادلة أو التصنيف. يعتمد التفسير والتصرف ومدى الانطباق على التقييم المهني والمصدر المحدد.', invalid: 'تعذر الحساب بهذه القيم. تحقق من شروط الاستخدام.', unavailable: 'خدمة الحساب غير متاحة. حاول مرة أخرى.', connection: 'تعذر الاتصال بخدمة الحساب. تحقق من الاتصال وحاول مرة أخرى.', check: 'تحقق من القيم المدخلة.', fleischner: 'قبل الحساب: مرجع للعقيدات الرئوية المكتشفة عرضًا. لا تنطبق التوصيات على من هم دون 35 عامًا، أو فحص سرطان الرئة، أو كبت المناعة، أو وجود سرطان أولي معروف.', cfsRecordingIntro: "اختر مستوى CFS الذي حُدد بالفعل بالتقييم السريري. يسجّل هذا النموذج المستوى المختار، ولا يُجري تقييمًا سريريًا تلقائيًا." },
    zh: { select: '请选择', yes: '是', no: '否', optional: '选填', numeric: '数值', range: '范围', calculate: '计算', calculating: '计算中…', clear: '清除', heading: '透明计算', intro: '请核对适用人群、单位和版本。结果展示公式或分类，不自动作出治疗决定。', restricted: '可查阅工具记录', restrictedNote: '本版本暂停计算。清单、待审事项和来源仍公开。', resultNote: '公式或分类结果。解释、处理及适用性须结合专业评估和所选来源。', invalid: '无法使用这些数值计算。请核对使用条件。', unavailable: '计算服务暂不可用。请重试。', connection: '无法连接计算服务。请检查网络后重试。', check: '请检查输入值。', fleischner: '计算前：此参考适用于偶然发现的肺结节。建议不适用于35岁以下人群、肺癌筛查、免疫抑制或已知原发性癌症患者。', cfsRecordingIntro: "请选择经临床评估已确定的CFS等级。本表单记录所选等级，不会自动进行临床评估。" },
    ja: { select: '選択', yes: 'はい', no: 'いいえ', optional: '任意', numeric: '数値', range: '範囲', calculate: '計算', calculating: '計算中…', clear: 'クリア', heading: '根拠を明示して計算', intro: '対象集団、単位、版を確認してください。結果は式または分類を示すもので、治療方針を自動決定しません。', restricted: '記録を参照できます', restrictedNote: 'この版では計算を停止しています。目録、未完了の審査、出典は公開されています。', resultNote: '式または分類の結果です。解釈、対応、適用可能性は専門家による評価と選択した出典に依存します。', invalid: 'この値では計算できません。使用条件を確認してください。', unavailable: '計算サービスを利用できません。再試行してください。', connection: '計算サービスに接続できません。接続を確認して再試行してください。', check: '入力値を確認してください。', fleischner: '計算前：偶発的に発見された肺結節に関する参考です。35歳未満、肺がん検診、免疫抑制、既知の原発がんには推奨を適用できません。', cfsRecordingIntro: "臨床評価によってすでに判定されたCFSレベルを選択してください。このフォームは選択されたレベルを記録するもので、自動的な臨床評価は行いません。" },
    hi: { select: 'चुनें', yes: 'हाँ', no: 'नहीं', optional: 'वैकल्पिक', numeric: 'संख्यात्मक मान', range: 'सीमा', calculate: 'गणना करें', calculating: 'गणना जारी है…', clear: 'साफ़ करें', heading: 'पारदर्शिता के साथ गणना', intro: 'जनसमूह, इकाइयाँ और संस्करण जाँचें। परिणाम सूत्र या वर्गीकरण दिखाता है; यह स्वतः उपचार संबंधी निर्णय नहीं देता।', restricted: 'रिकॉर्ड देखने के लिए उपलब्ध है', restrictedNote: 'इस संस्करण में गणना रुकी हुई है। सूची, लंबित समीक्षा और स्रोत सार्वजनिक हैं।', resultNote: 'सूत्र या वर्गीकरण का परिणाम। व्याख्या, कार्यवाही और उपयुक्तता पेशेवर मूल्यांकन और चुने गए स्रोत पर निर्भर है।', invalid: 'इन मानों से गणना नहीं हो सकी। उपयोग की शर्तें जाँचें।', unavailable: 'गणना सेवा उपलब्ध नहीं है। फिर प्रयास करें।', connection: 'गणना सेवा से संपर्क नहीं हो सका। कनेक्शन जाँचकर फिर प्रयास करें।', check: 'दर्ज मान जाँचें।', fleischner: 'गणना से पहले: आकस्मिक रूप से पाए गए फेफड़ों के नोड्यूल के लिए संदर्भ। सिफ़ारिशें 35 वर्ष से कम आयु, फेफड़ों के कैंसर की स्क्रीनिंग, प्रतिरक्षा दमन या ज्ञात प्राथमिक कैंसर पर लागू नहीं होतीं।', cfsRecordingIntro: "नैदानिक आकलन से पहले ही निर्धारित CFS स्तर चुनें। यह फ़ॉर्म चुना गया स्तर दर्ज करता है; अपने आप नैदानिक आकलन नहीं करता।" },
};
function calculatorLocale(value) { return Object.prototype.hasOwnProperty.call(exports.calculatorCopy, value) ? value : 'pt-BR'; }

},
"calculator-result-narratives.ts":function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plainResultText = plainResultText;
exports.resultNarrativeText = resultNarrativeText;
exports.documentedResult = documentedResult;
const calculator_result_localization_1 = require("./calculator-result-localization");
function plainResultText(value) {
    const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
    return String(value).replace(/<\/?(?:a|b|br|div|em|i|li|ol|p|small|span|strong|sub|sup|table|tbody|td|th|thead|tr|u|ul)(?=[\s/>])[^<>]*>/gi, ' ').replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code) => {
        if (!code.startsWith('#'))
            return entities[code.toLowerCase()] ?? entity;
        const number = code[1].toLowerCase() === 'x' ? Number.parseInt(code.slice(2), 16) : Number.parseInt(code.slice(1), 10);
        return number >= 0 && number <= 0x10ffff ? String.fromCodePoint(number) : entity;
    }).replace(/\s+/g, ' ').trim();
}
const numericSource = '[+-]?(?:[0-9]{1,3}(?:\\.[0-9]{3})+|[0-9]+)(?:,[0-9]+)?';
const escaped = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const compiled = new WeakMap();
function templatesFor(templates, area) {
    let grouped = compiled.get(templates);
    if (!grouped) {
        grouped = new Map();
        for (const template of templates) {
            const tokens = [], parts = template.source.split(/(\{\{n[1-9][0-9]*\}\})/g), pattern = parts.map(part => { if (/^\{\{n[1-9][0-9]*\}\}$/.test(part)) {
                tokens.push(part);
                return '(' + numericSource + ')';
            } return escaped(part); }).join('');
            const entries = grouped.get(template.area) || [];
            entries.push({ template, pattern: new RegExp('^' + pattern + '$'), tokens });
            grouped.set(template.area, entries);
        }
        compiled.set(templates, grouped);
    }
    return grouped.get(area) || [];
}
// Exact whole-source templates are scoped by tool and output area. We never
// translate an unknown clinical phrase by substring replacement or invent a band.
function resultNarrativeText(id, area, value, locale, templates = []) {
    const source = plainResultText(value);
    if (locale === 'pt-BR')
        return { text: source, locale, template: 'documented-source' };
    for (const entry of templatesFor(templates, area)) {
        if (entry.template.toolId !== id)
            continue;
        const match = entry.pattern.exec(source);
        if (!match)
            continue;
        let text = entry.template.target;
        const numbers = [];
        for (let i = 0; i < entry.tokens.length; i++) {
            const displayed = (0, calculator_result_localization_1.resultValueText)(id, match[i + 1], locale);
            text = text.replaceAll(entry.tokens[i], displayed.text);
            if (displayed.sourceNumbers)
                numbers.push(...displayed.sourceNumbers);
        }
        return { text: plainResultText(text), locale, template: 'documented-authored-' + entry.template.id, ...(numbers.length ? { sourceNumbers: numbers } : {}) };
    }
    // Numerical or scientifically neutral value rendering uses its existing exact
    // contract. Uncovered words retain an explicit source-language attribution.
    const numeric = (0, calculator_result_localization_1.resultValueText)(id, value, locale);
    if (numeric.locale === locale)
        return numeric;
    return { text: source, locale: 'pt-BR', template: 'documented-source-language-fallback' };
}
function documentedResult(result, id, locale, templates = []) {
    const output = { rows: [] };
    for (const key of ['verdict', 'note']) {
        const value = result[key];
        if (value !== undefined && typeof value !== 'string')
            throw new Error('Invalid documented result ' + key);
        if (typeof value === 'string' && plainResultText(value))
            output[key] = resultNarrativeText(id, key, value, locale, templates);
    }
    if (typeof result.level === 'string' && ['low', 'mid', 'high', 'info'].includes(result.level))
        output.level = result.level;
    if (result.rows !== undefined) {
        if (!Array.isArray(result.rows) || result.rows.length > 200)
            throw new Error('Invalid documented result rows');
        for (let index = 0; index < result.rows.length; index++) {
            const row = result.rows[index];
            if (!Array.isArray(row) || row.length !== 2 || typeof row[0] !== 'string' || !(typeof row[1] === 'string' || typeof row[1] === 'number' && Number.isFinite(row[1])))
                throw new Error('Invalid documented result row');
            output.rows.push({ key: 'documented-' + index, label: resultNarrativeText(id, 'row-label', row[0], locale, templates), value: resultNarrativeText(id, 'row-value', row[1], locale, templates) });
        }
    }
    return output;
}

}},deps={"locale-number-format.ts":{},"numeric-input.ts":{"./locale-number-format":"locale-number-format.ts"},"calculator-result-localization.ts":{"./locale-number-format":"locale-number-format.ts"},"calculator-locale.ts":{},"calculator-result-narratives.ts":{"./calculator-result-localization":"calculator-result-localization.ts"}},cache={};function load(id){if(cache[id])return cache[id].exports;if(!Object.hasOwn(factories,id))throw Error("Unknown fixed module");const m={exports:{}};cache[id]=m;factories[id](m,m.exports,r=>{const d=deps[id]?.[r];if(!d)throw Error("Unsupported fixed import "+r);return load(d);});return m.exports;}globalThis.EluceniaLocaleProof={"locale-number-format.ts":load("locale-number-format.ts"),"numeric-input.ts":load("numeric-input.ts"),"calculator-result-localization.ts":load("calculator-result-localization.ts"),"calculator-locale.ts":load("calculator-locale.ts"),"calculator-result-narratives.ts":load("calculator-result-narratives.ts")};})();
