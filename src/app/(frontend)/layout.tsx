import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import { getCategories } from "@/lib";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: categories } = await getCategories();

  return (
    <>
      <ProgressBar />
      <div className="min-h-screen flex flex-col">
        <Header categories={categories ?? []} />
        <main className="flex-1">{children}</main>
        <Footer categories={categories ?? []} />
      </div>
    </>
  );
}
