export function normalizeCardToken(value: string) {
  return value.trim().toLowerCase();
}

export function isValidCardToken(value: string) {
  return /^[a-z0-9][a-z0-9_-]{7,127}$/i.test(value);
}

export async function hashCardToken(value: string) {
  const bytes = new TextEncoder().encode(normalizeCardToken(value));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
