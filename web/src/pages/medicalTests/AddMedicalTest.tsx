import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CFieldHint from "@/components/ui/custom/cfield-hint";
import CFieldLabel from "@/components/ui/custom/cfield-label";
import CStringArrayField from "@/components/ui/custom/cstring-array-field";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  addMedicalTestSchema,
  type AddMedicalTestFormValues,
} from "@/forms/medical-test-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
  } = useForm<AddMedicalTestFormValues>({
    resolver: zodResolver(addMedicalTestSchema),
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
  const [customDetails, setCustomDetails] = useState<JSON>();

  const onSubmit = async (data: AddMedicalTestFormValues) => {
    setTimeout(() => {
      console.log("data");
      console.log(data);
      console.log("OUT the onSubmit");
    }, 10000);
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
    <div>
      {displayHeader && (
        <div>
          <h2>{AddMedicalTestData.title}</h2>
          <p>{AddMedicalTestData.description}</p>
        </div>
      )}

      <div className="px-4 mb-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSeparator />

            <FieldSet>
              <Field data-invalid={!!errors.title}>
                <CFieldLabel
                  htmlFor="title"
                  aria-invalid={!!errors.title}
                  required
                >
                  Titre
                </CFieldLabel>
                <CFieldHint>
                  
                </CFieldHint>
                <Input
                  {...register("title")}
                  id="title"
                  placeholder="Examen de la glycémie à jeun"
                  type="text"
                  aria-invalid={!!errors.title}
                />
                {errors.title && (
                  <FieldError>{errors.title.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.description}>
                <CFieldLabel
                  htmlFor="description"
                  aria-invalid={!!errors.description}
                  required
                >
                  Description
                </CFieldLabel>
                <Input
                  {...register("description")}
                  id="description"
                  placeholder="Description de l'examen médical"
                  type="text"
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
                  L'examen est gratuit
                </CFieldLabel>
                {errors.is_free && (
                  <FieldError>{errors.is_free.message}</FieldError>
                )}
              </Field>

              <Field
                className={!isFree ? "" : "hidden"}
                data-invalid={!!errors.price}
              >
                <CFieldLabel
                  htmlFor="price"
                  aria-invalid={!!errors.price}
                  required
                >
                  Prix de l'examen
                </CFieldLabel>
                <Input
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                  id="price"
                  placeholder="0"
                  type="number"
                  min={0}
                  aria-invalid={!!errors.price}
                />
                {errors.price && (
                  <FieldError>{errors.price.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.mobile_id}>
                <CFieldLabel
                  htmlFor="mobile_id"
                  aria-invalid={!!errors.mobile_id}
                  required
                >
                  Identifiant mobile
                </CFieldLabel>
                <Input
                  {...register("mobile_id")}
                  id="mobile_id"
                  placeholder="Identifiant mobile de l'examen médical"
                  type="text"
                  aria-invalid={!!errors.mobile_id}
                />

                <CFieldHint>
                  L'identifiant mobile doit être en miniscule et les mots
                  doivent être liés par un underscore (_).
                </CFieldHint>

                {errors.mobile_id && (
                  <FieldError>{errors.mobile_id.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.conditions}>
                <CStringArrayField
                  label="Conditions"
                  htmlId="conditions"
                  values={conditions}
                  onChange={(vals) => {
                    setValue("conditions", Array.from(vals), {
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                    setConditions(Array.from(vals));
                  }}
                  hint="Les conditions à remplir pour pouvoir effectuer l'examen médical."
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
                  Acronyme
                </CFieldLabel>
                <Input
                  {...register("acronym")}
                  id="acronym"
                  placeholder="Acronyme de l'examen médical"
                  type="text"
                  aria-invalid={!!errors.acronym}
                />
                {errors.acronym && (
                  <FieldError>{errors.acronym.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.image}>
                <CFieldLabel htmlFor="image" aria-invalid={!!errors.image}>
                  Image
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
                <CFieldHint aria-invalid={!!errors.image}>
                  Allowed files extensions:{" "}
                  <b>.png, .jpg, .jpeg, .svg, .webp</b>
                  <br />
                  Max file size: <b>1MB</b>
                </CFieldHint>
                {errors.image && (
                  <FieldError>{errors.image.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.keywords}>
                <CStringArrayField
                  label="Mots clés"
                  htmlId="keywords"
                  values={keywords}
                  onChange={(vals) => {
                    setValue("keywords", Array.from(vals), {
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                    setKeywords(Array.from(vals));
                  }}
                  hint="Les mots clés associés à l'examen médical."
                  hasErrors={!!errors.keywords}
                />

                {errors.keywords && (
                  <FieldError>{errors.keywords.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.sample_instructions}>
                <CStringArrayField
                  label="Instructions de prélèvements"
                  htmlId="sample_instructions"
                  values={sampleInstructions}
                  onChange={(vals) => {
                    setValue("sample_instructions", Array.from(vals), {
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                    setSampleInstructions(Array.from(vals));
                  }}
                  hint="Les instructions pour un prélèvement bien fait (si l'on souhaite l'effectuer soi-même)."
                  hasErrors={!!errors.sample_instructions}
                  hasSentences
                />

                {errors.sample_instructions && (
                  <FieldError>{errors.sample_instructions.message}</FieldError>
                )}
              </Field>

              {/* Custom details */}
            </FieldSet>

            <Field orientation="horizontal">
              <Button
                type="submit"
                disabled={
                  isSubmitting || Object.keys(touchedFields).length === 0
                }
              >
                {isSubmitting ? (
                  <>
                    <Spinner /> Submitting
                  </>
                ) : (
                  "Submit"
                )}
              </Button>

              <Button
                variant="outline"
                type="button"
                disabled={isSubmitting}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export { AddMedicalTest, AddMedicalTestData, type AddMedicalTestProps };
