import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function modules(fetchImpl = async () => new Response('{}', {status:200}), env = {}) {
  const cache = new Map();
  function load(file) {
    const absolute = path.resolve(file);
    if (cache.has(absolute)) return cache.get(absolute);
    const exports = {}; cache.set(absolute, exports);
    const code = ts.transpileModule(readFileSync(absolute, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
    vm.runInNewContext(code, {exports, process:{env}, Date, Intl, URL, AbortSignal, fetch:fetchImpl, console, require(name) {
      if (!name.startsWith('@/')) return require(name);
      const base=path.resolve('src',name.slice(2));
      return load(base+(existsSync(base+'.ts')?'.ts':'.tsx'));
    }}, {filename:absolute});
    return exports;
  }
  return load;
}
const load = modules();
const { officeStatus, webhookPayload } = load('src/lib/ghl.ts');
const { parseSubmission } = load('src/lib/forms.ts');
const base = {kind:'contact',name:'Example Patient',email:'patient@example.com',phone:'(662) 555-0100',message:'Please call me.',smsConsentVersion:'2026-10-19'};
function submission(extra={}) {const result=parseSubmission({...base,...extra});assert.equal(result.ok,true);return result.data;}
test('Central office hours including exact boundaries, Fridays, weekends and DST',()=>{
  for(const [instant,expected] of [
    ['2026-10-22T13:59:59Z','closed'],['2026-10-22T14:00:00Z','open'],
    ['2026-10-22T21:59:59Z','open'],['2026-10-22T22:00:00Z','closed'],
    ['2026-10-23T15:00:00Z','closed'],['2026-10-24T15:00:00Z','closed'],
    ['2026-10-25T15:00:00Z','closed'],['2026-10-26T14:00:00Z','open'],
    ['2026-11-02T14:59:59Z','closed'],['2026-11-02T15:00:00Z','open'],
    ['2026-11-02T23:00:00Z','closed'],['2026-10-23T05:00:00Z','closed'],
  ]) assert.equal(officeStatus(new Date(instant)),expected,instant);
});
test('all four consent combinations forward complete contact and appointment submissions',async()=>{
  const calls=[];
  const {sendToGhl}=modules(async(url,opts)=>{calls.push({url:String(url),body:JSON.parse(opts.body)});return new Response('{}');},{GHL_CONTACT_WEBHOOK_URL:'https://services.leadconnectorhq.com/contact',GHL_APPOINTMENT_WEBHOOK_URL:'https://services.leadconnectorhq.com/appointment'})('src/lib/ghl.ts');
  for(const kind of ['contact','appointment']) for(const info of [false,true]) for(const marketing of [false,true]) {
    const data=submission({kind,smsInformational:info,smsMarketing:marketing,date:'2026-10-26',time:'Morning',newPatient:'Yes',reason:'Routine checkup',notes:'Please call after lunch.'});
    assert.equal((await sendToGhl(data,'test-id')).ok,true);
    const sent=calls.at(-1);
    assert.equal(sent.url,`https://services.leadconnectorhq.com/${kind}`);
    assert.equal(sent.body.phone,'+16625550100');
    assert.equal(sent.body.sms_informational_consent,info?'yes':'no');
    assert.equal(sent.body.sms_marketing_consent,marketing?'yes':'no');
    assert.ok(sent.body.submission_summary.includes(info?'SMS informational consent: Yes':'SMS informational consent: Not granted'));
    assert.ok(sent.body.submission_summary.includes(kind==='contact'?'Please call me.':'Please call after lunch.'));
  }
  assert.equal(calls.length,8);
});
test('contact without a phone still reaches GHL without granting SMS consent',()=>{
  const payload=webhookPayload(submission({phone:''}),'no-phone');
  assert.equal(payload.phone,undefined);assert.equal(payload.email,'patient@example.com');assert.equal(payload.sms_informational_consent,'no');
});
test('campaign submissions are excluded from the two website workflows',async()=>{
  const {sendToGhl}=modules(()=>{throw new Error('must not send');})('src/lib/ghl.ts');
  assert.equal((await sendToGhl({...submission(),kind:'campaign'},'campaign')).skipped,true);
});
test('missing config, wrong host, network and non-2xx errors are observable without throwing',async()=>{
  const data=submission();
  assert.equal((await modules()('src/lib/ghl.ts').sendToGhl(data,'id')).ok,false);
  assert.equal((await modules(()=>{throw Error('must not send');},{GHL_CONTACT_WEBHOOK_URL:'https://example.com'})('src/lib/ghl.ts').sendToGhl(data,'id')).ok,false);
  for(const fetchImpl of [async()=>new Response('',{status:500}),async()=>{throw Error('timeout');}]) {
    assert.equal((await modules(fetchImpl,{GHL_CONTACT_WEBHOOK_URL:'https://services.leadconnectorhq.com/contact'})('src/lib/ghl.ts').sendToGhl(data,'id')).ok,false);
  }
});
test('displayed and structured office hours agree',()=>{
  const {practice}=load('src/lib/content.ts');
  assert.equal(practice.hours,'Monday to Thursday, 9:00 AM to 5:00 PM');
  assert.equal(practice.hoursNote,'Closed Friday, Saturday and Sunday');
  const schema=readFileSync('src/lib/schema.ts','utf8');
  assert.match(schema,/dayOfWeek: \["Monday", "Tuesday", "Wednesday", "Thursday"\]/);
  assert.match(schema,/opens: "09:00"/);
});
