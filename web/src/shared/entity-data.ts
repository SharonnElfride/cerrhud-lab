import { MicroscopeIcon, UsersIcon, type LucideProps } from "lucide-react";

interface EntitySubPageData {
  title: string;
  description: string;
}

interface EntityData {
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  add: EntitySubPageData;
  edit: EntitySubPageData;
  view: {
    overviewCardTitle: string;
  };
}

const MedicalTestsData: EntityData = {
  title: "Examens médicaux",
  description: "Liste des examens disponibles avec leurs détails et tarifs.",
  icon: MicroscopeIcon,
  add: {
    title: "Ajouter un examen",
    description:
      "Créez un nouvel examen médical en renseignant ses informations principales, son prix et ses instructions d'échantillonnage.",
  },
  edit: {
    title: "Éditer un examen",
    description:
      "Modifiez les détails d'un examen médical existant, mettez à jour ses informations ou ajustez son prix.",
  },
  view: {
    overviewCardTitle: "Informations relatives à l'examen médical",
  },
};

const AdminsData: EntityData = {
  title: "Administrateurs",
  description:
    "Gestion des administrateurs et de leurs droits d'accès à l'interface web.",
  icon: UsersIcon,
  add: {
    title: "Ajouter un administrateur",
    description:
      "Ajoutez un nouvel administrateur à la plateforme Cerrhud Lab et attribuez-lui un rôle ainsi que des permissions adaptées.",
  },
  edit: {
    title: "Éditer un administrateur",
    description:
      "Mettez à jour les informations d'un administrateur existant ou ajustez ses rôles et permissions.",
  },
  view: {
    overviewCardTitle: "Informations relatives à l'administrateur",
  },
};

const SharedEntityData = {
  id: "Identifiant",
  metadata: "Métadonnées",
  createdAt: "Créé le",
  createdBy: "Créé par",
  updatedAt: "Dernière modification le",
  updatedBy: "Modifié par",
};

export { AdminsData, MedicalTestsData, SharedEntityData, type EntityData };
