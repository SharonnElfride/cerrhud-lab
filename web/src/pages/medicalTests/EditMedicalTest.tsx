import MedicalTestForm from "@/components/medical-tests/MedicalTestForm";
import { useAuth } from "@/context/AuthContext";
import type { Tables, TablesUpdate } from "@/lib/supabase/supabase";
import { updateSingleMedicalTest } from "@/services/MedicalTestsService";
import { toast } from "sonner";

const EditMedicalTestData = {
  title: "Éditer un examen",
  description:
    "Modifiez les détails d'un examen médical existant, mettez à jour ses informations ou ajustez son prix.",
};

interface EditMedicalTestProps {
  displayHeader?: boolean;
  medicalTest: Tables<"medical_tests">;
  onEnded?: () => void;
}

const EditMedicalTest = ({
  displayHeader = true,
  medicalTest,
  onEnded,
}: EditMedicalTestProps) => {
  const { user } = useAuth();

  const onSubmit = async (data: TablesUpdate<"medical_tests">) => {
    try {
      data = {
        ...data,
        updated_at: new Date().toDateString(),
        updated_by: user?.id,
      };

      await updateSingleMedicalTest(medicalTest.id, data);

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
          <h2>{EditMedicalTestData.title}</h2>
          <p>{EditMedicalTestData.description}</p>
        </div>
      )}

      <div className="px-4 mb-5">
        <MedicalTestForm
          mode="edit"
          initialData={medicalTest}
          onSubmit={async (medicalTestUpdate) => {
            await onSubmit(medicalTestUpdate);
          }}
          onEnded={onEnded}
        />
      </div>
    </div>
  );
};

export { EditMedicalTest, EditMedicalTestData, type EditMedicalTestProps };
