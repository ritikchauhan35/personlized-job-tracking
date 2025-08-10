import { Component, ErrorInfo, ReactNode } from "react";

/**
 * ErrorBoundary
 * Purpose: Catches rendering errors anywhere in the app tree and shows a graceful fallback.
 * Usage: Wrap your application root: <ErrorBoundary><App /></ErrorBoundary>
 * A11y: Fallback uses semantic roles and clear messaging.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // TODO: hook to a real logger in production (Sentry, etc.)
    console.error("App ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen grid place-items-center p-6 bg-background">
          <section className="max-w-md rounded-xl border bg-[hsl(var(--glass-surface))] p-6 text-center shadow-[var(--shadow-soft)]">
            <h1 className="text-xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-muted-foreground mb-4">Please refresh the page. If the issue persists, contact support.</p>
            <button
              onClick={() => (location.href = location.origin)}
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border bg-background hover:bg-accent/40 transition-colors"
            >
              Reload
            </button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
