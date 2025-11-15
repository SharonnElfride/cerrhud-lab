import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

const ParentRouteLayoutTemplate = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("px-2 space-y-5", className)} {...props}>
      <Outlet />
    </div>
  );
};

export default ParentRouteLayoutTemplate;
