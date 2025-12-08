import AdminForm from "@/components/admins/admin-form";
import PageHeadline from "@/components/shared/page-headline";
import { useAuth } from "@/context/auth-context";
import { useGoBack } from "@/hooks/use-go-back";
import type { TablesInsert } from "@/lib/supabase/supabase";
import { AdminsRoute } from "@/navigation/admins-routes";
import { addAdmin, updateAdminById } from "@/services/admins-service";
import { uploadProfileAvatar } from "@/services/profiles-service";
import { inviteAuthUserByEmail } from "@/services/supabase-auth-service";
import { AdminsData } from "@/shared/entity-data";
import { ADMINS_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
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
      const now = new Date().toISOString();
      const email = data.email;

      // Supabase auth
      const createdUser = await inviteAuthUserByEmail(email);

      // Profiles (admins)
      data = {
        ...data,
        id: createdUser.id,
        email: email,
        created_at: createdUser.created_at,
        created_by: user?.id,
        invited_at: createdUser.invited_at ?? now,
        confirmed_at: null,
        updated_at: createdUser.updated_at ?? now,
        updated_by: user?.id,
      };

      const admin = await addAdmin(data);

      if (images) {
        const imageUrl = await uploadProfileAvatar(admin.id, images[0]);
        await updateAdminById(admin.id, {
          avatar: imageUrl,
        });
      }

      onSubmit?.();

      toast.success(ADMINS_VALIDATION_MESSAGES.SUCCESS.SUCCESSFUL_CREATION);
    } catch (error: any) {
      toast.error(
        error.message ?? ADMINS_VALIDATION_MESSAGES.ERROR.UNSUCCESSFUL_CREATION
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
        <AdminForm
          mode="create"
          onSubmit={onSubmitForm}
          onCancel={onCancelForm}
        />
      </div>
    </div>
  );
};

export { AddAdmin, type AddAdminProps };
