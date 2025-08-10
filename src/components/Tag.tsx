import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Tag component
 * Purpose: Small, rounded label for statuses/platforms.
 * Props:
 * - children: content inside the tag
 * - className: extra classes
 * Example:
 * <Tag>Applied</Tag>
 * Accessibility: purely presentational; ensure context has labels elsewhere.
 */
const Tag = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
      "bg-accent text-accent-foreground border border-border/60",
      className
    )}
  >
    {children}
  </span>
);

export default Tag;
