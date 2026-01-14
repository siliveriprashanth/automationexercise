export function randomEmail(prefix = "user"): string {
  return `${prefix}_${Date.now()}@mailinator.com`;
}

export function randomString(prefix = "txt"): string {
  return `${prefix}_${Math.random().toString(16).slice(2)}`;
}
