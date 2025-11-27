import { SHARED_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
import { Button } from "../../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog";
import { Spinner } from "../../spinner";

interface DataTableDeleteDialogProps {
  openDialog: boolean;
  onOpenChange: (open: boolean) => void;
  isUpdating: boolean;
  deleteFunction: () => Promise<void>;
  isList?: boolean;
}

const DataTableDeleteDialog = ({
  openDialog,
  onOpenChange,
  isUpdating,
  deleteFunction,
  isList = true,
}: DataTableDeleteDialogProps) => {
  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suppression définitive</DialogTitle>
          <DialogDescription>
            En êtes-vous absolument sûr ? <br /> Cette action ne peut pas être
            annulée.{" "}
            {isList
              ? SHARED_VALIDATION_MESSAGES.DIALOG.LIST_DELETION
              : SHARED_VALIDATION_MESSAGES.DIALOG.SINGLE_DELETION}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isUpdating}>
              Annuler
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={deleteFunction}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Spinner />
                Suppression
              </>
            ) : (
              "Supprimer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DataTableDeleteDialog;
