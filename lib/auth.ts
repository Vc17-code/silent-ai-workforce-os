import { cookies } from "next/headers";

const SESSION_COOKIE = "disha_owner_session";
const SESSION_VALUE = "authenticated";

export async function isOwnerAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

export function getOwnerPassword(): string {
  return process.env.OWNER_PASSWORD || "disha2024";
}

export { SESSION_COOKIE, SESSION_VALUE };
