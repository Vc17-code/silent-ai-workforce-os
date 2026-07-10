import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="section-label">404</p>
      <h1 className="heading-lg mt-2">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
