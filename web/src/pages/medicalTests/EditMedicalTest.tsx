import MedicalTestForm from "@/components/medical-tests/MedicalTestForm";
import type { Tables } from "@/lib/supabase/supabase";

const EditMedicalTestData = {
  title: "Éditer un examen",
  description:
    "Modifiez les détails d'un examen médical existant, mettez à jour ses informations ou ajustez son prix.",
};

interface EditMedicalTestProps {
  displayHeader?: boolean;
  medicalTest: Tables<"medical_tests">;
}

const EditMedicalTest = ({
  displayHeader = true,
  medicalTest,
}: EditMedicalTestProps) => {
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
          onSubmit={async (medicalTestZ) => {
            console.log("medicalTestZ");
            console.log(medicalTestZ);
            // onSubmit(medicalTest);
          }}
          // onCancel={onCancel}
          medicalTest={medicalTest}
        />
      </div>
    </div>
  );
};

export { EditMedicalTest, EditMedicalTestData, type EditMedicalTestProps };
