/** Shared by the displayed form and the server's consent receipt. */
export const SMS_CONSENT_VERSION = "2026-10-19";
export const SMS_BUSINESS = "Ken Goodwin, DMD, PA, doing business as Park Place Dental";
export const SMS_INFORMATIONAL =
  "I agree to receive informational text messages from Park Place Dental at the phone number provided, including appointment confirmations, reminders, scheduling updates and replies to my enquiries. Message frequency varies. Message and data rates may apply. Reply HELP for help or STOP to opt out.";
export const SMS_MARKETING =
  "I agree to receive marketing and promotional text messages from Park Place Dental at the phone number provided, including dental service updates and special offers. Message frequency varies. Message and data rates may apply. Reply HELP for help or STOP to opt out. Consent is not a condition of purchase or care.";

export type SmsConsentRecord = {
  informational: boolean;
  marketing: boolean;
  version: string;
  recordedAt: string;
  source: string;
};

export function smsConsentPayload(data: FormData) {
  return {
    smsInformational: data.get("smsInformational") === "on",
    smsMarketing: data.get("smsMarketing") === "on",
    smsConsentVersion: SMS_CONSENT_VERSION,
  };
}

export function smsConsentRows(record: SmsConsentRecord): Array<[string, string]> {
  return [
    ["SMS informational consent", record.informational ? "Yes" : "Not granted"],
    ["SMS marketing consent", record.marketing ? "Yes" : "Not granted"],
    ["SMS consent recorded (UTC)", record.recordedAt],
    ["SMS consent source", record.source],
    ["SMS disclosure version", record.version],
    ...(record.version === SMS_CONSENT_VERSION ? [
      ["SMS sender", SMS_BUSINESS],
      ["Informational disclosure", SMS_INFORMATIONAL],
      ["Marketing disclosure", SMS_MARKETING],
    ] as Array<[string, string]> : []),
  ];
}
