export const STORAGE_MAX_FILE_SIZE = 1 * 1024 * 1024;
export const VALID_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const ImagePlaceholder = (text?: string) =>
  `https://placehold.co/600x400/6e4596/FFF?font=playfair-display${
    text && !text.isEmpty() ? `&text=${text}` : ""
  }`;

export const STORAGE_BUCKET_ID = "cerrhud_lab";
export const PROFILES_TABLENAME = "profiles";
export const PROFILES_STORAGE_PATH = "users";
export const ADMINS_TABLENAME = "profiles";
export const MEDICAL_TESTS_TABLENAME = "medical_tests";
export const MEDICAL_TESTS_STORAGE_PATH = "medical_tests";
