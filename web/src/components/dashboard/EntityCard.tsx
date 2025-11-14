import { cn } from "@/lib/utils";
import {
  AddMedicalTestRoute,
  AddUserRoute,
  MedicalTestsRoute,
  UsersRoute,
} from "@/navigation/app_routes";
import { getMedicalTests } from "@/services/MedicalTestsService";
import { getProfiles } from "@/services/ProfilesService";
import {
  AdminsData,
  MedicalTestsData,
  type EntityData,
} from "@/shared/entity-data";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Spinner } from "../ui/spinner";

interface EntityCardProps {
  entityType: "medical_tests" | "users";
}

const EntityCard = ({ entityType }: EntityCardProps) => {
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState<number>();
  const entityData: EntityData =
    entityType === "medical_tests" ? MedicalTestsData : AdminsData;

  useEffect(() => {
    setLoading(true);

    async function getData() {
      let data: any[] | undefined | null;

      switch (entityType) {
        case "medical_tests":
          data = await getMedicalTests();
          break;
        case "users":
          data = await getProfiles();
          break;
        default:
          break;
      }

      setTotalData(data?.length);
      setLoading(false);
    }

    getData();
  }, []);

  return (
    <Card className="pb-0 justify-between border-t-4 border-t-accent">
      <CardHeader>
        <CardTitle>{entityData.title}</CardTitle>
        <CardDescription>{entityData.description}</CardDescription>
        <CardAction>
          <Link
            to={
              entityType === "medical_tests"
                ? MedicalTestsRoute.path
                : UsersRoute.path
            }
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          >
            Voir tous
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Total d'éléments : {loading ? <Spinner /> : totalData}</p>
      </CardContent>
      <CardFooter className="bg-muted rounded-b-md">
        <Link
          to={
            entityType === "medical_tests"
              ? AddMedicalTestRoute.path
              : AddUserRoute.path
          }
          className={cn(
            buttonVariants({
              variant: "link",
              size: "sm",
              className: "px-0 py-2",
            })
          )}
        >
          <entityData.icon /> {entityData.add.title}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EntityCard;
