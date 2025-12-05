import PageHeadline from "@/components/shared/page-headline";
import { useAuth } from "@/context/auth-context";
import { useGoBack } from "@/hooks/use-go-back";
import type { TablesInsert } from "@/lib/supabase/supabase";
import { AdminsRoute } from "@/navigation/admins-routes";
import { addAdmin, updateAdminById } from "@/services/admins-service";
import { uploadProfileAvatar } from "@/services/profiles-service";
import { AdminsData } from "@/shared/entity-data";
import { toast } from "sonner";

interface AddAdminProps {
  displayHeader?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const AddAdmin = ({
  displayHeader = true,
  onSubmit,
  onCancel,
}: AddAdminProps) => {
  const { user } = useAuth();
  const goBack = useGoBack();

  const onSubmitForm = async (
    data: TablesInsert<"profiles">,
    images?: FileList
  ) => {
    try {
      // TODO Add auth user and invite him (has no password and with wait for confirmation)
      // TODO Send password setting link !
      // Gotta verify the following: (Even before creating the profile maybe !)
      /*
        Invited at
        Confirmation sent at
        Confirmed at
      */
      // Get id and pass it down

      const now = new Date().toDateString();
      data = {
        ...data,
        id: "",
        created_at: now,
        created_by: user?.id,
      };
      const admin = await addAdmin(data);

      if (images) {
        const imageUrl = await uploadProfileAvatar(admin.id, images[0]);
        await updateAdminById(admin.id, {
          avatar: imageUrl,
        });
      }

      onSubmit?.();

      toast.success(
        // MEDICAL_TESTS_VALIDATION_MESSAGES.SUCCESS.SUCCESSFUL_CREATION
        ""
      );
    } catch (error: any) {
      toast.error(
        error.message ??
          // MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR.UNSUCCESSFUL_CREATION
          ""
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
    <div>
      {displayHeader && (
        <PageHeadline
          title={AdminsData.add.title}
          description={AdminsData.add.description}
        />
      )}

      <div className="px-4 mb-5">
        {/* <MedicalTestForm
          mode="create"
          onSubmit={onSubmitForm}
          onCancel={onCancelForm}
        /> */}
      </div>
    </div>
  );
};

export default AddAdmin;
