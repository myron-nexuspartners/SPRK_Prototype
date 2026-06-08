export const SPRK_ACCESS_KEY = "sprk-prototype-access";
export const SPRK_ACCESS_EMAIL_KEY = "sprk-prototype-access-email";
export const SPRK_YOURSPRK_EMAIL_KEY = "sprk-yoursprk-dashboard-email";

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

export function getPrototypeAccessEmail() {
  if (typeof window === "undefined") return "";

  const directEmail = window.sessionStorage.getItem(SPRK_ACCESS_EMAIL_KEY) ?? "";
  if (isValidEmail(directEmail)) return directEmail.trim().toLowerCase();

  try {
    const raw = window.sessionStorage.getItem(SPRK_ACCESS_KEY);
    if (!raw) return "";
    const parsed = JSON.parse(raw) as StoredAccess;
    return isValidEmail(parsed.email ?? "") ? (parsed.email ?? "").trim().toLowerCase() : "";
  } catch {
    return "";
  }
}

export function getYoursprkDashboardEmail() {
  if (typeof window === "undefined") return "";
  const dashboardEmail = window.sessionStorage.getItem(SPRK_YOURSPRK_EMAIL_KEY) ?? "";
  if (isValidEmail(dashboardEmail)) return dashboardEmail.trim().toLowerCase();
  return "";
}

export function saveYoursprkDashboardEmail(email: string) {
  if (typeof window === "undefined" || !isValidEmail(email)) return;
  window.sessionStorage.setItem(SPRK_YOURSPRK_EMAIL_KEY, email.trim().toLowerCase());
}

export function clearPrototypeAccess() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SPRK_ACCESS_KEY);
  window.sessionStorage.removeItem(SPRK_ACCESS_EMAIL_KEY);
  window.sessionStorage.removeItem(SPRK_YOURSPRK_EMAIL_KEY);
}
