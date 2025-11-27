import MedicalTestForm from "@/components/medical-tests/MedicalTestForm";
import PageHeadline from "@/components/shared/PageHeadline";
import { useAuth } from "@/context/AuthContext";
import { useGoBack } from "@/hooks/use-go-back";
import type { TablesInsert } from "@/lib/supabase/supabase";
import { MedicalTestsRoute } from "@/navigation/medical-tests-routes";
import {
  addSingleMedicalTest,
  updateSingleMedicalTest,
  uploadMedicalTestImage,
} from "@/services/MedicalTestsService";
import { MedicalTestsData } from "@/shared/entity-data";
import { MEDICAL_TESTS_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
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
  const goBack = useGoBack();

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

      toast.success(
        MEDICAL_TESTS_VALIDATION_MESSAGES.SUCCESS.SUCCESSFUL_CREATION
      );
    } catch (error: any) {
      toast.error(
        error.message ??
          MEDICAL_TESTS_VALIDATION_MESSAGES.ERROR.UNSUCCESSFUL_CREATION
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
    <div>
      {displayHeader && (
        <PageHeadline
          title={MedicalTestsData.add.title}
          description={MedicalTestsData.add.description}
        />
      )}

      <div className="px-4 mb-5">
        <MedicalTestForm
          mode="create"
          onSubmit={onSubmitForm}
          onCancel={onCancelForm}
        />
      </div>
    </div>
  );
};

export { AddMedicalTest, type AddMedicalTestProps };
