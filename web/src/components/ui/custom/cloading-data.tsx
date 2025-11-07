import type { AppRoute } from "@/navigation/app_routes";
import { GalleryVerticalEndIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../empty";
import { Spinner } from "../spinner";

interface CLoadingDataProps {
  appRoute: AppRoute;
}

function CLoadingData({ appRoute }: CLoadingDataProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {appRoute.icon ? <appRoute.icon /> : <GalleryVerticalEndIcon />}
        </EmptyMedia>
        <EmptyTitle>
          <Spinner className="size-6" />
        </EmptyTitle>
        <EmptyDescription>Chargement des données...</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export { CLoadingData, type CLoadingDataProps };
