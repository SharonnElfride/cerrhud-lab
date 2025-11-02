import { z } from "zod";
import { zodImageChecker } from "./zod-image-checker";

export const addMedicalTestSchema = z.object({
  title: z.string().min(1, "Champ requis"),
  description: z.string().min(1, "Champ requis"),
  is_free: z.boolean("Champ requis"),
  price: z.number().min(0, "Champ requis"),
  mobile_id: z.string().min(1, "Champ requis").lowercase(),
  conditions: z
    .array(z.string())
    .min(1, "Champ requis - au moins une condition"),
  acronym: z.string().optional(),
  image: zodImageChecker({ required: false }),
  keywords: z.array(z.string()).optional(),
  sample_instructions: z.array(z.string()).optional(),
  custom_details: z.json().optional(),
});

export type AddMedicalTestFormValues = z.infer<typeof addMedicalTestSchema>;

export const editMedicalTestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  is_free: z.boolean("Champ requis").optional(),
  price: z.number().optional(),
  mobile_id: z.string().lowercase().optional(),
  conditions: z.array(z.string()).optional(),
  acronym: z.string().optional(),
  image: zodImageChecker({ required: false }),
  keywords: z.array(z.string()).optional(),
  sample_instructions: z.array(z.string()).optional(),
  custom_details: z.json().optional(),
});

export type EditMedicalTestFormValues = z.infer<typeof editMedicalTestSchema>;
