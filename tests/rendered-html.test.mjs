import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(pathname) {
  return readFile(new URL(pathname, root), "utf8");
}

test("keeps the ProConnect product page and activation entry points", async () => {
  const [home, entry] = await Promise.all([source("app/page.tsx"), source("app/connect/page.tsx")]);
  assert.match(home, /Your expertise/);
  assert.match(home, /Activate Existing Card/);
  assert.match(entry, /Open a ProConnect card/);
  assert.match(entry, /CardCodeForm/);
});

test("provides the customer-facing tap-card actions", async () => {
  const [page, actions, exchange] = await Promise.all([
    source("app/connect/[cardToken]/page.tsx"),
    source("app/connect/[cardToken]/profile-actions.tsx"),
    source("app/connect/[cardToken]/connection-exchange.tsx"),
  ]);
  assert.match(page, /View my full professional profile/);
  assert.match(actions, /Save/);
  assert.match(actions, /navigator\.share/);
  assert.match(exchange, /Share my info/);
  assert.match(exchange, /consent/);
});

test("requires server authentication and active membership for activation", async () => {
  const activation = await source("app/api/proconnect/cards/activate/route.ts");
  assert.match(activation, /PROCONNECT_ACTIVATION_SECRET/);
  assert.match(activation, /verifyMembership/);
  assert.match(activation, /status === "ACTIVE"/);
  assert.match(activation, /idempotent: true/);
});

test("stores only hashed public card tokens", async () => {
  const [schema, token] = await Promise.all([source("db/schema.ts"), source("lib/card-token.ts")]);
  assert.match(schema, /tokenHash/);
  assert.doesNotMatch(schema, /token:\s*text/);
  assert.match(token, /SHA-256/);
});
