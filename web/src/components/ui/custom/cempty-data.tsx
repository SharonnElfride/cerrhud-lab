import type { AppRoute } from "@/navigation/app_routes";
import { Grid2X2XIcon } from "lucide-react";
import type { MouseEventHandler } from "react";
import { Button } from "../button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../empty";

interface CEmptyDataProps {
  appRoute: AppRoute;
  addDataButtonText: string;
  addDataButtonOnClick?: MouseEventHandler<HTMLButtonElement>;
  canAccessMoreButton?: boolean;
}

function CEmptyData({
  appRoute,
  addDataButtonText,
  addDataButtonOnClick,
  canAccessMoreButton = false,
}: CEmptyDataProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {appRoute.icon ? <appRoute.icon /> : <Grid2X2XIcon />}
        </EmptyMedia>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>No data found</EmptyDescription>
      </EmptyHeader>
      {canAccessMoreButton && (
        <EmptyContent>
          <Button onClick={addDataButtonOnClick}>{addDataButtonText}</Button>
        </EmptyContent>
      )}
    </Empty>
  );
}

export { CEmptyData, type CEmptyDataProps };
