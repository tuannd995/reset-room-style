import { Suspense } from "react";
import { RefineWrapper } from "./RefineWrapper";

export const dynamic = "force-dynamic";

export default function AdminCmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <RefineWrapper>{children}</RefineWrapper>
    </Suspense>
  );
}
