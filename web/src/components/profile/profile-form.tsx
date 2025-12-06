import { profileSchema, type ProfileFormValues } from "@/forms/profile-schema";
import { updateProfileById } from "@/services/profiles-service";
import {
  updateSupabaseAuthUser,
  type SupabaseAuthUser,
} from "@/services/supabase-service";
import type { AuthProps } from "@/shared/auth-props";
import { ADMINS_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import {
  ColorPicker,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "../ui/shadcn-io/color-picker";
import { Spinner } from "../ui/spinner";
import ProfileFormFieldInfo from "./profile-form-field-info";

const ProfileForm = ({
  user,
  logout,
}: AuthProps & {
  logout: () => Promise<void>;
}) => {
  const fieldClassName = "flex flex-col md:flex-row md:gap-5";

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name ?? "",
      surname: user?.surname ?? "",
      email: user?.email ?? "",
      profile_color: user?.profile_color ?? "#6e4596",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;

    try {
      const modifiedData: Partial<ProfileFormValues> = {};
      (Object.keys(data) as (keyof ProfileFormValues)[]).forEach((key) => {
        if (dirtyFields[key]) {
          modifiedData[key as keyof ProfileFormValues] =
            data[key as keyof ProfileFormValues];
        }
      });

      // if (modifiedData.email || modifiedData.password) {
      if (modifiedData.email && modifiedData.email !== user.email) {
        const authUserData: SupabaseAuthUser = {};
        if (modifiedData.email) authUserData.email = modifiedData.email;
        // if (modifiedData.password) userData.password = modifiedData.password;

        if (Object.keys(authUserData).length > 0) {
          await updateSupabaseAuthUser(authUserData);
          logout();
        }
      }

      // const {
      //   ["password"]: rmv,
      //   ["confirm_password"]: rmv2,
      //   ...profileData
      // } = modifiedData;

      if (Object.keys(modifiedData).length > 0) {
        await updateProfileById(user.id, modifiedData);
      }

      toast.success(
        ADMINS_VALIDATION_MESSAGES.SUCCESS.SUCCESSFUL_PROFILE_UPDATE
      );
      reset(data);
    } catch (err: any) {
      toast.error(
        err.message ??
          ADMINS_VALIDATION_MESSAGES.ERROR.UNSUCCESSFUL_PROFILE_UPDATE
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet className="gap-3">
          <FieldSeparator />
          <FieldGroup className="gap-3">
            <Field
              className={fieldClassName}
              data-invalid={!!errors.first_name || !!errors.surname}
            >
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="first_name">Nom complet</FieldLabel>
              </ProfileFormFieldInfo>

              <div className="flex flex-col w-full gap-2 md:flex-row md:gap-5">
                <div>
                  <Input
                    id="first_name"
                    type="text"
                    defaultValue={user?.first_name}
                    className="border-gray-400"
                    {...register("first_name")}
                    aria-invalid={!!errors.first_name}
                  />
                  {errors.first_name && (
                    <FieldError>{errors.first_name.message}</FieldError>
                  )}
                </div>

                <div>
                  <Input
                    id="surname"
                    type="text"
                    defaultValue={user?.surname ?? undefined}
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

          <FieldSeparator />

          <FieldGroup className="gap-3">
            <Field className={fieldClassName} data-invalid={!!errors.email}>
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="mail">Email</FieldLabel>
              </ProfileFormFieldInfo>

              <div>
                <Input
                  id="mail"
                  type="email"
                  defaultValue={user?.email}
                  className="border-gray-400"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </div>
            </Field>

            <FieldSeparator />
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
                defaultValue={user?.profile_color ?? "#6e4596"}
                onChange={(value) => {
                  setValue("profile_color", value.toString(), {
                    shouldDirty: true,
                    shouldTouch: value.toString() !== user?.profile_color,
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

          <FieldSeparator />

          {/*
          <FieldGroup className="gap-3">
            <Field className={fieldClassName} data-invalid={!!errors.password}>
              <ProfileFormFieldInfo
                className="flex flex-col gap-2"
                style={{ alignItems: "start" }}
              >
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldDescription className="text-xs max-md:min-w-fit">
                  Password must be at least <span className="font-bold">8</span>{" "}
                  characters!
                </FieldDescription>
              </ProfileFormFieldInfo>

              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="border-gray-400"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </div>
            </Field>

            <Field className={fieldClassName} data-invalid={!!errors.confirm_password}>
              <ProfileFormFieldInfo>
                <FieldLabel htmlFor="confirm_password">
                  Confirmer le mot de passe
                </FieldLabel>
              </ProfileFormFieldInfo>

              <div>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="********"
                  className="border-gray-400"
                  {...register("confirm_password")}
                  aria-invalid={!!errors.confirm_password}
                />
                {errors.confirm_password && (
                  <FieldError>{errors.confirm_password.message}</FieldError>
                )}
              </div>
            </Field>
          </FieldGroup>
          <FieldSeparator />
          */}
        </FieldSet>

        <Field orientation="horizontal">
          <Button
            type="submit"
            disabled={isSubmitting || Object.keys(dirtyFields).length === 0}
          >
            {isSubmitting ? <Spinner /> : "Enregistrer les modifications"}
          </Button>

          <Button variant="outline" type="button" disabled={isSubmitting}>
            Annuler
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ProfileForm;
