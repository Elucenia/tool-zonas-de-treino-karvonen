'use strict';
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict'),vm=require('node:vm'),api=require('./calculator.js'),examples=require('./examples.json'),refusals=require('./rejections.json'),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function bits(value) { if (value === null) return null; const b = Buffer.alloc(8); b.writeDoubleBE(value); return b.toString('hex'); }
function compare(actual, expected, tolerance, at, checks, scope) {
  if (typeof expected === 'number') {
    const difference = typeof actual === 'number' ? Math.abs(actual - expected) : null;
    checks.push({ at, expected, obtained: actual ?? null, tolerance, difference, scope, passed: typeof actual === 'number' && Number.isFinite(actual) && difference <= tolerance });
  } else if (Array.isArray(expected)) {
    checks.push({ at: at + '.length', expected: expected.length, obtained: actual?.length ?? null, scope, passed: Array.isArray(actual) && actual.length === expected.length });
    expected.forEach((v, i) => compare(actual?.[i], v, tolerance, at + '[' + i + ']', checks, scope));
  } else if (expected && typeof expected === 'object') {
    for (const [k, v] of Object.entries(expected)) compare(actual?.[k], v, tolerance, at + '.' + k, checks, scope);
  } else checks.push({ at, expected, obtained: actual ?? null, scope, passed: JSON.stringify(actual) === JSON.stringify(expected) });
}
function regression(actual, expected, at, checks) {
  if (typeof expected === 'number') compare(actual, expected, Math.max(1e-10, Math.abs(expected) * 1e-12), at, checks, 'Existing precise source-audit transport regression, not independent formula validation');
  else if (Array.isArray(expected)) {
    checks.push({ at: at + '.length', expected: expected.length, obtained: actual?.length ?? null, passed: Array.isArray(actual) && actual.length === expected.length, scope: 'Existing source-audit transport regression' });
    expected.forEach((v, i) => regression(actual?.[i], v, at + '[' + i + ']', checks));
  } else if (expected && typeof expected === 'object') for (const [k, v] of Object.entries(expected)) regression(actual?.[k], v, at + '.' + k, checks);
  else compare(actual, expected, 0, at, checks, 'Existing source-audit transport regression');
}
function evaluate(task, observation) {
  const checks = [], notCompared = [], expected = task.expected, result = observation.body?.result;
  if (expected.error) {
    checks.push({ at: 'recorded-rejection', expected: '4xx with error and no result', obtained: { status: observation.status, error: observation.body?.error || null, result: !!result }, passed: observation.status >= 400 && observation.status < 500 && !!observation.body?.error && !result });
    if (task.recordedResult?.code) compare(observation.body?.code, task.recordedResult.code, 0, 'error.code', checks, 'Recorded rejection contract');
    return { checks, notCompared };
  }
  checks.push({ at: 'status', expected: 200, obtained: observation.status, passed: observation.status === 200 });
  checks.push({ at: 'result-object', expected: true, obtained: !!result && typeof result === 'object', passed: !!result && typeof result === 'object' });
  if (!result) return { checks, notCompared };
  if (task.kind === 'extra-decimal') {
    compare(result.value, expected.value, 1e-10, 'result.value', checks, 'Previously recorded independent Decimal50 rounded result');
    return { checks, notCompared };
  }
  if (expected.main !== undefined) compare(Array.isArray(expected.main) ? result.main : result.main?.[0], expected.main, expected.tol ?? 1e-8, 'result.main', checks, 'Recorded source reference');
  if (expected.raw) for (const [k, v] of Object.entries(expected.raw)) {
    const decimals = String(v).split('.')[1]?.length || 0;
    const tolerance = expected.tol ?? (typeof v === 'number' && !Number.isInteger(v) ? 0.5 * 10 ** -decimals + 1e-8 : 1e-8);
    compare(result.raw?.[k], v, tolerance, 'result.raw.' + k, checks, 'Recorded rounded source reference');
  }
  if (expected.rawBits) for (const [k, v] of Object.entries(expected.rawBits)) compare(result.raw?.[k] === null ? null : typeof result.raw?.[k] === 'number' ? bits(result.raw[k]) : undefined, v, 0, 'result.rawBits.' + k, checks, 'Recorded IEEE754 bit expectation');
  for (const [k, v] of Object.entries(expected)) {
    if (['error', 'main', 'raw', 'rawBits', 'tol'].includes(k)) continue;
    if (['level', 'meaning', 'verdict', 'note', 'label'].includes(k)) { notCompared.push({ key: k, reason: 'Historical interpretative/explanatory expectation outside the bounded API and outside clinical approval' }); continue; }
    if (k === 'code' && task.id === 'classificacao-de-forrest') compare(result.main?.[0], v, 0, 'result.main[0]:source-category-code', checks, 'Recorded source reference');
    else compare(result.raw?.[k], v, expected.tol ?? 1e-8, 'result.raw.' + k, checks, 'Recorded source reference');
  }
  if (task.recordedResult?.raw) regression(result.raw, task.recordedResult.raw, 'regression.result.raw', checks);
  if (task.recordedResult?.main) compare(result.main, task.recordedResult.main, 0, 'regression.result.main', checks, 'Existing source-audit public representation regression');
  return { checks, notCompared };
}
const pins=require('./package-files.json').files;for(const p of pins){const b=fs.readFileSync(p.path);assert.equal(b.length,p.bytes,p.path);assert.equal(sha(b),p.sha256,p.path);}const browser={Intl,structuredClone};vm.runInNewContext(fs.readFileSync('calculator.browser.js','utf8'),browser,{timeout:10000});assert.deepEqual(JSON.parse(JSON.stringify(browser.EluceniaTool.metadata)),JSON.parse(JSON.stringify(api.metadata)));let checks=0;for(const task of examples){const obtained=api.calculate(structuredClone(task.input)),other=JSON.parse(JSON.stringify(browser.EluceniaTool.calculate(structuredClone(task.input))));assert.deepEqual(other,JSON.parse(JSON.stringify(obtained)),task.name+' packaged Node/browser VM parity');const observation=obtained.error?{status:422,body:obtained}:{status:200,body:{result:obtained}},result=evaluate(task,observation);assert(result.checks.length&&result.checks.every(c=>c.passed),task.name+' '+JSON.stringify(result.checks.filter(c=>!c.passed)));checks+=result.checks.length;}for(const r of refusals){const obtained=api.calculate(structuredClone(r.input));assert(obtained&&obtained.error&&!obtained.main&&!obtained.raw,r.name);assert.equal(obtained.code,r.expected.code,r.name);assert.deepEqual(JSON.parse(JSON.stringify(browser.EluceniaTool.calculate(structuredClone(r.input)))),JSON.parse(JSON.stringify(obtained)),r.name+' rejection parity');checks+=3;}console.log(JSON.stringify({id:api.metadata.id,cases:examples.length,refusals:refusals.length,checks,failed:0,sourceUnchanged:true,clinicalApproval:false,professionalLanguageApproval:false,browserDomVerified:false}));
