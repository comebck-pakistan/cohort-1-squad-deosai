export type ClassInput =
  | string
  | number
  | null
  | false
  | undefined
  | ClassInput[];

/**
 * Minimal className joiner (no external deps). Later utilities can be added
 * without changing call sites.
 */
export function cn(...inputs: ClassInput[]): string {
  const out: string[] = [];
  const walk = (value: ClassInput) => {
    if (!value && value !== 0) return;
    if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}

export function formatPKR(amount: number): string {
  return "Rs. " + amount.toLocaleString("en-PK");
}
