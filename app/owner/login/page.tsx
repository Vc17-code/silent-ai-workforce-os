"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, LogIn } from "lucide-react";

export default function OwnerLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Invalid password. Please try again.");
        return;
      }

      router.push("/owner/dashboard");
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary via-primary-soft to-accent p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,92,92,0.25)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary font-display text-xl text-white">
            Sc
          </div>
          <h1 className="font-display text-2xl text-ink">Owner Login</h1>
          <p className="mt-2 text-sm text-muted">Smilecare Dentist · Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="Enter owner password"
                required
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            <LogIn className="h-4 w-4" />
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/" className="text-primary hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
