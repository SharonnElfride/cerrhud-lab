import MedicalTestForm from "@/components/medical-tests/MedicalTestForm";
import { useAuth } from "@/context/AuthContext";
import type { TablesInsert } from "@/lib/supabase/supabase";
import {
  addSingleMedicalTest,
  updateSingleMedicalTest,
  uploadMedicalTestImage,
} from "@/services/MedicalTestsService";
import { toast } from "sonner";

const AddMedicalTestData = {
  title: "Ajouter un examen",
  description:
    "Créez un nouvel examen médical en renseignant ses informations principales, son prix et ses instructions d'échantillonnage.",
};

interface AddMedicalTestProps {
  displayHeader?: boolean;
  onEnded?: () => void;
}

const AddMedicalTest = ({ displayHeader, onEnded }: AddMedicalTestProps) => {
  const { user } = useAuth();

  const onSubmit = async (
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
          <h2>{AddMedicalTestData.title}</h2>
          <p>{AddMedicalTestData.description}</p>
        </div>
      )}

      <div className="px-4 mb-5">
        <MedicalTestForm
          mode="create"
          onSubmit={async (data, images) => {
            await onSubmit(data, images);
          }}
          onEnded={onEnded}
        />
      </div>
    </div>
  );
};

export { AddMedicalTest, AddMedicalTestData, type AddMedicalTestProps };
