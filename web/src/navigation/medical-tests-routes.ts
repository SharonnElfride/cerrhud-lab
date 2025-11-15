import {
    type AddMedicalTestProps,
    AddMedicalTest,
} from "@/pages/medicalTests/AddMedicalTest";
import {
    type EditMedicalTestProps,
    EditMedicalTest,
} from "@/pages/medicalTests/EditMedicalTest";
import {
    type ViewMedicalTestProps,
    ViewMedicalTest,
} from "@/pages/medicalTests/ViewMedicalTest";
import {
    EditIcon,
    EyeIcon,
    MicroscopeIcon,
    PlusSquareIcon,
} from "lucide-react";
import { type AppRoute, createLeafRoute, createRouteWithChildren } from "./app_routes";
import MedicalTests from "@/pages/medicalTests/ListMedicalTest";
import MedicalTestsLayout from "@/pages/medicalTests";

export const AddMedicalTestRoute: AppRoute<AddMedicalTestProps> = createLeafRoute({
  path: "/medical-tests/new",
  label: "Add a medical test",
  icon: PlusSquareIcon,
  route: AddMedicalTest,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["medical_tests.create"],
});

export const ViewMedicalTestRoute: AppRoute<ViewMedicalTestProps> = createLeafRoute({
  path: "/medical-tests/:id",
  label: "Medical Test Details",
  icon: EyeIcon,
  route: ViewMedicalTest,
  type: "protected",
  requiredRoles: ["user", "admin", "super_admin"],
  requiredPermissions: ["medical_tests.read"],
});

export const UpdateMedicalTestRoute: AppRoute<EditMedicalTestProps> = createLeafRoute({
  path: "/medical-tests/edit/:id",
  label: "Edit Medical Test Details",
  icon: EditIcon,
  route: EditMedicalTest,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["medical_tests.update"],
});

export const ListMedicalTestsRoute = createLeafRoute({
  path: "/medical-tests",
  label: "Medical Tests",
  icon: MicroscopeIcon,
  route: MedicalTests,
  type: "protected",
  requiredRoles: ["user", "admin", "super_admin"],
  requiredPermissions: ["medical_tests.read"],
});

export const MedicalTestsRoute = createRouteWithChildren({
  path: "/medical-tests",
  label: "Medical Tests",
  icon: MicroscopeIcon,
  type: "protected",
  requiredRoles: ["user", "admin", "super_admin"],
  requiredPermissions: ["medical_tests.read"],
  layout: MedicalTestsLayout,
  children: [ListMedicalTestsRoute , AddMedicalTestRoute, ViewMedicalTestRoute, UpdateMedicalTestRoute],
});
