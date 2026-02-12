# Admin CMS

Admin area at `/admin` with CRUD for **Posts** and **Products**, protected by login and admin role.

## Auth

- **Login**: `/admin/login` — Sign in with Google (Supabase OAuth).
- **Middleware**: Only users with `profiles.role = 'admin'` can access `/admin` (except `/admin/login` and `/admin/forbidden`).
- **Profiles**: Table `profiles` with `id` (references `auth.users`), `email`, `role` (default `'user'`), `created_at`.

## Supabase setup

1. **Google OAuth**  
   In Supabase Dashboard: Authentication → Providers → Google → enable and set Client ID / Client Secret (from Google Cloud Console).

2. **Redirect URL**  
   In Supabase: Authentication → URL Configuration set **Redirect URL** to your app callback (not `/admin`):

   - Production: `https://yourdomain.com/auth/callback`
   - Local: `http://localhost:3000/auth/callback`  
     The app exchanges the OAuth code at `/auth/callback` and then redirects to `/admin`.

3. **“Database error saving new user”**  
   This usually means a **trigger on `auth.users`** is failing when Supabase inserts the new user (e.g. after Google sign-in). Common fix:

   - In Supabase SQL Editor, check for triggers on `auth.users`:  
     `SELECT * FROM pg_trigger WHERE tgrelid = 'auth.users'::regclass;`
   - If you have a trigger that inserts into `public.profiles`, ensure:
     - Table `profiles` has columns: `id` (uuid, PK), `email` (text), `role` (text, default `'user'`), `created_at` (timestamptz).
     - The trigger function uses `SECURITY DEFINER` and inserts exactly those columns (e.g. `new.id`, `new.email`, `'user'`, `now()`).
   - If you don’t use a trigger, create the profile manually after first sign-in, or add a trigger like:
     ```sql
     create or replace function public.handle_new_user() returns trigger as $$
     begin
       insert into public.profiles (id, email, role) values (new.id, new.email, 'user');
       return new;
     end;
     $$ language plpgsql security definer;
     create trigger on_auth_user_created after insert on auth.users
       for each row execute procedure public.handle_new_user();
     ```
   - Check **Auth logs** and **Postgres logs** in the Dashboard for the exact error.

4. **Profiles and RLS**

   - Ensure `profiles` exists with `id`, `email`, `role`, `created_at`.
   - RLS: allow read for `auth.uid() = id` so users can read their own profile (middleware and Refine auth need this).
   - Optionally: use the trigger above to create a row in `profiles` with `role = 'user'`.

5. **Set first admin**  
   After signing up, set `role = 'admin'` for your user in `profiles` (e.g. in SQL or Table Editor).

## Tech

- **Refine** + **Ant Design** for list/create/edit UI.
- **@refinedev/supabase** for data provider.
- **@supabase/ssr** for session (cookies) and middleware.
- Browser client: `@/lib/supabase/browser`; server client: `@/lib/supabase/server`.
