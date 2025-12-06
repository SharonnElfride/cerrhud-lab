import { AdminsColumns } from "@/components/admins/table-columns";
import PageHeadline from "@/components/shared/page-headline";
import { DataTable } from "@/components/ui/custom/data-table/data-table";
import { useAuth } from "@/context/auth-context";
import type { Tables } from "@/lib/supabase/supabase";
import {
  AddAdminRoute,
  ListAdminsRoute,
  UpdateAdminRoute,
} from "@/navigation/admins-routes";
import { canAccessRoute, hasRequiredPermissions } from "@/navigation/guards";
import { deleteAdminsById, getAdmins } from "@/services/admins-service";
import { AdminsData } from "@/shared/entity-data";
import { ADMINS_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AddAdmin } from "./add-admin";
import { UpdateAdmin } from "./update-admin";

const Admins = ({}) => {
  const { user, userPermissions } = useAuth();
  const [admins, setAdmins] = useState<Tables<"profiles">[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadData() {
    setIsLoading(true);
    const data = await getAdmins();
    if (data) setAdmins(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(ids: string[]) {
    let deleted = await deleteAdminsById(ids);

    if (deleted) {
      toast.success(ADMINS_VALIDATION_MESSAGES.SUCCESS.SUCCESSFUL_DELETION);
    } else {
      toast.error(ADMINS_VALIDATION_MESSAGES.ERROR.UNSUCCESSFUL_DELETION);
    }

    await loadData();
  }

  return (
    <div className="p-5 space-y-5">
      <PageHeadline
        title={AdminsData.title}
        description={AdminsData.description}
        variant={"list"}
      />

      <div className="mx-auto overflow-y-hidden">
        <DataTable
          columns={AdminsColumns(false)}
          data={admins}
          isDataLoading={isLoading}
          appRoute={ListAdminsRoute}
          addDataButtonText={AdminsData.add.title}
          canAccessMoreButton={canAccessRoute(AddAdminRoute, user)}
          refreshFunction={loadData}
          canAdd={canAccessRoute(AddAdminRoute, user)}
          addForm={(onSubmit, onCancel) => (
            <AddAdmin
              displayHeader={false}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          )}
          addSheet={{
            title: AdminsData.add.title,
            description: AdminsData.add.description,
          }}
          canEdit={canAccessRoute(UpdateAdminRoute, user)}
          editForm={(row, onSubmit, onCancel) => (
            <UpdateAdmin
              displayHeader={false}
              admin={row}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          )}
          editSheet={{
            title: AdminsData.edit.title,
            description: AdminsData.edit.description,
          }}
          canDelete={hasRequiredPermissions(userPermissions, ["users.delete"])}
          deleteFunction={handleDelete}
        />
      </div>
    </div>
  );
};

export default Admins;
