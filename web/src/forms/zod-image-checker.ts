import { STORAGE_MAX_FILE_SIZE, VALID_IMAGE_TYPES } from "@/shared/constants";
import { z } from "zod";

export const zodImageChecker = ({
  required = true,
}: {
  required?: boolean;
}) => {
  const fileSchema = z
    .instanceof(FileList)
    .refine((files) => files.length <= 1, "Please select only one file.")
    .refine(
      (files) => !files.length || VALID_IMAGE_TYPES.includes(files[0].type),
      "⚠️ Invalid file type. Only .jpg, .jpeg, .png, .webp, .svg files are allowed."
    )
    .refine(
      (files) => !files.length || files[0].size <= STORAGE_MAX_FILE_SIZE,
      `⚠️ The file must be smaller than ${
        STORAGE_MAX_FILE_SIZE / 1024 / 1024
      }MB.`
    );

  if (required) {
    return fileSchema.refine(
      (files) => files && files.length > 0,
      "Please select a file."
    );
  }

  return z
    .union([z.undefined(), fileSchema])
    .refine(
      (val) =>
        !val ||
        (val instanceof FileList &&
          (val.length === 0 || val[0] instanceof File)),
      "Invalid file input."
    );
};
