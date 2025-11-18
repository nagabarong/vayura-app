import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full border-b">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">Vayura</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/auth/login">Sign In</Link>
        </div>
      </nav>
    </header>
  );
}
