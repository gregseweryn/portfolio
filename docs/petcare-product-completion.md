# PetCare — pet setup, personal account and shared care

28 October 2026 · Original scope following the author's review. A native Figma increment is now implemented on page `04 · Pet setup & shared care`. See `petcare-design/README.md` for delivered scope, verification and remaining limitations. The sections below preserve the original brief; they are not a claim that all proposed behavior is delivered. No backend work is claimed.

## Gap confirmed in Figma

Current prototype starts with Figa, Alex, Sam and an existing plan. Account currently displays theme choices and viewer context. No pet creation, profile editing or invitation acceptance exists. The earlier case-study readiness statement concerned the reporting slice; broader product presentation requires this gap to be explicit or completed before publication.

## Product model

Each person signs in to their own account. A pet has a shared care space containing its plan and report history. An invitation grants another authenticated person access to that space. Reports retain the actual author; inviting someone does not create shared login credentials or duplicate the record.

First iteration: one pet creation path and one invited caregiver. A list/switcher may expose the selected pet and an Add pet entry without expanding into a full multi-pet dashboard. Pet setup must not fabricate an existing treatment plan: after creation show an honest empty state; entry into the existing Figa medication scenario is a separate prepared start unless plan setup is intentionally added.

## Three connected journeys

### 1. Add a pet

Signed-in user with no pets → Add pet → enter name and species, optional photo → save → pet profile with no medication plan yet. Required-field errors stay next to fields and retain entered values. Cancelling returns to the previous state without creating a pet. Do not require breed, age, weight or treatment details just to create the profile.

On an existing Today view, the identity area opens the pet profile/switcher. Add pet is discoverable there. Keep Account attached to the person, not the pet photograph.

### 2. Personal account

Account → Profile (display name, email), Appearance and Sign out. Email is associated with the existing email-based sign-in method; do not add a separate password screen. Profile editing includes required-name validation, pending, saved and rejected-save states with retained details and retry. Sign-out returns to the Welcome back preset email sign-in screen and does not delete the shared record. Authentication remains simulated.

Put Shared care under the pet profile and provide a clear shortcut from Account. Explain which pet the settings apply to. Identity, pet management and membership should not be one ambiguous screen called Settings.

### 3. Invite and join shared care

Pet profile → Shared care → Invite caregiver → email → invitation pending. Pending status names the recipient and target pet. Allow cancel/resend with explicit outcome; do not claim an email was actually sent by the Figma prototype.

Separate recipient start: invitation identifies Figa and Alex → sign in using the invited email → accept → membership confirmed → Today showing the same prepared report from Alex. Include expired/cancelled invitation and wrong-email recovery. Acceptance must not create a second Figa record or silently overwrite the recipient's other pets.

Demonstrate the shared record through author-labelled perspectives: Alex reports → Sam reads that report → Sam adds a separate report/observation → Alex can read it. Figma presets illustrate these perspectives; they do not prove real-time or multi-device synchronisation.

## Proposed permissions to review during design

- Pet-space creator manages invitations and member access.
- Both caregivers can read the shared plan/history and add reports or uncertainty.
- Correcting an entry preserves authorship/history; membership is not a licence to silently rewrite another person's report.
- Removing access leaves historical reports attributed to their author. Access-removal UI must identify the person and pet and explain the consequence before confirmation.

Plan editing, clinical advice, complex roles, notifications and genuine authentication/synchronisation are outside this completion increment unless separately scoped.

## Implementation and validation order

1. Design the missing IA and empty/pending/error states in the existing PetCare visual language.
2. Add a separate Figma page for account/pet/shared-care flows, preserving the current reporting slice and research version. Connect entry/return points without dropping report context.
3. Implement Light/Dark and Reduced motion for the agreed connected paths. Keep examples English and clearly configured as prototype data.
4. Check pet identity, current-person identity, ownership, invitation recipient, pending versus accepted access, contextual returns and cancellation. Review the full Alex-to-Sam handover, not just invite submission.
5. Only then refresh portfolio copy/assets and implement the case-study page in this React/Vite repository. Do not claim these flows were part of the earlier participant round.

## Case-study evidence boundary

This expansion is motivated by product completeness and the author's review, not a newly discovered interview finding or participant-tested result. Earlier results remain tied to the reporting prototype. No real invitation or email was sent. Deployment status is tracked in PETCARE-DELIVERY.md.
