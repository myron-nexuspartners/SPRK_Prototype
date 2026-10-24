// Netlify Function (v2) — validates the prototype access-gate password server-side
// so the real password never ships in the client JS bundle. Set SPRK_ACCESS_PASSWORD
// in Netlify: Site configuration → Environment variables (never prefix it VITE_).
export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const expected = process.env.SPRK_ACCESS_PASSWORD;
  const ok = Boolean(expected) && password === expected;

  return new Response(JSON.stringify({ ok }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/verify-access",
};
