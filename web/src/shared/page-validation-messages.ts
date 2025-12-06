export const SHARED_VALIDATION_MESSAGES = {
  SUCCESS: {},
  ERROR: {
    AN_ERROR_OCCURRED: "Une erreur est survenue.",
    CANNOT_USE_GO_BACK: "Impossible de faire un retour en arrière.",
  },
  DIALOG: {
    LIST_DELETION:
      "Elle supprimera définitivement les éléments sélectionnés et les retirera de la base de données.",
    SINGLE_DELETION:
      "Elle supprimera définitivement l'élément et le retirera de la base de données.",
  },
};

export const MEDICAL_TESTS_VALIDATION_MESSAGES = {
  SUCCESS: {
    SUCCESSFUL_CREATION: "L'examen a bien été ajouté.",
    SUCCESSFUL_UPDATE: "L'examen a été mis à jour.",
    SUCCESSFUL_DELETION: "Les examens sélectionnés ont été supprimés.",
    SUCCESSFUL_SINGLE_DELETION: "L'examen a été supprimé.",
  },
  ERROR: {
    UNSUCCESSFUL_CREATION:
      "Une erreur est survenue lors de l'ajout de l'examen médical.",
    UNSUCCESSFUL_UPDATE:
      "Une erreur est survenue lors de la mise à jour de l'examen médical.",
    UNSUCCESSFUL_DELETION:
      "Impossible de supprimer tous les examens sélectionnés.",
    UNSUCCESSFUL_SINGLE_DELETION: "Impossible de supprimer l'examen.",
    MISSING_ID:
      "L'identifiant de l'examen médical est requis. L'URL devrait se conformer à ceci :",
    CANNOT_FETCH_MEDICAL_TEST: "Examen médical introuvable!",
    NO_MEDICAL_TEST_WITH_ID: "Aucun examen médical trouvé avec l'identifiant :",
  },
};

export const ADMINS_VALIDATION_MESSAGES = {
  SUCCESS: {
    SUCCESSFUL_AVATAR_UPDATE: "Avatar mis à jour avec succès !",
    SUCCESSFUL_PROFILE_UPDATE: "Profil mis à jour avec succès !",
    SUCCESSFUL_CREATION: "L'administrateur a bien été ajouté.",
    SUCCESSFUL_UPDATE: "La fiche de l'administrateur a bien été mise à jour.",
    SUCCESSFUL_DELETION: "Les administrateurs sélectionnés ont été supprimés.",
    SUCCESSFUL_SINGLE_DELETION: "L'administrateur a été supprimé.",
  },
  ERROR: {
    NO_USER_OR_AVATAR_FOUND: "Administrateur ou image introuvable.",
    UNSUCCESSFUL_AVATAR_UPDATE: "Échec de la mise à jour de l'avatar. :",
    UNSUCCESSFUL_PROFILE_UPDATE: "Échec de la mise à jour du profil.",
    UNSUCCESSFUL_CREATION:
      "Une erreur est survenue lors de l'ajout de l'administrateur.",
    UNSUCCESSFUL_UPDATE:
      "Une erreur est survenue lors de la mise à jour de la fiche de l'administrateur.",
    UNSUCCESSFUL_DELETION:
      "Impossible de supprimer tous les administrateurs sélectionnés.",
    UNSUCCESSFUL_SINGLE_DELETION: "Impossible de supprimer l'administrateur.",
    MISSING_ID:
      "L'identifiant de l'administrateur est requis. L'URL devrait se conformer à ceci :",
    CANNOT_FETCH_ADMIN: "Administrateur introuvable.",
    NO_ADMIN_WITH_ID: "Aucun administrateur trouvé avec l'identifiant :",
  },
};
