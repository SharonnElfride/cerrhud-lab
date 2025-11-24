import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import CDescription from "../ui/custom/cdescription";
import CTitle from "../ui/custom/ctitle";

interface PageHeadlineProps {
  title: string;
  description?: string | null;
}

const headlineVariants = cva("space-y-2", {
  variants: {
    variant: {
      default: "p-5",
      list: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const PageHeadline = ({
  title,
  description,
  className,
  variant,
  ...props
}: PageHeadlineProps &
  React.ComponentProps<"div"> &
  VariantProps<typeof headlineVariants>) => {
  return (
    <div className={cn(headlineVariants({ variant, className }))} {...props}>
      <CTitle>{title}</CTitle>
      {description && <CDescription>{description}</CDescription>}
    </div>
  );
};

export default PageHeadline;
