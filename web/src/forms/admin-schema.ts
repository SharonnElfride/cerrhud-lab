import { Constants } from "@/lib/supabase/supabase";
import { ADMIN_FORM_ERRORS } from "@/shared/form-validation-errors";
import { z } from "zod";
import { zodImageChecker } from "./zod-image-checker";

export const adminSchema = z.object({
  avatar: zodImageChecker({ required: false }),
  firstname: z.string().min(1, ADMIN_FORM_ERRORS.FIRSTNAME_REQUIRED),
  lastname: z.string().min(1, ADMIN_FORM_ERRORS.LASTNAME_REQUIRED),
  email: z.email(ADMIN_FORM_ERRORS.EMAIL_INVALID),
  profile_color: z
    .string()
    .regex(/^#?[0-9a-fA-F]{6}$/, ADMIN_FORM_ERRORS.PROFILE_COLOUR_INVALID),
  role: z.enum(
    Constants.public.Enums.user_role,
    ADMIN_FORM_ERRORS.ROLE_REQUIRED
  ),
  // permissions: ,

  //   title: baseMedicalTestFields.title.min(1, MEDICAL_TEST_FORM_ERRORS.TITLE_REQUIRED),
  //   description: baseMedicalTestFields.description.min(
  //     1,
  //     MEDICAL_TEST_FORM_ERRORS.DESCRIPTION_REQUIRED
  //   ),
  //   is_free: baseMedicalTestFields.is_free.refine(
  //     (v) => typeof v === "boolean",
  //     COMMON_FORM_ERRORS.INVALID_BOOLEAN
  //   ),
  //   price: baseMedicalTestFields.price.min(0, MEDICAL_TEST_FORM_ERRORS.PRICE_REQUIRED),
  //   mobile_id: baseMedicalTestFields.mobile_id
  //     .min(1, MEDICAL_TEST_FORM_ERRORS.MOBILE_ID_REQUIRED)
  //     .regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, MEDICAL_TEST_FORM_ERRORS.MOBILE_ID_FORMAT),
  //   conditions: baseMedicalTestFields.conditions.min(
  //     1,
  //     MEDICAL_TEST_FORM_ERRORS.CONDITIONS_REQUIRED
  //   ),
  //   acronym: baseMedicalTestFields.acronym,
  //   image: baseMedicalTestFields.image,
  //   keywords: baseMedicalTestFields.keywords,
  //   sample_instructions: baseMedicalTestFields.sample_instructions,
  //   custom_details: baseMedicalTestFields.custom_details,
});

export type AdminFormValues = z.infer<typeof adminSchema>;
