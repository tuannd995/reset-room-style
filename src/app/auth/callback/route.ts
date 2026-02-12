import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Supabase OAuth callback. Supabase redirects here after sign-in (e.g. Google).
 * Configure "Redirect URL" in Supabase Dashboard → Authentication → URL Configuration to:
 *   https://yourdomain.com/auth/callback
 * (for local dev: http://localhost:3000/auth/callback)
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const errorParam = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");
  const next = requestUrl.searchParams.get("next") ?? "/admin";

  if (errorParam) {
    const message = errorDescription ?? errorParam;
    return NextResponse.redirect(
      `${requestUrl.origin}/admin/login?error=${encodeURIComponent(message)}`
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Auth callback exchange error:", error.message);
      return NextResponse.redirect(
        `${requestUrl.origin}/admin/login?error=${encodeURIComponent(
          error.message
        )}`
      );
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}${next}`);
}
