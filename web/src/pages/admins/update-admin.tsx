import PageHeadline from "@/components/shared/page-headline";
import PageStateWrapper from "@/components/shared/page-state-wrapper";
import { useAuth } from "@/context/auth-context";
import { useGoBack } from "@/hooks/use-go-back";
import { usePageSoftReload } from "@/hooks/use-soft-reload";
import type { Tables, TablesUpdate } from "@/lib/supabase/supabase";
import {
  ADMINS_ROOT_PATH,
  AdminsRoute,
  UpdateAdminRoute,
} from "@/navigation/admins-routes";
import { getAdminById } from "@/services/admins-service";
import { AdminsData } from "@/shared/entity-data";
import { ADMINS_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface UpdateAdminProps {
  displayHeader?: boolean;
  admin?: Tables<"profiles">;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const UpdateAdmin = ({
  displayHeader = true,
  admin,
  onSubmit,
  onCancel,
}: UpdateAdminProps) => {
  const { user } = useAuth();
  const { id } = useParams();
  const goBack = useGoBack();
  const softReload = usePageSoftReload();

  const updateHref = `${window.location.origin}/${ADMINS_ROOT_PATH}/${UpdateAdminRoute.path}`;

  const [formAdmin, setFormAdmin] = useState<Tables<"profiles"> | undefined>(
    admin
  );

  const [loading, setLoading] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const fetchMedicalTest = async () => {
      setLoading(true);

      if (!id) {
        setErrorMessage(
          `${ADMINS_VALIDATION_MESSAGES.ERROR.MISSING_ID} ${updateHref}`
        );
      } else {
        try {
          const admin = await getAdminById(id);
          setFormAdmin(admin);
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

    fetchMedicalTest();
  }, [id]);

  const onSubmitForm = async (data: TablesUpdate<"profiles">) => {
    try {
      // data = {
      //   ...data,
      //   updated_at: new Date().toDateString(),
      //   updated_by: user?.id,
      // };

      // If the email has been changed, update the auth user's email & resend confirmation email & log out user's
      // If confirmed, then update the profile and make it possible to log in again
      // OR update the email already and set confirmed_at to null and wait until confirmed before being able to log in

      // await updateSingleMedicalTest(formMedicalTest!.id, data);
      onSubmit?.();

      toast.success(ADMINS_VALIDATION_MESSAGES.SUCCESS.SUCCESSFUL_UPDATE);
    } catch (error: any) {
      toast.error(
        error.message ?? ADMINS_VALIDATION_MESSAGES.ERROR.UNSUCCESSFUL_UPDATE
      );
    }
  };

  const onCancelForm = () => {
    if (onCancel) {
      onCancel();
    } else {
      goBack(AdminsRoute.path);
    }
  };

  return (
    <PageStateWrapper
      isLoading={loading}
      hasError={!loading && !formAdmin}
      errorTitle={errorTitle}
      errorMessage={errorMessage ?? ""}
      onRetry={() => {
        softReload();
      }}
    >
      {formAdmin && (
        <>
          {displayHeader && (
            <PageHeadline
              title={AdminsData.edit.title}
              description={AdminsData.edit.description}
            />
          )}

          <div className="px-4 mb-5">
            {/* <MedicalTestForm
              mode="edit"
              initialData={formAdmin}
              onSubmit={onSubmitForm}
              onCancel={onCancelForm}
            /> */}
          </div>
        </>
      )}
    </PageStateWrapper>
  );
};

export default UpdateAdmin;
