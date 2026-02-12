import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login";
  const isAdminForbidden = pathname === "/admin/forbidden";
  const isAdminLogout = pathname === "/admin/logout";

  if (!isAdminRoute) {
    return response;
  }

  if (isAdminForbidden || isAdminLogout) {
    return response;
  }

  if (!url || !key) {
    if (isAdminLogin) return response;
    return NextResponse.redirect(new URL("/", request.url));
  }

  const supabase = createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminLogin) {
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("email", user.email ?? "")
        .single();
      console.log(profile);
      if ((profile as { role?: string } | null)?.role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
    return response;
  }

  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("email", user.email ?? "")
    .single();

  if ((profile as { role?: string } | null)?.role !== "admin") {
    return NextResponse.redirect(new URL("/admin/forbidden", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
