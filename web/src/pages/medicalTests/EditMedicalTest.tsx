import MedicalTestForm from "@/components/medical-tests/MedicalTestForm";
import PageHeadline from "@/components/shared/PageHeadline";
import PageStateWrapper from "@/components/shared/PageStateWrapper";
import { useAuth } from "@/context/AuthContext";
import { useGoBack } from "@/hooks/use-go-back";
import { usePageSoftReload } from "@/hooks/use-soft-reload";
import type { Tables, TablesUpdate } from "@/lib/supabase/supabase";
import {
  MEDICAL_TESTS_ROOT_PATH,
  MedicalTestsRoute,
  UpdateMedicalTestRoute,
} from "@/navigation/medical-tests-routes";
import {
  getMedicalTestById,
  updateSingleMedicalTest,
} from "@/services/MedicalTestsService";
import { MedicalTestsData } from "@/shared/entity-data";
import { MEDICAL_TESTS_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface EditMedicalTestProps {
  displayHeader?: boolean;
  medicalTest?: Tables<"medical_tests">;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const EditMedicalTest = ({
  displayHeader = true,
  medicalTest,
  onSubmit,
  onCancel,
}: EditMedicalTestProps) => {
  const { user } = useAuth();
  const { id } = useParams();
  const goBack = useGoBack();
  const softReload = usePageSoftReload();

  const updateHref = `${window.location.origin}/${MEDICAL_TESTS_ROOT_PATH}/${UpdateMedicalTestRoute.path}`;

  const [formMedicalTest, setFormMedicalTest] = useState<
    Tables<"medical_tests"> | undefined
  >(medicalTest);

  const [loading, setLoading] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const fetchMedicalTest = async () => {
      setLoading(true);

      if (!id) {
        setErrorMessage(
          `${MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR.MISSING_ID} ${updateHref}`
        );
      } else {
        try {
          const test = await getMedicalTestById(id);
          setFormMedicalTest(test);
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

  const onSubmitForm = async (data: TablesUpdate<"medical_tests">) => {
    try {
      data = {
        ...data,
        updated_at: new Date().toDateString(),
        updated_by: user?.id,
      };

      await updateSingleMedicalTest(formMedicalTest!.id, data);
      onSubmit?.();

      toast.success(
        MEDICAL_TESTS_VALIDATION_MESSAGES.SUCCESS.SUCCESSFUL_UPDATE
      );
    } catch (error: any) {
      toast.error(
        error.message ??
          MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR.UNSUCCESSFUL_UPDATE
      );
    }
  };

  const onCancelForm = () => {
    if (onCancel) {
      onCancel();
    } else {
      goBack(MedicalTestsRoute.path);
    }
  };

  return (
    <PageStateWrapper
      isLoading={loading}
      hasError={!loading && !formMedicalTest}
      errorTitle={errorTitle}
      errorMessage={errorMessage ?? ""}
      onRetry={() => {
        softReload();
      }}
    >
      {formMedicalTest && (
        <>
          {displayHeader && (
            <PageHeadline
              title={MedicalTestsData.edit.title}
              description={MedicalTestsData.edit.description}
            />
          )}

          <div className="px-4 mb-5">
            <MedicalTestForm
              mode="edit"
              initialData={formMedicalTest}
              onSubmit={onSubmitForm}
              onCancel={onCancelForm}
            />
          </div>
        </>
      )}
    </PageStateWrapper>
  );
};

export { EditMedicalTest, type EditMedicalTestProps };
