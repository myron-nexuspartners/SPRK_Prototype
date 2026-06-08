export const SPRK_ACCESS_KEY = "sprk-prototype-access";
export const SPRK_ACCESS_EMAIL_KEY = "sprk-prototype-access-email";

type StoredAccess = {
  firstName?: string;
  lastName?: string;
  email?: string;
  submittedAt?: string;
};

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function hasPrototypeAccess() {
  if (typeof window === "undefined") return false;

  try {
    const raw = window.sessionStorage.getItem(SPRK_ACCESS_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as StoredAccess;
    return Boolean(parsed.firstName?.trim() && parsed.lastName?.trim() && isValidEmail(parsed.email ?? ""));
  } catch {
    return false;
  }
}

export function savePrototypeAccess(access: Required<Pick<StoredAccess, "firstName" | "lastName" | "email">> & Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SPRK_ACCESS_KEY, JSON.stringify(access));
  window.sessionStorage.setItem(SPRK_ACCESS_EMAIL_KEY, access.email);
}
