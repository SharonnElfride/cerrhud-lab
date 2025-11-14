import MedicalTestForm from "@/components/medical-tests/MedicalTestForm";
import { useAuth } from "@/context/AuthContext";
import type { TablesInsert } from "@/lib/supabase/supabase";
import {
  addSingleMedicalTest,
  updateSingleMedicalTest,
  uploadMedicalTestImage,
} from "@/services/MedicalTestsService";
import { MedicalTestsData } from "@/shared/entity-data";
import { toast } from "sonner";

interface AddMedicalTestProps {
  displayHeader?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const AddMedicalTest = ({
  displayHeader = true,
  onSubmit,
  onCancel,
}: AddMedicalTestProps) => {
  const { user } = useAuth();

  const onSubmitForm = async (
    data: TablesInsert<"medical_tests">,
    images?: FileList
  ) => {
    try {
      const now = new Date().toDateString();
      data = {
        ...data,
        created_at: now,
        created_by: user?.id,
        updated_at: now,
        updated_by: user?.id,
      };
      const medicalTest = await addSingleMedicalTest(data);

      if (images) {
        const imageUrl = await uploadMedicalTestImage(
          medicalTest.id,
          images[0]
        );
        await updateSingleMedicalTest(medicalTest.id, {
          image: imageUrl,
        });
      }

      onSubmit?.();

      toast.success("L'examen a bien été ajouté.");
    } catch (error: any) {
      toast.error(
        error.message ??
          "Une erreur est survenue lors de l'ajout de l'examen médical."
      );
    }
  };

  return (
    <div>
      {displayHeader && (
        <div>
          <h2>{MedicalTestsData.add.title}</h2>
          <p>{MedicalTestsData.add.description}</p>
        </div>
      )}

      <div className="px-4 mb-5">
        <MedicalTestForm
          mode="create"
          onSubmit={onSubmitForm}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export { AddMedicalTest, type AddMedicalTestProps };
