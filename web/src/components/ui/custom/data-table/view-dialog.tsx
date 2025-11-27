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
  dialogContentClassName?: string;
}

const DataTableViewDialog = ({
  children,
  title,
  description,
  dialogContentClassName,
}: DataTableViewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="underline underline-offset-4 decoration-accent cursor-pointer font-medium transition-all duration-300">
          {title}
        </p>
      </DialogTrigger>
      <DialogContent className={dialogContentClassName}>
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
