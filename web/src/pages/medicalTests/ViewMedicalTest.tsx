import PageHeadline from "@/components/shared/PageHeadline";
import PageStateWrapper from "@/components/shared/PageStateWrapper";
import { usePageSoftReload } from "@/hooks/use-soft-reload";
import type { Tables } from "@/lib/supabase/supabase";
import {
  MEDICAL_TESTS_ROOT_PATH,
  UpdateMedicalTestRoute,
  ViewMedicalTestRoute,
} from "@/navigation/medical-tests-routes";
import { getMedicalTestById } from "@/services/MedicalTestsService";
import { MEDICAL_TESTS_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ViewMedicalTestProps {
  displayHeader?: boolean;
  medicalTest?: Tables<"medical_tests">;
}

const ViewMedicalTest = ({
  displayHeader = true,
  medicalTest,
}: ViewMedicalTestProps) => {
  const { id } = useParams();
  const softReload = usePageSoftReload();

  const [loading, setLoading] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const [currentMedicalTest, setCurrentMedicalTest] = useState<
    Tables<"medical_tests"> | undefined
  >(medicalTest);

  const baseHref = `${window.location.origin}/${MEDICAL_TESTS_ROOT_PATH}`;

  useEffect(() => {
    const fetchMedicalTest = async () => {
      setLoading(true);

      if (!id) {
        setErrorMessage(
          `${MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR.MISSING_ID} ${baseHref}/${ViewMedicalTestRoute.path}`
        );
      } else if (id.includes("edit")) {
        setErrorMessage(
          `${MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR.MISSING_ID} ${baseHref}/${UpdateMedicalTestRoute.path}`
        );
      } else {
        try {
          const test = await getMedicalTestById(id);
          setCurrentMedicalTest(test);
        } catch (error: any) {
          console.error(
            MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR.CANNOT_FETCH_MEDICAL_TEST
          );
          console.error(error.message);

          setErrorTitle(
            MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR.CANNOT_FETCH_MEDICAL_TEST
          );
          setErrorMessage(
            `${MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR.NO_MEDICAL_TEST_WITH_ID} ${id}`
          );
        }
      }

      setLoading(false);
    };

    fetchMedicalTest();
  }, [id]);

  return (
    <PageStateWrapper
      isLoading={loading}
      hasError={!loading && !currentMedicalTest}
      errorTitle={errorTitle}
      errorMessage={errorMessage ?? ""}
      onRetry={() => {
        softReload();
      }}
    >
      {currentMedicalTest && (
        <>
          {displayHeader && (
            <PageHeadline
              title={currentMedicalTest.title}
              description={currentMedicalTest.description}
            />
          )}

          <div className="px-4 mb-5">{/* Content */}</div>
        </>
      )}
    </PageStateWrapper>
  );
};

export { ViewMedicalTest, type ViewMedicalTestProps };
