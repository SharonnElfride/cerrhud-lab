export const SHARED_VALIDATION_MESSAGES = {
  SUCCESS: {},
  ERROR: {
    AN_ERROR_OCCURRED: "Une erreur est survenue.",
    CANNOT_USE_GO_BACK: "Impossible de faire un retour en arrière.",
  },
};

export const MEDICAL_TESTS_VALIDATION_MESSAGES = {
  SUCCESS: {
    SUCCESSFUL_CREATION: "L'examen a bien été ajouté.",
    SUCCESSFUL_UPDATE: "L'examen a été mis à jour.",
    SUCCESSFUL_DELETION: "Les examens sélectionnés ont été supprimés.",
  },
  ERROR: {
    UNSUCCESSFUL_CREATION:
      "Une erreur est survenue lors de l'ajout de l'examen médical.",
    UNSUCCESSFUL_UPDATE:
      "Une erreur est survenue lors de la mise à jour de l'examen médical.",
    UNSUCCESSFUL_DELETION:
      "Impossible de supprimer tous les examens sélectionnés.",
    MISSING_ID:
      "L'identifiant de l'examen médical est requis. L'URL devrait se conformer à ceci :",
    CANNOT_FETCH_MEDICAL_TEST: "Examen médical introuvable!",
    NO_MEDICAL_TEST_WITH_ID: "Aucun examen médical avec l'identifiant :",
  },
};

export const USERS_VALIDATION_MESSAGES = {
  SUCCESS: {
    SUCCESSFUL_AVATAR_UPDATE: "Avatar mis à jour avec succès !",
    SUCCESSFUL_PROFILE_UPDATE: "Profil mis à jour !",
  },
  ERROR: {
    NO_USER_OR_AVATAR_FOUND: "Utilisateur ou image introuvable.",
    UNSUCCESSFUL_AVATAR_UPDATE: "Échec de la mise à jour de l'avatar :",
    UNSUCCESSFUL_PROFILE_UPDATE: "Échec de la mise à jour du profil.",
  },
};
