export const MedicalTestFormFieldsInfo = {
  title: {
    label: "Titre",
    placeholder: "Examen de la glycémie à jeun",
    hint: "Nom complet de l'examen tel qu'il doit apparaître dans les résultats et la facturation.",
  },
  description: {
    label: "Description",
    placeholder:
      "Mesure du taux de glucose dans le sang après une période de jeûne de 8 à 12 heures.",
    hint: "Brève description expliquant l'objectif ou le principe de l'examen.",
  },
  is_free: {
    label: "L'examen est gratuit",
  },
  price: {
    label: "Prix de l'examen (en FCFA)",
    placeholder: "5000",
  },
  mobile_id: {
    label: "Identifiant mobile",
    placeholder: "glycemie_a_jeun",
    hint: "Utilisé par l'application mobile pour identifier l'examen. Écrire uniquement en minuscules, sans espaces, et utiliser “_” pour séparer les mots.",
    shortHint: "Utilisé par l'application mobile pour identifier l'examen.",
  },
  conditions: {
    label: "Conditions",
    hint: "Liste des conditions à remplir avant de pouvoir effectuer l'examen.",
  },
  acronym: {
    label: "Acronyme",
    placeholder: "GAJ",
    hint: "Acronyme standard ou code interne pour l'examen, s'il existe.",
  },
  image: {
    label: "Image",
    hint: "Formats autorisés : .png, .jpg, .jpeg, .svg, .webp — Taille maximale : 1 Mo. L'image sera utilisée pour illustrer l'examen.",
    shortHint: "Image utilisée pour illustrer l'examen.",
  },
  keywords: {
    label: "Mots clés",
    hint: "Liste de mots associés à l'examen. Aident à le retrouver rapidement via la recherche.",
  },
  sample_instructions: {
    label: "Instructions de prélèvement",
    hint: "Indique la méthode ou les précautions à suivre lors du prélèvement.",
  },
  custom_details: {
    label: "Détails personnalisés",
    hint: "Ajoutez des informations complémentaires spécifiques à cet examen. Ajoutez des sections comme « Préparation avant le test » avec leurs instructions.",
  },
};
