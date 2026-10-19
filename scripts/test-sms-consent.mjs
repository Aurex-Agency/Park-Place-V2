import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
import { renderToStaticMarkup } from 'react-dom/server';
const require = createRequire(import.meta.url);
const cache = new Map();
function load(file) {
  const absolute = path.resolve(file);
  if (cache.has(absolute)) return cache.get(absolute);
  const exports = {}; cache.set(absolute, exports);
  const code = ts.transpileModule(readFileSync(absolute, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  vm.runInNewContext(code, {exports, process, Date, FormData, console, require(name) {
    if (!name.startsWith('@/')) return require(name);
    const base=path.resolve('src',name.slice(2));
    return load(base+(existsSync(base+'.ts')?'.ts':'.tsx'));
  }}, {filename:absolute});
  return exports;
}
const { parseSubmission }=load('src/lib/forms.ts');
const { campaigns }=load('src/content/campaigns.ts');
const { noticeEmail, confirmationEmail }=load('src/lib/email/templates.ts');
const { SMS_CONSENT_VERSION, smsConsentPayload }=load('src/lib/smsConsent.ts');
const base={kind:'contact',name:'Example Patient',email:'patient@example.com',phone:'6625550100',message:'Please help schedule a visit.'};

test('all four independent choices survive validation and email rendering',()=>{
  for(const informational of [false,true]) for(const marketing of [false,true]) {
    const form=new FormData();
    if(informational) form.set('smsInformational','on');
    if(marketing) form.set('smsMarketing','on');
    const parsed=parseSubmission({...base,...smsConsentPayload(form),smsConsent:{source:'https://attacker.example',recordedAt:'forged'}});
    assert.equal(parsed.ok,true);
    const record=parsed.data.smsConsent;
    assert.equal(record.informational,informational); assert.equal(record.marketing,marketing);
    assert.equal(record.source,'/contact-us'); assert.equal(record.version,SMS_CONSENT_VERSION);
    assert.ok(Math.abs(Date.now()-Date.parse(record.recordedAt))<5000);
    for(const email of [noticeEmail(parsed.data),confirmationEmail(parsed.data)]) {
      assert.ok(email.text.includes(`SMS informational consent: ${informational?'Yes':'Not granted'}`));
      assert.ok(email.text.includes(`SMS marketing consent: ${marketing?'Yes':'Not granted'}`));
      assert.ok(email.html.includes('SMS consent recorded (UTC)'));
      assert.ok(email.text.includes('Consent is not a condition of purchase or care.'));
    }
  }
});
test('missing consent remains a valid enquiry and never grants permission',()=>{
  const parsed=parseSubmission({...base,phone:''});
  assert.equal(parsed.ok,true);assert.equal(parsed.data.smsConsent.informational,false);assert.equal(parsed.data.smsConsent.marketing,false);
  assert.equal(parsed.data.smsConsent.version,'not presented');
});
test('malformed values and obsolete disclosures cannot grant consent',()=>{
  for(const value of ['false','true',1,[],{}]) assert.equal(parseSubmission({...base,smsMarketing:value}).ok,false);
  assert.equal(parseSubmission({...base,smsMarketing:true,smsConsentVersion:'old'}).ok,false);
  assert.equal(parseSubmission({...base,phone:'',smsInformational:true,smsConsentVersion:SMS_CONSENT_VERSION}).ok,false);
});
test('appointment and campaign requests preserve independent choices and server source',()=>{
  for(const extra of [{kind:'appointment'},...Object.values(campaigns).map(c=>({kind:'campaign',campaign:c.slug,answers:Object.fromEntries((c.form?.fields??[]).map(f=>[f.name,f.options[0]]))}))]) {
    const parsed=parseSubmission({...base,...extra,smsMarketing:false,smsInformational:true,smsConsentVersion:SMS_CONSENT_VERSION});
    assert.equal(parsed.ok,true,parsed.error);
    assert.equal(parsed.data.smsConsent.informational,true);assert.equal(parsed.data.smsConsent.marketing,false);
    assert.equal(parsed.data.smsConsent.source,extra.kind==='appointment'?'/book-an-appointment':`/${extra.campaign}`);
  }
});
test('rendered controls are optional, unchecked, separately labeled and linked to policies',()=>{
  const {SmsConsent}=load('src/components/page/SmsConsent.tsx');
  const html=renderToStaticMarkup(SmsConsent());
  const inputs=html.match(/<input[^>]*>/g);
  assert.equal(inputs.length,2);
  for(const input of inputs) {assert.ok(input.includes('type="checkbox"'));assert.doesNotMatch(input,/\b(?:checked|required)(?:=|\s|>)/);}
  assert.ok(html.includes('name="smsInformational"'));assert.ok(html.includes('name="smsMarketing"'));
  assert.ok(html.includes('href="/privacy-policy"'));assert.ok(html.includes('href="/terms-of-service"'));
});
