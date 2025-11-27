import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import DataTableDeleteDialog from "../ui/custom/data-table/delete-dialog";

interface PageOverviewButtonsProps {
  canEdit: boolean;
  canDelete: boolean;
  entityId: string;
  deleteFunction: () => Promise<void>;
  deletionErrorMessage: string;
}

const PageOverviewButtons = ({
  canEdit,
  canDelete,
  entityId,
  deleteFunction,
  deletionErrorMessage,
}: PageOverviewButtonsProps) => {
  const navigate = useNavigate();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteFunction();
    } catch (error: any) {
      console.log(deletionErrorMessage);
      console.error(error.message);

      toast.error(deletionErrorMessage);
      setOpenDeleteDialog(false);
    }

    setIsDeleting(false);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {canEdit && (
        <Button
          onClick={() => {
            navigate(`edit/${entityId}`);
          }}
        >
          <Edit className="size-4" />
          Edit
        </Button>
      )}

      {canDelete && (
        <Button
          variant={"destructive"}
          onClick={() => setOpenDeleteDialog(true)}
        >
          <Trash2 className="size-4" />
          Delete
        </Button>
      )}

      <DataTableDeleteDialog
        openDialog={openDeleteDialog}
        onOpenChange={() => {
          setIsDeleting(false);
          setOpenDeleteDialog(false);
        }}
        isUpdating={isDeleting}
        deleteFunction={onDelete}
        isList={false}
      />

      {/* {isMobile && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="group">
              <Share2Icon className="mr-2 h-4 w-4 group-hover:text-white" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive group group-hover:bg-destructive">
              <Trash2 className="mr-2 h-4 w-4 text-destructive group-hover:text-white" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )} */}
    </div>
  );
};

export { PageOverviewButtons, type PageOverviewButtonsProps };
