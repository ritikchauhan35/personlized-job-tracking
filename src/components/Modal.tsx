import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

/**
 * Modal wrapper
 * Purpose: Accessible modal built on top of shadcn Dialog.
 * Props: { open: boolean; onOpenChange: (v:boolean)=>void; title: string; description?: string; children: ReactNode }
 * Usage:
 * <Modal open={open} onOpenChange={setOpen} title="Edit">
 *   ...content...
 * </Modal>
 */
export const Modal = ({ open, onOpenChange, title, description, children }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);
