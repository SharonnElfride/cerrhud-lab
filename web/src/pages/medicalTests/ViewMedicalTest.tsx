import type { Tables } from "@/lib/supabase/supabase";

interface ViewMedicalTestProps {
  displayHeader?: boolean;
  medicalTest: Tables<"medical_tests">;
}

const ViewMedicalTest = ({
  displayHeader = true,
  medicalTest,
}: ViewMedicalTestProps) => {
  return (
    <div>
      {displayHeader && (
        <div>
          <h2>{medicalTest.title}</h2>
          <p>{medicalTest.description}</p>
        </div>
      )}
    </div>
  );
};

export { ViewMedicalTest, type ViewMedicalTestProps };
