import React, { useState } from "react";
import { loginAdminFn } from "@/lib/admin.functions";
import { Link } from "@tanstack/react-router";
import { Lock, Mail, Key, ShieldCheck, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface AdminLoginViewProps {
  onSuccess: (token: string, email: string) => void;
}

export function AdminLoginView({ onSuccess }: AdminLoginViewProps) {
  const [email, setEmail] = useState("admin@brnnd.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await loginAdminFn({
        data: {
          email: email.trim(),
          password,
        },
      });

      if (res.success && res.token) {
        toast.success("Authentication successful. Welcome to BRNND Studio Portal.");
        onSuccess(res.token, res.email);
      }
    } catch (err: unknown) {
      console.error("Login failed:", err);
      const msg = err instanceof Error ? err.message : "Invalid credentials. Please verify your email and password.";
      setErrorMsg(msg);
      toast.error("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-neutral-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <Lock className="w-3 h-3 text-orange-400" />
            <span>Executive Studio Portal</span>
          </div>
          <div className="py-2">
            <img
              src="/brnndlogo.png"
              alt="BRNND Studio"
              className="h-9 w-auto mx-auto object-contain"
            />
          </div>
          <p className="text-xs text-neutral-400">
            Sign in to access real-time invoicing, client leads, and Resend delivery
          </p>
        </div>

        {/* Card */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-7 shadow-2xl backdrop-blur-xl space-y-6">
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@brnnd.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 font-mono transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-lg shadow-orange-950/60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying with Bcrypt Cost 12...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security badge footer */}
          <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Bcrypt Cost Round 12
            </span>
            <span className="text-neutral-400">admin@brnnd.com</span>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            &larr; Return to BRNND Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
