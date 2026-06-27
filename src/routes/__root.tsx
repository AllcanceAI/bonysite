import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/lovable-error-reporting";
import { IntroOverlay } from "../components/IntroOverlay";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Algo deu errado
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocorreu um erro. Tente recarregar a página.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Início
          </a>
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
      // ── SEO ──
      { title: "DJ Bony — Som, Energia e Conexão para o seu evento" },
      { name: "description", content: "DJ Bony: +10 anos de experiência, +200 eventos. Som de alto padrão para casas de show, baladas, eventos sociais e corporativos." },
      { name: "author", content: "DJ Bony" },
      { name: "robots", content: "index, follow" },
      // ── Open Graph ──
      { property: "og:title", content: "DJ Bony — Som, Energia e Conexão" },
      { property: "og:description", content: "Transforme seu evento em uma experiência inesquecível." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-logo.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "DJ Bony — Som, Energia e Conexão" },
      // ── Twitter ──
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DJ Bony — Som, Energia e Conexão" },
      { name: "twitter:description", content: "Transforme seu evento em uma experiência inesquecível." },
      { name: "twitter:image", content: "/og-logo.jpg" },
      // ── Segurança ──
      { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
      { httpEquiv: "Referrer-Policy", content: "strict-origin-when-cross-origin" },
      { name: "format-detection", content: "telephone=no" },
      { name: "theme-color", content: "#0d0000" },
      { name: "color-scheme", content: "dark" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Intro animada — aparece ao carregar e some automaticamente */}
      <IntroOverlay />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
