export const COMMON_FORM_ERRORS = {
  REQUIRED: "Champ requis",
  INVALID_FORMAT: "Format invalide",
  INVALID_FILE_TYPE: "⚠️ Type de fichier non valide",
  FILE_TOO_LARGE: "⚠️ Le fichier doit être inférieur à 1 Mo",
  MIN_ONE_ITEM: "Champ requis - au moins un élément",
  INVALID_EMAIL: "Adresse email invalide",
  INVALID_PHONE: "Numéro de téléphone invalide",
  INVALID_BOOLEAN: "Valeur booléenne invalide",
  INVALID_NUMBER: "Valeur numérique invalide",
  INVALID_LOWERCASE: "La valeur doit être en minuscules",
};

export const MEDICAL_TEST_FORM_ERRORS = {
  TITLE_REQUIRED: "Le titre de l'examen est requis.",
  DESCRIPTION_REQUIRED: "La description de l'examen est requise.",
  PRICE_REQUIRED: "Le prix de l'examen est requis.",
  PRICE_CANNOT_BE_ZERO: "Le prix de l'examen doit-être supérieur à 0.",
  CONDITIONS_REQUIRED: "Veuillez ajouter au moins une condition.",
  MOBILE_ID_REQUIRED: "L'identifiant mobile est requis.",
  MOBILE_ID_FORMAT:
    "L'identifiant mobile doit être en minuscules et séparé par des underscores (_).",
  CUSTOM_DETAILS_TITLE_REQUIRED: "Le titre du détail est requis.",
  CUSTOM_DETAILS_ONE_VALUE_NOT_EMPTY: "La valeur ne peut pas être vide.",
  CUSTOM_DETAILS_AT_LEAST_ONE_VALUE_REQUIRED:
    "Ajoutez au moins une valeur pour ce détail.",
};

export const USER_FORM_ERRORS = {
  FIRSTNAME_REQUIRED: "Le prénom est requis.",
  LASTNAME_REQUIRED: "Le nom est requis.",
  EMAIL_REQUIRED: "L'adresse email est requise.",
  EMAIL_INVALID: "Veuillez entrer une adresse email valide.",
  PASSWORD_REQUIRED: "Le mot de passe est requis.",
  PASSWORD_MIN: "Le mot de passe doit contenir au moins 8 caractères.",
  ROLE_REQUIRED: "Le rôle de l'utilisateur est requis.",
};
