import { adminSchema, type AdminFormValues } from "@/forms/admin-schema";
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/lib/supabase/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ProfileFormFieldInfo from "../profile/profile-form-field-info";
import { Button } from "../ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "../ui/field";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  ColorPicker,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "../ui/shadcn-io/color-picker";
import { Spinner } from "../ui/spinner";

type AdminFormProps =
  | {
      mode: "create";
      initialData?: null;
      onSubmit: (
        values: TablesInsert<"profiles">,
        images?: FileList
      ) => Promise<void>;
      onCancel?: () => void;
    }
  | {
      mode: "edit";
      initialData: Tables<"profiles">;
      onSubmit: (values: TablesUpdate<"profiles">) => Promise<void>;
      onCancel?: () => void;
    };

const AdminForm = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: AdminFormProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields, defaultValues },
    reset,
  } = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues:
      mode === "edit" && initialData
        ? {
            avatar: undefined,
            firstname: initialData.firstname,
            surname: initialData.surname ?? undefined,
            email: initialData.email,
            profile_color: initialData.profile_color ?? "#6e4596",
            role: initialData.role,
          }
        : {
            role: "user",
          },
  });

  const [preview, setPreview] = useState<string | null>(
    initialData?.avatar ?? null
  );

  //   const [keywords, setKeywords] = useState<string[]>(
  //     initialData?.keywords ?? []
  //   );

  //   const [customDetails, setCustomDetails] = useState<CustomDetail[]>(
  //     initialData ? toCustomDetailObject(initialData.custom_details) : []
  //   );

  const [fileList, setFileList] = useState<FileList | null>(null);

  const dirtyManagedField = {
    shouldDirty: true,
    shouldTouch: true,
    shouldValidate: true,
  };

  const fieldClassName = "flex flex-col md:flex-row md:gap-5";

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileList(e.target.files);
      setPreview(URL.createObjectURL(file));
      setValue("avatar", e.target.files as any, dirtyManagedField);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    reset();
    onCancel?.();
  };

  const onSubmitForm = async (data: AdminFormValues) => {
    /*
    try {
      const modifiedData: Partial<MedicalTestFormValues> = {};
      (Object.keys(data) as (keyof MedicalTestFormValues)[]).forEach((key) => {
        if (dirtyFields[key]) {
          modifiedData[key] = data[key] as any;
        }
      });

      let transformedData: Partial<TablesUpdate<"medical_tests">> = {};

      const { is_free, price, image, custom_details, ...testData } =
        modifiedData;

      if (is_free || price) {
        transformedData = {
          ...transformedData,
          price: is_free ? 0 : price,
        };
      }

      if (custom_details) {
        transformedData = {
          ...transformedData,
          custom_details: custom_details
            ? fromCustomDetailObject(custom_details)
            : [],
        };
      }

      if (image) {
        transformedData = {
          ...transformedData,
          image: null,
        };
      }

      transformedData = {
        ...transformedData,
        ...testData,
      };

      if (mode === "create") {
        await onSubmit(transformedData as TablesInsert<"medical_tests">, image);
      } else {
        if (dirtyFields.image && image) {
          const imageUrl = await uploadMedicalTestImage(
            initialData.id,
            image[0]
          );

          transformedData = {
            ...transformedData,
            image: imageUrl,
          };
        }

        await onSubmit(transformedData as TablesUpdate<"medical_tests">);
      }

      handleCancel();
    } catch (error) {
      console.error(error);
    }
      */
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <FieldGroup>
        <FieldSeparator />

        <FieldSet className="gap-3">
          <FieldLegend>General Information</FieldLegend>
          <FieldDescription>
            The billing address associated with your payment method
          </FieldDescription>

          <FieldGroup>
            <FieldGroup className="gap-3">
              <Field
                className={fieldClassName}
                data-invalid={!!errors.firstname || !!errors.surname}
              >
                <ProfileFormFieldInfo>
                  <FieldLabel htmlFor="firstname">Nom complet</FieldLabel>
                </ProfileFormFieldInfo>

                <div className="flex flex-col w-full gap-2 md:flex-row md:gap-5">
                  <div>
                    <Input
                      id="firstname"
                      type="text"
                      className="border-gray-400"
                      {...register("firstname")}
                      aria-invalid={!!errors.firstname}
                    />
                    {errors.firstname && (
                      <FieldError>{errors.firstname.message}</FieldError>
                    )}
                  </div>

                  <div>
                    <Input
                      id="surname"
                      type="text"
                      placeholder="Nom de famille"
                      className="border-gray-400"
                      {...register("surname")}
                      aria-invalid={!!errors.surname}
                    />
                    {errors.surname && (
                      <FieldError>{errors.surname.message}</FieldError>
                    )}
                  </div>
                </div>
              </Field>
            </FieldGroup>

            <Field className={fieldClassName} data-invalid={!!errors.email}>
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="mail">Email</FieldLabel>
              </ProfileFormFieldInfo>

              <div>
                <Input
                  id="mail"
                  type="email"
                  className="border-gray-400"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </div>
            </Field>

            <Field
              className={fieldClassName}
              data-invalid={!!errors.profile_color}
            >
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="profile_tint">Profile tint</FieldLabel>
              </ProfileFormFieldInfo>

              <ColorPicker
                id="profile_tint"
                className={`rounded-md border bg-background p-4 shadow-sm ${
                  !errors.profile_color ? "" : "border-red-500"
                }`}
                defaultValue={initialData?.profile_color ?? "#6e4596"}
                onChange={(value) => {
                  setValue("profile_color", value.toString(), {
                    shouldDirty: true,
                    shouldTouch:
                      value.toString() !== initialData?.profile_color,
                    // shouldTouch: value.toString() === "#6e4596" || value.toString() !== initialData?.profile_color,
                  });
                }}
              >
                <ColorPickerSelection />
                <div className="flex items-center">
                  <ColorPickerHue />
                </div>
                <div className="flex items-center gap-2">
                  <ColorPickerOutput />
                  <ColorPickerFormat />
                </div>
              </ColorPicker>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLabel htmlFor="compute-environment-p8w">Role</FieldLabel>
          <FieldDescription>
            Select the compute environment for your cluster.
          </FieldDescription>
          <RadioGroup defaultValue="kubernetes">
            <FieldLabel htmlFor="kubernetes-r2h">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Kubernetes</FieldTitle>
                  <FieldDescription>
                    Run GPU workloads on a K8s configured cluster.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="kubernetes" id="kubernetes-r2h" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="vm-z4k">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Virtual Machine</FieldTitle>
                  <FieldDescription>
                    Access a VM configured cluster to run GPU workloads.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="vm" id="vm-z4k" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet className="gap-3">
          <FieldLegend>Permissions</FieldLegend>
          <FieldDescription>
            The billing address associated with your payment method
          </FieldDescription>

          {/*  */}
        </FieldSet>

        <Field orientation="horizontal">
          <Button
            type="submit"
            disabled={isSubmitting || Object.keys(dirtyFields).length === 0}
          >
            {isSubmitting ? (
              <>
                <Spinner />{" "}
                {mode === "create" ? "En ajout..." : "Enrégistrement en cours"}
              </>
            ) : mode === "create" ? (
              "Ajouter"
            ) : (
              "Enrégistrer les modifications"
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

export default AdminForm;
