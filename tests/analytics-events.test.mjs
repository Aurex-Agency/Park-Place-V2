import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { trackLeadOutcome, trackPhoneClick } from '../src/lib/analytics-events.ts';

afterEach(() => { delete globalThis.window; });

test('only a confirmed success is a generate_lead; failures remain diagnostics', () => {
  const calls = [];
  globalThis.window = { gtag: (...args) => calls.push(args) };
  trackLeadOutcome('lead_failed', 'appointment', 503);
  trackLeadOutcome('lead_submitted', 'contact');
  assert.deepEqual(calls, [
    ['event', 'lead_failed', { form_type: 'appointment', status: 503 }],
    ['event', 'generate_lead', { form_type: 'contact' }],
  ]);
});

test('unexpected input never becomes an analytics dimension', () => {
  const calls = [];
  globalThis.window = { gtag: (...args) => calls.push(args) };
  trackLeadOutcome('lead_failed', 'patient@example.test', 'medical details');
  trackPhoneClick('patient@example.test');
  assert.deepEqual(calls, [
    ['event', 'lead_failed', { form_type: 'unknown', status: 0 }],
    ['event', 'call_started', { placement: 'page' }],
  ]);
});

test('missing or blocked analytics cannot break the patient action', () => {
  assert.doesNotThrow(() => trackLeadOutcome('lead_submitted', 'appointment'));
  globalThis.window = {};
  assert.doesNotThrow(() => trackPhoneClick('header'));
  globalThis.window.gtag = () => { throw new Error('blocked'); };
  assert.doesNotThrow(() => trackLeadOutcome('lead_submitted', 'appointment'));
});

test('queues the early event through the initializer without needing the remote tag', () => {
  const queue = [];
  globalThis.window = { gtag: (...args) => queue.push(args) };
  trackLeadOutcome('lead_submitted', 'appointment');
  assert.equal(queue.length, 1);
  assert.equal(queue[0][1], 'generate_lead');
});
