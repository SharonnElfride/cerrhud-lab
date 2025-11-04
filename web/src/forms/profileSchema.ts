import { z } from "zod";
import { zodImageChecker } from "./zod-image-checker";

export const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  surname: z.string().optional(),
  email: z.email("Adresse e-mail invalide."),
  profile_color: z.string().regex(/^#?[0-9a-fA-F]{6}$/, "Couleur invalide"),
  // password: z
  //   .string()
  //   .min(8, "Password must be at least 8 characters")
  //   .optional(),
  // confirm_password: z.string().min(8).optional(),
});
// .refine(
//   (data) => {
//     if (data.password || data.confirm_password) {
//       return data.password === data.confirm_password;
//     }
//     return true;
//   },
//   {
//     message: "Les mots de passe sont différents.",
//     path: ["confirmPassword"],
//   }
// );

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const avatarUploadSchema = z.object({
  avatar: zodImageChecker({}),
});

export type AvatarUploadFormValues = z.infer<typeof avatarUploadSchema>;
