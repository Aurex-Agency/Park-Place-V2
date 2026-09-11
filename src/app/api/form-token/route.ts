import { NextResponse } from "next/server";
import { mintFormToken } from "@/lib/formToken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Hands a freshly signed token to a form as it is drawn.
 *
 * The form pages are prerendered, so the token cannot be baked into the HTML:
 * it would carry the age of the build rather than the age of the visit. The
 * browser asks for one on mount instead.
 */
export async function GET() {
  const token = mintFormToken();
  return NextResponse.json(
    { token },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
