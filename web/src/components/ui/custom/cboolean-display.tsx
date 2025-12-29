import { CheckLineIcon } from "lucide-react";
import type { ReactNode } from "react";

function CDisplayBoolean({
  bool,
  children,
  ...props
}: {
  bool: boolean;
} & React.ComponentProps<"p">): ReactNode {
  if (bool) {
    return (
      <p {...props}>
        <CheckLineIcon color="green" size={18} />
        {children}
      </p>
    );
  }

  return <p></p>;
}

export default CDisplayBoolean;
