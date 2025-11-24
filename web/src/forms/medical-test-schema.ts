import {
  COMMON_FORM_ERRORS,
  MEDICAL_TEST_FORM_ERRORS,
} from "@/shared/form-validation-errors";
import { z } from "zod";
import { zodImageChecker } from "./zod-image-checker";

const baseMedicalTestFields = {
  title: z.string(),
  description: z.string(),
  is_free: z.boolean(),
  price: z.number(COMMON_FORM_ERRORS.INVALID_NUMBER),
  mobile_id: z.string().lowercase(COMMON_FORM_ERRORS.INVALID_LOWERCASE),
  conditions: z.array(z.string()),
  acronym: z.string().optional(),
  image: zodImageChecker({ required: false }),
  keywords: z.array(z.string()).optional(),
  sample_instructions: z.array(z.string()).optional(),
  custom_details: z
    .array(
      z.object({
        title: z
          .string()
          .min(1, MEDICAL_TEST_FORM_ERRORS.CUSTOM_DETAILS_TITLE_REQUIRED),
        values: z
          .array(
            z
              .string()
              .min(1, MEDICAL_TEST_FORM_ERRORS.CUSTOM_DETAILS_ONE_VALUE_NOT_EMPTY)
          )
          .min(
            1,
            MEDICAL_TEST_FORM_ERRORS.CUSTOM_DETAILS_AT_LEAST_ONE_VALUE_REQUIRED
          ),
      })
    )
    .optional(),
};

export const medicalTestSchema = z.object({
  title: baseMedicalTestFields.title.min(1, MEDICAL_TEST_FORM_ERRORS.TITLE_REQUIRED),
  description: baseMedicalTestFields.description.min(
    1,
    MEDICAL_TEST_FORM_ERRORS.DESCRIPTION_REQUIRED
  ),
  is_free: baseMedicalTestFields.is_free.refine(
    (v) => typeof v === "boolean",
    COMMON_FORM_ERRORS.INVALID_BOOLEAN
  ),
  price: baseMedicalTestFields.price.min(0, MEDICAL_TEST_FORM_ERRORS.PRICE_REQUIRED),
  mobile_id: baseMedicalTestFields.mobile_id
    .min(1, MEDICAL_TEST_FORM_ERRORS.MOBILE_ID_REQUIRED)
    .regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, MEDICAL_TEST_FORM_ERRORS.MOBILE_ID_FORMAT),
  conditions: baseMedicalTestFields.conditions.min(
    1,
    MEDICAL_TEST_FORM_ERRORS.CONDITIONS_REQUIRED
  ),
  acronym: baseMedicalTestFields.acronym,
  image: baseMedicalTestFields.image,
  keywords: baseMedicalTestFields.keywords,
  sample_instructions: baseMedicalTestFields.sample_instructions,
  custom_details: baseMedicalTestFields.custom_details,
}).refine((data) => {
  return data.is_free || data.price > 0;
}, {
  error: MEDICAL_TEST_FORM_ERRORS.PRICE_CANNOT_BE_ZERO,
  path: ["price"]
});

export type MedicalTestFormValues = z.infer<typeof medicalTestSchema>;
