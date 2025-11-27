import { useGoBack } from "@/hooks/use-go-back";
import { cn } from "@/lib/utils";
import { MedicalTestsRoute } from "@/navigation/medical-tests-routes";
import { SHARED_VALIDATION_MESSAGES } from "@/shared/page-validation-messages";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowLeftIcon, RefreshCwIcon } from "lucide-react";
import type React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

interface PageErrorProps {
  errorTitle?: string;
  errorMessage: string;
  onRetry: () => void;
  showBackButton?: boolean;
}

const PageError = ({
  errorTitle = SHARED_VALIDATION_MESSAGES.ERROR.AN_ERROR_OCCURRED,
  errorMessage,
  onRetry,
  showBackButton = true,
  className,
  ...props
}: PageErrorProps & React.ComponentProps<typeof Card>) => {
  const goBack = useGoBack();

  return (
    <Card className={cn("m-10", className)} {...props}>
      <CardContent>
        <div className="flex flex-col justify-between items-center gap-10">
          <DotLottieReact
            src="https://lottie.host/f251cb7a-f1ec-4a80-b6a1-7c4f06ebd222/qqV3uT77W4.lottie"
            loop
            autoplay
            className="w-80"
          />

          <h2 className="text-lg font-bold underline underline-offset-8 text-destructive">
            {errorTitle}
          </h2>

          <p className="text-justify text-black/70 text-sm">{errorMessage}</p>
        </div>
      </CardContent>
      <CardFooter className="gap-5 items-center justify-center">
        <Button variant={"secondary"} size={"sm"} onClick={onRetry}>
          <RefreshCwIcon /> Réessayer
        </Button>
        {showBackButton && (
          <Button
            variant={"link"}
            size={"sm"}
            onClick={() => {
              goBack(MedicalTestsRoute.path);
            }}
          >
            <ArrowLeftIcon /> Retour
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export { PageError, type PageErrorProps };
