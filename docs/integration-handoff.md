# ProConnect card profile integration handoff

This branch is review-only. It does not provision a production database, apply migrations, deploy, or re-encode cards.

## Public card address

Each physical card should ultimately contain a unique, opaque address:

```text
https://www.taxcomppro.com/connect/{cardToken}
```

The token identifies the physical card, not a member. Store only its SHA-256 hash. Never derive it from an email address, member ID, or sequential number. The existing shared `/connect` route remains a fallback that accepts a printed card code.

## Field Hub activation request

`POST /api/proconnect/cards/activate`

```json
{
  "cardToken": "opaque-card-token",
  "signupSessionId": "field-hub-session-id",
  "taxCompProUserId": "permanent-user-id",
  "membershipId": "membership-id",
  "issuedByStaffId": "field-hub-staff-id"
}
```

Authenticate with `Authorization: Bearer <PROCONNECT_ACTIVATION_SECRET>`. The endpoint independently calls the Tax Comp Pro membership verifier and refuses activation unless the returned membership is active and matches both permanent IDs. Retries with the same card and signup session are idempotent. A signup session cannot hold two active cards, and a card cannot hold two active assignments.

## Main-site membership verifier

Configure `TAXCOMPPRO_MEMBERSHIP_VERIFY_URL` and `TAXCOMPPRO_INTEGRATION_TOKEN`. The verifier should accept:

```json
{ "taxCompProUserId": "permanent-user-id", "membershipId": "membership-id" }
```

It must return:

```json
{
  "active": true,
  "taxCompProUserId": "permanent-user-id",
  "membershipId": "membership-id",
  "plan": "PRO",
  "status": "ACTIVE"
}
```

## Review checklist before deployment

- Confirm the existing physical cards are writable or add a unique printed code/QR fallback.
- Decide whether Sites D1 or the main PostgreSQL service is the production system of record. The schema is portable, but this review branch uses the repository's existing D1/Drizzle conventions.
- Add a server-owned inventory import that generates cryptographically random card tokens and stores only token hashes.
- Configure integration secrets only in the hosting environment.
- Apply the generated migration to staging first.
- Seed a staging card, member profile, links, and active membership.
- Exercise activation, an idempotent retry, a duplicate-card rejection, a suspended card, public viewing, vCard download, and contact exchange.
- Connect Field Hub only after the endpoint contract is approved.
