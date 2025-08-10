import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

/**
 * IconButton
 * Purpose: Small button with a leading icon.
 * Props: { icon: LucideIcon; label: string; onClick?: ()=>void }
 * Usage: <IconButton icon={Plus} label="Add Job" />
 * A11y: label is visible; if using only icon, ensure aria-label is set.
 */
export const IconButton = ({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick?: () => void }) => (
  <Button onClick={onClick}>
    <Icon className="mr-2 h-4 w-4" /> {label}
  </Button>
);
