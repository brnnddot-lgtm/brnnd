import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { SpeedInsights } from "@vercel/speed-insights/react";

import "../styles.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import logoBlack from "@/assets/brnnd-logo-black.png";
import logoWhite from "@/assets/brnnd-logo-white.png";

function NotFoundComponent() {
  return (
    <div className="min-h-[70vh] flex items-center">
      <div className="container-edge">
        <p className="eyebrow mb-6">[ 404 — not found ]</p>
        <h1 className="editorial text-6xl md:text-8xl max-w-3xl">This page slipped through the grid.</h1>
        <div className="mt-10">
          <Link to="/" className="btn-ink">Return home →</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="min-h-[70vh] flex items-center">
      <div className="container-edge">
        <p className="eyebrow mb-6">[ Error ]</p>
        <h1 className="editorial text-5xl md:text-7xl">Something didn't render.</h1>
        <p className="mt-4 text-muted-foreground max-w-lg">{error.message}</p>
        <div className="mt-8 flex gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-ink">Try again</button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BRNND — Brand transformation partner for ambitious founders" },
      { name: "description", content: "BRNND builds complete brand systems — strategy, identity, websites and growth — for founders, startups and businesses ready to scale." },
      { property: "og:title", content: "BRNND — Brand transformation partner for ambitious founders" },
      { property: "og:description", content: "BRNND builds complete brand systems — strategy, identity, websites and growth — for founders, startups and businesses ready to scale." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BRNND — Brand transformation partner for ambitious founders" },
      { name: "twitter:description", content: "BRNND builds complete brand systems — strategy, identity, websites and growth — for founders, startups and businesses ready to scale." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/aec5cab2-3302-4a6c-8c77-fe06a471399d" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/aec5cab2-3302-4a6c-8c77-fe06a471399d" },
    ],
    links: [
      { rel: "preload", as: "image", href: logoWhite, fetchpriority: "high" },
      { rel: "preload", as: "image", href: logoBlack },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://brnnd.com/#organization",
              name: "BRNND",
              url: "https://brnnd.com",
              description: "BRNND is a premium branding and digital transformation partner. We build complete brand systems — strategy, identity, websites and growth — for founders, startups and modern businesses.",
            },
            {
              "@type": "WebSite",
              "@id": "https://brnnd.com/#website",
              url: "https://brnnd.com",
              name: "BRNND",
              publisher: { "@id": "https://brnnd.com/#organization" },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
