export const SHARED_VALIDATION_MESSAGES = {
  SUCCESS: {},
  ERROR: {},
};

export const MEDICAL_TESTS_VALIDATION_MESSAGES = {
  SUCCESS: {},
  ERROR: {
    MISSING_ID:
      "L'identifiant de l'examen médical est requis. L'URL devrait se conformer à ceci :",
    CANNOT_FETCH_MEDICAL_TEST:
      "Examen médical introuvable!",
      NO_MEDICAL_TEST_WITH_ID: "Aucun examen médical avec l'identifiant :"
  },
};

export const USERS_VALIDATION_MESSAGES = {
  SUCCESS: {},
  ERROR: {},
};
