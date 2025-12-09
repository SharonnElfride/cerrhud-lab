import PageHeadline from "@/components/shared/page-headline";
import PageOverview from "@/components/shared/page-overview";
import PageStateWrapper from "@/components/shared/page-state-wrapper";
import { useAuth } from "@/context/auth-context";
import { usePageSoftReload } from "@/hooks/use-soft-reload";
import type { Tables } from "@/lib/supabase/supabase";
import {
  ADMINS_ROOT_PATH,
  AdminsRoute,
  UpdateAdminRoute,
  ViewAdminRoute,
} from "@/navigation/admins-routes";
import { hasRequiredPermissions } from "@/navigation/guards";
import { deleteAdminsById, getAdminById } from "@/services/admins-service";
import { ADMINS_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface ViewAdminProps {
  displayHeader?: boolean;
  admin?: Tables<"profiles">;
}

const ViewAdmin = ({ displayHeader = true, admin }: ViewAdminProps) => {
  const { id } = useParams();
  const softReload = usePageSoftReload();
  const { user, userPermissions } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const [currentAdmin, setCurrentAdmin] = useState<
    Tables<"profiles"> | undefined
  >(admin);

  const baseHref = `${window.location.origin}/${ADMINS_ROOT_PATH}`;
  const canEdit = hasRequiredPermissions(userPermissions, ["users.update"]);
  const canDelete = hasRequiredPermissions(userPermissions, ["users.delete"]);

  const onDelete = async () => {
    const hasBeenDeleted = await deleteAdminsById([currentAdmin!.id]);

    if (hasBeenDeleted) {
      toast.success(
        ADMINS_VALIDATION_MESSAGES.SUCCESS.SUCCESSFUL_SINGLE_DELETION
      );
      navigate(AdminsRoute.path);
    } else {
      toast.error(
        ADMINS_VALIDATION_MESSAGES.ERROR.UNSUCCESSFUL_SINGLE_DELETION
      );
    }
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      setLoading(true);

      if (!id) {
        setErrorMessage(
          `${ADMINS_VALIDATION_MESSAGES.ERROR.MISSING_ID} ${baseHref}/${ViewAdminRoute.path}`
        );
      } else if (id.includes("edit")) {
        setErrorMessage(
          `${ADMINS_VALIDATION_MESSAGES.ERROR.MISSING_ID} ${baseHref}/${UpdateAdminRoute.path}`
        );
      } else {
        try {
          const test = await getAdminById(id);
          setCurrentAdmin(test);
        } catch (error: any) {
          console.log(ADMINS_VALIDATION_MESSAGES.ERROR.CANNOT_FETCH_ADMIN);
          console.error(error.message);

          setErrorTitle(ADMINS_VALIDATION_MESSAGES.ERROR.CANNOT_FETCH_ADMIN);
          setErrorMessage(
            `${ADMINS_VALIDATION_MESSAGES.ERROR.NO_ADMIN_WITH_ID} ${id}`
          );
        }
      }

      setLoading(false);
    };

    fetchAdmin();
  }, [id]);

  return (
    <PageStateWrapper
      isLoading={loading}
      hasError={!loading && !currentAdmin}
      errorTitle={errorTitle}
      errorMessage={errorMessage ?? ""}
      onRetry={() => {
        softReload();
      }}
    >
      {currentAdmin && (
        <>
          {displayHeader && (
            <PageHeadline
              title={currentAdmin.firstname}
              description={currentAdmin.lastname}
            />
          )}

          <PageOverview
            canEdit={canEdit}
            canDelete={canDelete}
            entityId={currentAdmin.id}
            deleteFunction={onDelete}
            deletionErrorMessage={
              ADMINS_VALIDATION_MESSAGES.ERROR.UNSUCCESSFUL_SINGLE_DELETION
            }
          >
            {/* <AdminOverview
              admin={currentAdmin}
            /> */}
            <p>Overview</p>
          </PageOverview>
        </>
      )}
    </PageStateWrapper>
  );
};

export { ViewAdmin, type ViewAdminProps };
