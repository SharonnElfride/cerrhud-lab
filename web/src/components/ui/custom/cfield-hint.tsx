import { cn } from "@/lib/utils";
import { FieldDescription } from "../field";

const CFieldHint = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof FieldDescription>) => {
  return (
    <FieldDescription className={cn(className, "text-xs text-justify")} {...props}>
      {children}
    </FieldDescription>
  );
};

export default CFieldHint;
