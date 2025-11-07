import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { ReactNode } from "react";

interface DataTableSheetProps {
  sheetTitle: string;
  sheetDescription: string;
  openSheet: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const DataTableSheet = ({
  children,
  sheetTitle,
  sheetDescription,
  openSheet,
  onOpenChange,
}: DataTableSheetProps) => {
  return (
    <Sheet open={openSheet} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetDescription>{sheetDescription}</SheetDescription>
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  );
};

export default DataTableSheet;
