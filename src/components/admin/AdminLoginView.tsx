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
    <div
      className="min-h-screen bg-[#051610] text-neutral-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans"
      style={{
        background: "radial-gradient(120% 80% at 80% 10%, #0f2a22 0%, #051610 55%, #030b08 100%)",
      }}
    >
      {/* Background ambient lighting — Brand Lime & Brand Violet companion glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-lime/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#081a13] border border-emerald-950/80 text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <Lock className="w-3 h-3 text-brand-lime" />
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
        <div className="bg-[#081a13]/90 border border-emerald-950/70 rounded-2xl p-7 shadow-2xl backdrop-blur-xl space-y-6">
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
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#030d09] border border-emerald-950/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 font-mono transition-colors"
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
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#030d09] border border-emerald-950/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-lime hover:bg-[#bef264] disabled:opacity-50 text-stone-950 text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-md shadow-brand-lime/10"
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
          <div className="pt-4 border-t border-emerald-950/80 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
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
