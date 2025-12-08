import { z } from "zod";
import { zodImageChecker } from "./zod-image-checker";
import { Constants } from "@/lib/supabase/supabase";

export const adminSchema = z.object({
  avatar: zodImageChecker({ required: false }),
  firstname: z.string().min(1, "First name is required"),
  surname: z.string(),
  email: z.email("Adresse e-mail invalide."),
  profile_color: z.string().regex(/^#?[0-9a-fA-F]{6}$/, "Couleur invalide"),
  role: z.enum(Constants.public.Enums.user_role, ""),
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
