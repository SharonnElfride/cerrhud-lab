import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../dialog";

interface DataTableViewDialogProps {
  children: ReactNode;
  title: string;
  description?: string | null;
}

const DataTableViewDialog = ({
  children,
  title,
  description,
}: DataTableViewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="underline underline-offset-4 decoration-accent cursor-pointer hover:font-medium transition-all duration-300">
          {title}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DataTableViewDialog;
