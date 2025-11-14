import MedicalTestForm from "@/components/medical-tests/MedicalTestForm";
import { useAuth } from "@/context/AuthContext";
import type { Tables, TablesUpdate } from "@/lib/supabase/supabase";
import { updateSingleMedicalTest } from "@/services/MedicalTestsService";
import { MedicalTestsData } from "@/shared/entity-data";
import { toast } from "sonner";

interface EditMedicalTestProps {
  displayHeader?: boolean;
  medicalTest: Tables<"medical_tests">;
  onSubmit: () => void;
  onCancel?: () => void;
}

const EditMedicalTest = ({
  displayHeader = true,
  medicalTest,
  onSubmit,
  onCancel,
}: EditMedicalTestProps) => {
  const { user } = useAuth();

  const onSubmitForm = async (data: TablesUpdate<"medical_tests">) => {
    try {
      data = {
        ...data,
        updated_at: new Date().toDateString(),
        updated_by: user?.id,
      };

      await updateSingleMedicalTest(medicalTest.id, data);
      onSubmit();

      toast.success("L'examen a été mis à jour.");
    } catch (error: any) {
      toast.error(
        error.message ??
          "Une erreur est survenue lors de la mise à jour de l'examen médical."
      );
    }
  };

  return (
    <div>
      {displayHeader && (
        <div>
          <h2>{MedicalTestsData.edit.title}</h2>
          <p>{MedicalTestsData.edit.description}</p>
        </div>
      )}

      <div className="px-4 mb-5">
        <MedicalTestForm
          mode="edit"
          initialData={medicalTest}
          onSubmit={onSubmitForm}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export { EditMedicalTest, type EditMedicalTestProps };
