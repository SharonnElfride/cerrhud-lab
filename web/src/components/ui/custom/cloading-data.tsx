import type { AppRouteBase } from "@/navigation/app-route-types";
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
  appRoute: AppRouteBase;
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
