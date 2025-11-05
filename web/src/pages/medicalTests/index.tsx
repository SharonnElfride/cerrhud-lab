import { MedicalTestsColumns } from "@/components/medical-tests/Columns";
import MedicalTestsMasterDetail from "@/components/medical-tests/MasterDetail";
import ListTitle from "@/components/shared/ListTitle";
import { DataTable } from "@/components/ui/custom/data-table/data-table";
import { useAuth } from "@/context/AuthContext";
import type { Tables } from "@/lib/supabase/supabase";
import {
  AddMedicalTestRoute,
  MedicalTestsRoute,
} from "@/navigation/app_routes";
import { canAccessRoute, hasRequiredPermissions } from "@/navigation/guards";
import {
  deleteMedicalTests,
  getMedicalTests,
} from "@/services/MedicalTestsService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AddMedicalTest, AddMedicalTestData } from "./AddMedicalTest";
import { EditMedicalTest, EditMedicalTestData } from "./EditMedicalTest";

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
      toast.success("Les examens sélectionnés ont été supprimés.");
    } else {
      toast.error("Impossible de supprimer les examens sélectionnés.");
    }

    await loadData();
  }

  return (
    <div className="p-5 space-y-5">
      <ListTitle
        title="Examens médicaux"
        description="Liste des examens disponibles avec leurs détails et tarifs."
      />

      <div className="mx-auto overflow-y-hidden">
        <DataTable
          columns={MedicalTestsColumns(true)}
          data={medicalTests}
          isDataLoading={isLoading}
          appRoute={MedicalTestsRoute}
          addDataButtonText="Ajouter un examen"
          canAccessMoreButton={canAccessRoute(AddMedicalTestRoute, user)}
          enableMasterDetail
          masterDetail={MedicalTestsMasterDetail}
          refreshFunction={() => loadData()}
          canAdd={hasRequiredPermissions(userPermissions, [
            "medical_tests.create",
          ])}
          addForm={(onEnded) => (
            <AddMedicalTest displayHeader={false} onEnded={onEnded} />
          )}
          addSheet={{
            title: AddMedicalTestData.title,
            description: AddMedicalTestData.description,
          }}
          canEdit={hasRequiredPermissions(userPermissions, [
            "medical_tests.update",
          ])}
          editForm={(row, onEnded) => (
            <EditMedicalTest
              displayHeader={false}
              medicalTest={row}
              onEnded={onEnded}
            />
          )}
          editSheet={{
            title: EditMedicalTestData.title,
            description: EditMedicalTestData.description,
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
