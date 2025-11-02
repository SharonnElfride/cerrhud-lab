import {
  medicalTestSchema,
  type MedicalTestFormValues,
} from "@/forms/medical-test-schema";
import type { TablesInsert, TablesUpdate } from "@/lib/supabase/supabase";
import { MedicalTestFormFieldsInfo } from "@/shared/form-fields-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import CFieldHint from "../ui/custom/cfield-hint";
import CFieldLabel from "../ui/custom/cfield-label";
import CStringArrayField from "../ui/custom/cstring-array-field";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import CustomDetailsField, { type CustomDetail } from "./CustomDetailsField";

interface MedicalTestFormProps {
  onSubmit: (
    medicalTest: TablesInsert<"medical_tests"> | TablesUpdate<"medical_tests">
  ) => Promise<void>;
  onCancel?: () => void;
  isUpdate?: boolean;
}

const MedicalTestForm = ({
  onSubmit,
  onCancel,
  isUpdate = false,
}: MedicalTestFormProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
  } = useForm<MedicalTestFormValues>({
    resolver: zodResolver(medicalTestSchema),
    defaultValues: {
      is_free: false,
      conditions: [],
    },
  });

  const [isFree, setIsFree] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [conditions, setConditions] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [sampleInstructions, setSampleInstructions] = useState<string[]>([]);
  const [customDetails, setCustomDetails] = useState<CustomDetail[]>();

  const onSubmitForm = async (data: MedicalTestFormValues) => {
    setTimeout(() => {
      console.log("data");
      console.log(data);
      console.log("OUT the onSubmit");
    }, 10000);

    // TODO: Make a difference between add and edit

    await onSubmit({});
  };

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setPreview(null);
    reset();
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <FieldGroup>
        <FieldSeparator />

        <FieldSet>
          <Field data-invalid={!!errors.title}>
            <CFieldLabel htmlFor="title" aria-invalid={!!errors.title} required>
              {MedicalTestFormFieldsInfo.title.label}
            </CFieldLabel>
            <CFieldHint>{MedicalTestFormFieldsInfo.title.hint}</CFieldHint>
            <Input
              {...register("title")}
              id="title"
              placeholder={MedicalTestFormFieldsInfo.title.placeholder}
              type="text"
              aria-invalid={!!errors.title}
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.description}>
            <CFieldLabel
              htmlFor="description"
              aria-invalid={!!errors.description}
              required
            >
              {MedicalTestFormFieldsInfo.description.label}
            </CFieldLabel>
            <CFieldHint>
              {MedicalTestFormFieldsInfo.description.hint}
            </CFieldHint>
            <Textarea
              {...register("description")}
              id="description"
              className="resize-none"
              placeholder={MedicalTestFormFieldsInfo.description.placeholder}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>

          <Field orientation="horizontal" data-invalid={!!errors.is_free}>
            <Checkbox
              id="is_free"
              checked={isFree}
              onCheckedChange={(checked) => {
                if (checked !== "indeterminate") {
                  setIsFree(checked);
                  setValue("is_free", checked);
                }
              }}
              aria-invalid={!!errors.is_free}
            />
            <CFieldLabel
              htmlFor="is_free"
              aria-invalid={!!errors.is_free}
              required
            >
              {MedicalTestFormFieldsInfo.is_free.label}
            </CFieldLabel>

            {errors.is_free && (
              <FieldError>{errors.is_free.message}</FieldError>
            )}
          </Field>

          <Field
            className={!isFree ? "" : "hidden"}
            data-invalid={!!errors.price}
          >
            <CFieldLabel htmlFor="price" aria-invalid={!!errors.price} required>
              {MedicalTestFormFieldsInfo.price.label}
            </CFieldLabel>
            <Input
              {...register("price", {
                valueAsNumber: true,
              })}
              id="price"
              placeholder={MedicalTestFormFieldsInfo.price.placeholder}
              type="number"
              min={0}
              aria-invalid={!!errors.price}
            />
            {errors.price && <FieldError>{errors.price.message}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.mobile_id}>
            <CFieldLabel
              htmlFor="mobile_id"
              aria-invalid={!!errors.mobile_id}
              required
            >
              {MedicalTestFormFieldsInfo.mobile_id.label}
            </CFieldLabel>
            <Input
              {...register("mobile_id")}
              id="mobile_id"
              placeholder={MedicalTestFormFieldsInfo.mobile_id.placeholder}
              type="text"
              aria-invalid={!!errors.mobile_id}
            />

            <CFieldHint>{MedicalTestFormFieldsInfo.mobile_id.hint}</CFieldHint>

            {errors.mobile_id && (
              <FieldError>{errors.mobile_id.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.conditions}>
            <CStringArrayField
              label={MedicalTestFormFieldsInfo.conditions.label}
              htmlId="conditions"
              values={conditions}
              onChange={(vals) => {
                setValue("conditions", Array.from(vals), {
                  shouldTouch: true,
                  shouldValidate: true,
                });
                setConditions(Array.from(vals));
              }}
              hint={MedicalTestFormFieldsInfo.conditions.hint}
              hasErrors={!!errors.conditions}
              hasSentences
              required
            />

            {errors.conditions && (
              <FieldError>{errors.conditions.message}</FieldError>
            )}
          </Field>

          <FieldSeparator />

          <Field data-invalid={!!errors.acronym}>
            <CFieldLabel htmlFor="acronym" aria-invalid={!!errors.acronym}>
              {MedicalTestFormFieldsInfo.acronym.label}
            </CFieldLabel>
            <CFieldHint>{MedicalTestFormFieldsInfo.acronym.hint}</CFieldHint>
            <Input
              {...register("acronym")}
              id="acronym"
              placeholder={MedicalTestFormFieldsInfo.acronym.placeholder}
              type="text"
              aria-invalid={!!errors.acronym}
            />
            {errors.acronym && (
              <FieldError>{errors.acronym.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.image}>
            <CFieldLabel htmlFor="image" aria-invalid={!!errors.image}>
              {MedicalTestFormFieldsInfo.image.label}
            </CFieldLabel>

            {preview && (
              <div className="mt-2 flex flex-col gap-2 items-center">
                <p>Preview what the image will look like</p>
                <img
                  src={preview}
                  alt="Medical test's image preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />
              </div>
            )}

            <Input
              {...register("image")}
              id="image"
              type="file"
              accept="image/*"
              onChange={handlePreview}
              aria-invalid={!!errors.image}
            />
            <CFieldHint>{MedicalTestFormFieldsInfo.image.hint}</CFieldHint>
            {errors.image && <FieldError>{errors.image.message}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.keywords}>
            <CStringArrayField
              label={MedicalTestFormFieldsInfo.keywords.label}
              htmlId="keywords"
              values={keywords}
              onChange={(vals) => {
                setValue("keywords", Array.from(vals), {
                  shouldTouch: true,
                  shouldValidate: true,
                });
                setKeywords(Array.from(vals));
              }}
              hint={MedicalTestFormFieldsInfo.keywords.hint}
              hasErrors={!!errors.keywords}
            />

            {errors.keywords && (
              <FieldError>{errors.keywords.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.sample_instructions}>
            <CStringArrayField
              label={MedicalTestFormFieldsInfo.sample_instructions.label}
              htmlId="sample_instructions"
              values={sampleInstructions}
              onChange={(vals) => {
                setValue("sample_instructions", Array.from(vals), {
                  shouldTouch: true,
                  shouldValidate: true,
                });
                setSampleInstructions(Array.from(vals));
              }}
              hint={MedicalTestFormFieldsInfo.sample_instructions.hint}
              hasErrors={!!errors.sample_instructions}
              hasSentences
            />

            {errors.sample_instructions && (
              <FieldError>{errors.sample_instructions.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.custom_details}>
            <CustomDetailsField
              label={MedicalTestFormFieldsInfo.custom_details.label}
              htmlId="custom_details"
              values={customDetails ?? []}
              onChange={(vals) => {
                setValue("custom_details", vals, {
                  shouldTouch: true,
                  shouldValidate: true,
                });
                setCustomDetails(vals);
              }}
              hint={MedicalTestFormFieldsInfo.custom_details.hint}
              hasErrors={!!errors.custom_details}
            />

            {errors.custom_details && (
              <FieldError>{errors.custom_details.message}</FieldError>
            )}
          </Field>
        </FieldSet>

        <Field orientation="horizontal">
          <Button
            type="submit"
            disabled={isSubmitting || Object.keys(touchedFields).length === 0}
          >
            {isSubmitting ? (
              <>
                <Spinner /> En ajout...
              </>
            ) : (
              "Ajouter"
            )}
          </Button>

          <Button
            variant="outline"
            type="button"
            disabled={isSubmitting}
            onClick={handleCancel}
          >
            Annuler
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default MedicalTestForm;
