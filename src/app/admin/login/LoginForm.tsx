"use client";

import { createClient } from "@/lib/supabase/browser";
import { useEffect } from "react";

export default function LoginForm({ error }: { error?: string | null }) {
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        window.location.href = "/admin";
      }
    });
  }, []);

  async function handleGoogleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-serif font-semibold text-[#2C2416]">
        Admin sign in
      </h1>
      {error && (
        <p className="text-red-600 text-center max-w-lg text-sm bg-red-50 px-4 py-2 rounded">
          {error}
        </p>
      )}
      <p className="text-[#5A4A3A] text-center max-w-sm">
        Sign in with your Google account. You must have admin role to access the
        CMS.
      </p>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="px-6 py-3 rounded-lg bg-[#2C2416] text-white font-medium hover:bg-[#8B7355] transition-colors"
      >
        Sign in with Google
      </button>
    </div>
  );
}
