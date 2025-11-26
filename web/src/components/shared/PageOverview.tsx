import { cn } from "@/lib/utils";
import {
  PageOverviewButtons,
  type PageOverviewButtonsProps,
} from "./PageOverviewButtons";

const PageOverview = ({
  canEdit,
  canDelete,
  entityId,
  deleteFunction,
  deletionErrorMessage,
  className,
  children,
  ...props
}: PageOverviewButtonsProps & React.ComponentProps<"div">) => {
  return (
    <div className={cn("px-4 mb-5 space-y-5", className)} {...props}>
      <PageOverviewButtons
        canEdit={canEdit}
        canDelete={canDelete}
        entityId={entityId}
        deleteFunction={deleteFunction}
        deletionErrorMessage={deletionErrorMessage}
      />
      
      {children}
    </div>
  );
};

export default PageOverview;
