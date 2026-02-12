/**
 * Admin-only layout. No frontend Header/Footer — Refine (cms) provides its own UI.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#f5f5f5]">{children}</div>;
}
