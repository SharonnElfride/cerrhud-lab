import MedicalTestsMasterDetail from "@/components/medical-tests/MasterDetail";
import { MedicalTestsColumns } from "@/components/medical-tests/TableColumns";
import PageHeadline from "@/components/shared/PageHeadline";
import { DataTable } from "@/components/ui/custom/data-table/data-table";
import { useAuth } from "@/context/AuthContext";
import type { Tables } from "@/lib/supabase/supabase";
import { canAccessRoute, hasRequiredPermissions } from "@/navigation/guards";
import {
  AddMedicalTestRoute,
  ListMedicalTestsRoute,
} from "@/navigation/medical-tests-routes";
import {
  deleteMedicalTests,
  getMedicalTests,
} from "@/services/MedicalTestsService";
import { MedicalTestsData } from "@/shared/entity-data";
import { MEDICAL_TESTS_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AddMedicalTest } from "./AddMedicalTest";
import { EditMedicalTest } from "./EditMedicalTest";

const MedicalTests = ({}) => {
  const { user, userPermissions } = useAuth();
  const [medicalTests, setMedicalTests] = useState<Tables<"medical_tests">[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  async function loadData() {
    setIsLoading(true);
    const data = await getMedicalTests();
    if (data) setMedicalTests(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(ids: string[]) {
    let deleted = await deleteMedicalTests(ids);

    if (deleted) {
      toast.success(
        MEDICAL_TESTS_VALIDATION_MESSAGES.SUCCESS.SUCCESSFUL_DELETION
      );
    } else {
      toast.error(
        MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR.UNSUCCESSFUL_DELETION
      );
    }

    await loadData();
  }

  return (
    <div className="p-5 space-y-5">
      <PageHeadline
        title={MedicalTestsData.title}
        description={MedicalTestsData.description}
        variant={"list"}
      />

      <div className="mx-auto overflow-y-hidden">
        <DataTable
          columns={MedicalTestsColumns(true)}
          data={medicalTests}
          isDataLoading={isLoading}
          appRoute={ListMedicalTestsRoute}
          addDataButtonText={MedicalTestsData.add.title}
          canAccessMoreButton={canAccessRoute(AddMedicalTestRoute, user)}
          enableMasterDetail
          masterDetail={MedicalTestsMasterDetail}
          refreshFunction={() => loadData()}
          canAdd={hasRequiredPermissions(userPermissions, [
            "medical_tests.create",
          ])}
          addForm={(onSubmit, onCancel) => (
            <AddMedicalTest
              displayHeader={false}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          )}
          addSheet={{
            title: MedicalTestsData.add.title,
            description: MedicalTestsData.add.description,
          }}
          canEdit={hasRequiredPermissions(userPermissions, [
            "medical_tests.update",
          ])}
          editForm={(row, onSubmit, onCancel) => (
            <EditMedicalTest
              displayHeader={false}
              medicalTest={row}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          )}
          editSheet={{
            title: MedicalTestsData.edit.title,
            description: MedicalTestsData.edit.description,
          }}
          canDelete={hasRequiredPermissions(userPermissions, [
            "medical_tests.update",
            "medical_tests.delete",
          ])}
          deleteFunction={handleDelete}
        />
      </div>
    </div>
  );
};

export default MedicalTests;
