# Park Place Dental SMS campaign setup

## Publish before submitting the application

Merge and deploy this change, then verify the public URLs below. A branch or preview deployment is not proof that the production opt-in flow is live. Carrier approval is a separate review.

## Registration fields

- Business website: https://parkplacedentist.com/
- Opt-in method: Website Form
- Opt-in form URL: https://parkplacedentist.com/book-an-appointment
- Privacy Policy URL: https://parkplacedentist.com/privacy-policy
- Terms & Conditions URL: https://parkplacedentist.com/terms-of-service
- Legal entity: Ken Goodwin, DMD, PA
- Trade name: Park Place Dental

### How do Contacts Opt-in to Messages? (under 2,048 characters)

People visit https://parkplacedentist.com/book-an-appointment and enter their contact details and phone number. They may actively select either of two separate SMS consent checkboxes: one for informational messages (appointment confirmations, reminders, scheduling updates and enquiry replies), and one for marketing messages (dental service updates and special offers). Both checkboxes are unchecked by default and optional. Neither consent is required to submit the form, purchase services or receive care. Entering a phone number alone does not grant SMS consent. Each checkbox identifies Park Place Dental, explains the message types, states that frequency varies and message and data rates may apply, and includes HELP and STOP instructions. Privacy Policy and Terms of Service links appear beside the choices. The form identifies Ken Goodwin, DMD, PA as the legal entity doing business as Park Place Dental. The same choices appear on the contact form and campaign enquiry forms. Each submission records the separate choices, server receipt time, source form, disclosure version and wording in the practice's enquiry email.

### Opt-in Message (under 320 characters)

Park Place Dental: You opted in to the text message categories you selected on our website. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out or HELP for help. Call (662) 728-8171 for assistance.

This is the proposed enrollment confirmation for GHL, not an SMS sent by this website. Configure it to send only after at least one explicit SMS opt-in and only after A2P approval. Do not enroll a person in both categories because one checkbox was selected. No consent means no enrollment confirmation or other automated texts.

## Website checklist mapping

- Live and accessible: verify the deployed form, policies and terms return HTTP 200 and render normally.
- Business name/contact details: site footer and campaign footers show the practice name, address, phone and email.
- DBA: legal entity/trade-name relationship appears in the consent block, footers and policies.
- Website and opt-in URLs: provided above.
- Opt-in method: visible website checkboxes, separately selectable and optional.
- Disclosures: each checkbox includes message purpose, sender, frequency, rates and STOP/HELP.
- Privacy policy: linked directly in every consent block and footer; includes SMS consent non-sharing language and limited service-provider exception.
- Terms: public page linked from every form, footers and privacy policy.
- Purchased/rented/affiliate lists: this implementation only collects choices from people submitting the site's own forms. Do not import such lists as opted-in recipients.

## Consent records and GHL operations

The existing submission path sends emails through Resend to the practice. This change records consent in both HTML and plain-text enquiry emails and visitor receipts; it does not add a database or a GHL integration. Retain the practice inbox records rather than relying on Resend's limited dashboard retention. The source path and timestamp are assigned by the server; client-supplied timestamps, source paths and disclosure text are not trusted. Boolean choices are validated independently. Old submissions without consent fields remain accepted but grant no SMS permission.

Before enabling SMS workflows, map each permission separately into GHL and retain its evidence. Current submission choices are not a complete subscription history: an unchecked box grants no new permission, and this code does not overwrite existing subscriptions or process STOP replies. Ensure GHL's STOP/HELP handling, opt-out suppression, enrollment confirmations and number-to-campaign assignment are configured. Existing contacts must not be assumed to have opted in. The website itself sends no SMS and the PR does not submit an A2P registration.
