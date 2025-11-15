import MedicalTestsLayout from "@/pages/medicalTests";
import {
  type AddMedicalTestProps,
  AddMedicalTest,
} from "@/pages/medicalTests/AddMedicalTest";
import {
  type EditMedicalTestProps,
  EditMedicalTest,
} from "@/pages/medicalTests/EditMedicalTest";
import MedicalTests from "@/pages/medicalTests/ListMedicalTest";
import {
  type ViewMedicalTestProps,
  ViewMedicalTest,
} from "@/pages/medicalTests/ViewMedicalTest";
import { MedicalTestsData } from "@/shared/entity-data";
import {
  EditIcon,
  EyeIcon,
  MicroscopeIcon,
  PlusSquareIcon,
} from "lucide-react";
import { createLeafRoute, createRouteWithChildren } from "./app-routes";

const MEDICAL_TESTS_ROOT_PATH = "/medical-tests";

export const AddMedicalTestRoute = createLeafRoute<AddMedicalTestProps>({
  path: `${MEDICAL_TESTS_ROOT_PATH}/new`,
  label: MedicalTestsData.add.title,
  icon: PlusSquareIcon,
  route: AddMedicalTest,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["medical_tests.create"],
});

export const ViewMedicalTestRoute = createLeafRoute<ViewMedicalTestProps>({
  path: `${MEDICAL_TESTS_ROOT_PATH}/:id`,
  label: "Medical Test Details",
  icon: EyeIcon,
  route: ViewMedicalTest,
  type: "protected",
  requiredRoles: ["user", "admin", "super_admin"],
  requiredPermissions: ["medical_tests.read"],
});

export const UpdateMedicalTestRoute = createLeafRoute<EditMedicalTestProps>({
  path: `${MEDICAL_TESTS_ROOT_PATH}/edit/:id`,
  label: MedicalTestsData.edit.title,
  icon: EditIcon,
  route: EditMedicalTest,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["medical_tests.update"],
});

export const ListMedicalTestsRoute = createLeafRoute({
  path: MEDICAL_TESTS_ROOT_PATH,
  label: MedicalTestsData.title,
  icon: MicroscopeIcon,
  route: MedicalTests,
  type: "protected",
  requiredRoles: ["user", "admin", "super_admin"],
  requiredPermissions: ["medical_tests.read"],
});

export const MedicalTestsRoute = createRouteWithChildren({
  path: MEDICAL_TESTS_ROOT_PATH,
  label: MedicalTestsData.title,
  icon: MicroscopeIcon,
  type: "protected",
  requiredRoles: ["user", "admin", "super_admin"],
  requiredPermissions: ["medical_tests.read"],
  layout: MedicalTestsLayout,
  children: [
    ListMedicalTestsRoute,
    AddMedicalTestRoute,
    ViewMedicalTestRoute,
    UpdateMedicalTestRoute,
  ],
});
