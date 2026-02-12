"use client";

import type { AuthProvider } from "@refinedev/core";
import { createClient } from "@/lib/supabase/browser";

export const authProvider: AuthProvider = {
  login: async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });
    if (error) {
      return { success: false, error };
    }
    return { success: true, redirectTo: "/admin" };
  },
  logout: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return { success: true, redirectTo: "/admin/login" };
  },
  check: async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      const role = (profile as { role?: string } | null)?.role;
      if (role === "admin") {
        return { authenticated: true };
      }
    }
    return { authenticated: false, redirectTo: "/admin/login", logout: true };
  },
  getIdentity: async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;
    const { data: profile } = await supabase
      .from("profiles")
      .select("email, role")
      .eq("id", user.id)
      .single();
    const p = profile as { email?: string | null } | null;
    return {
      id: user.id,
      name: user.user_metadata?.full_name ?? p?.email ?? user.email ?? "Admin",
      email: user.email ?? p?.email ?? undefined,
    };
  },
  onError: async (error) => {
    if (error?.status === 401) {
      return { logout: true, redirectTo: "/admin/login" };
    }
    return {};
  },
};
