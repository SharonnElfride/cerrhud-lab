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
}

const DataTableDeleteDialog = ({
  openDialog,
  onOpenChange,
  isUpdating,
  deleteFunction,
}: DataTableDeleteDialogProps) => {
  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suppression définitive</DialogTitle>
          <DialogDescription>
            En êtes-vous absolument sûr ? <br /> Cette action ne peut pas être
            annulée. Elle supprimera définitivement les éléments sélectionnés et
            les retirera de la base de données.
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
