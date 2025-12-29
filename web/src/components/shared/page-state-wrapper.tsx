import type { ReactNode } from "react";
import { PageError, type PageErrorProps } from "./page-error";
import PageLoader from "./page-loader";

interface PageStateWrapperProps {
  isLoading: boolean;
  hasError: boolean;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
}

const PageStateWrapper = ({
  isLoading,
  hasError,
  loadingComponent,
  errorComponent,
  errorTitle,
  errorMessage,
  onRetry,
  showBackButton,
  children,
  ...props
}: PageStateWrapperProps & PageErrorProps & React.ComponentProps<"div">) => {
  if (isLoading)
    return loadingComponent ? <>{loadingComponent}</> : <PageLoader />;

  if (hasError)
    return errorComponent ? (
      <>{errorComponent}</>
    ) : (
      <PageError
        errorTitle={errorTitle}
        errorMessage={errorMessage}
        onRetry={onRetry}
        showBackButton={showBackButton}
      />
    );

  return <div {...props}>{children}</div>;
};

export default PageStateWrapper;
