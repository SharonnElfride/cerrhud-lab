import { cn } from "@/lib/utils";
import { FieldLabel } from "../field";
import { AsteriskIcon } from "lucide-react";

const CFieldLabel = ({
  required = false,
  className,
  children,
  ...props
}: React.ComponentProps<typeof FieldLabel> & {
  required?: boolean;
}) => {
  return (
    <FieldLabel
      className={cn(className, "flex items-center gap-1")}
      {...props}
    >
      {children}
      {required && (
        <AsteriskIcon size={15} color="red" />
      )}
    </FieldLabel>
  );
};

export default CFieldLabel
