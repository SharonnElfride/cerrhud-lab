import MedicalTestForm from "@/components/medical-tests/MedicalTestForm";
import type { TablesInsert } from "@/lib/supabase/supabase";
import { addSingleMedicalTest } from "@/services/MedicalTestsService";

const AddMedicalTestData = {
  title: "Ajouter un examen",
  description:
    "Créez un nouvel examen médical en renseignant ses informations principales, son prix et ses instructions d'échantillonnage.",
};

interface AddMedicalTestProps {
  displayHeader?: boolean;
  onCancel?: () => void;
}

const AddMedicalTest = ({ displayHeader, onCancel }: AddMedicalTestProps) => {
  const onSubmit = async (data: TablesInsert<"medical_tests">) => {
    try {
      let newMT = await addSingleMedicalTest(data);
    } catch (error) {
      throw error;
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
          onSubmit={async (medicalTest) => {
            console.log("medicalTest");
            console.log(medicalTest);
            // onSubmit(medicalTest);
          }}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export { AddMedicalTest, AddMedicalTestData, type AddMedicalTestProps };
