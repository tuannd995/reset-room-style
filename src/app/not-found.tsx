import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-neutral-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
