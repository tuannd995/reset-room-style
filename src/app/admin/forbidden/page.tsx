import Link from "next/link";

export default function AdminForbiddenPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-semibold text-[#2C2416]">Access denied</h1>
      <p className="text-[#5A4A3A] text-center max-w-md">
        You must be an admin to view this area. Sign out to use another account.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/admin/logout"
          className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-[#2C2416] text-white font-medium hover:bg-[#8B7355] transition-colors"
        >
          Sign out and use another account
        </Link>
        <Link
          href="/"
          className="inline-flex justify-center items-center px-6 py-3 rounded-lg border border-[#D4C4B0] text-[#5A4A3A] font-medium hover:bg-[#F5F3F0] transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
