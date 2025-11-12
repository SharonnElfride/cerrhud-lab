import { getMedicalTests } from "@/services/MedicalTestsService";
import { getProfiles } from "@/services/ProfilesService";
import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface EntityCardProps {
  entityType: "medical_tests" | "users";
}

const SkeletonCard = ({}) => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

const EntityCard = ({ entityType }: EntityCardProps) => {
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState<number>();

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
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
        <p>{loading}</p>
        <p>{totalData}</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default EntityCard;
