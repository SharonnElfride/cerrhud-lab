import MedicalTestOverview from "@/components/medical-tests/medical-test-overview";
import PageHeadline from "@/components/shared/page-headline";
import PageOverview from "@/components/shared/page-overview";
import PageStateWrapper from "@/components/shared/page-state-wrapper";
import { useAuth } from "@/context/auth-context";
import { usePageSoftReload } from "@/hooks/use-soft-reload";
import type { Tables } from "@/lib/supabase/supabase";
import { hasRequiredPermissions } from "@/navigation/guards";
import {
  MEDICAL_TESTS_ROOT_PATH,
  MedicalTestsRoute,
  UpdateMedicalTestRoute,
  ViewMedicalTestRoute,
} from "@/navigation/medical-tests-routes";
import {
  deleteMedicalTests,
  getMedicalTestById,
} from "@/services/medical-tests-service";
import { MEDICAL_TESTS_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

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
  const { user, userPermissions } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const [currentMedicalTest, setCurrentMedicalTest] = useState<
    Tables<"medical_tests"> | undefined
  >(medicalTest);

  const baseHref = `${window.location.origin}/${MEDICAL_TESTS_ROOT_PATH}`;

  const canEdit = hasRequiredPermissions(userPermissions, [
    "medical_tests.update",
  ]);

  const canDelete = hasRequiredPermissions(userPermissions, [
    "medical_tests.delete",
  ]);

  const onDelete = async () => {
    const hasBeenDeleted = await deleteMedicalTests([currentMedicalTest!.id]);

    if (hasBeenDeleted) {
      toast.success(
        MEDICAL_TESTS_VALIDATION_MESSAGES.SUCCESS.SUCCESSFUL_SINGLE_DELETION
      );
      navigate(MedicalTestsRoute.path);
    } else {
      toast.error(
        MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR.UNSUCCESSFUL_SINGLE_DELETION
      );
    }
  };

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
          console.log(
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

          <PageOverview
            canEdit={canEdit}
            canDelete={canDelete}
            entityId={currentMedicalTest.id}
            deleteFunction={onDelete}
            deletionErrorMessage={
              MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR
                .UNSUCCESSFUL_SINGLE_DELETION
            }
          >
            <MedicalTestOverview
              medicalTest={currentMedicalTest}
              isUser={!user || user.role === "user"}
            />
          </PageOverview>
        </>
      )}
    </PageStateWrapper>
  );
};

export { ViewMedicalTest, type ViewMedicalTestProps };
