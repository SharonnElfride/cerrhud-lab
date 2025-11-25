import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Separator } from "../../separator";

const detailItemTitleVariants = cva("", {
  variants: {
    typo: {
      default: "text-muted-foreground",
      medium: "text-sm font-medium",
    },
    padding: {
      default: "mb-1",
      average: "mb-2",
      big: "mb-5",
    },
  },
  defaultVariants: {
    typo: "default",
    padding: "default",
  },
});

const detailItemValueVariants = cva("", {
  variants: {
    typo: {
      default: "font-medium",
      mono: "font-mono text-xs",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    typo: "default",
  },
});

function CEntityDetailItemTitle({
  typo,
  padding,
  className,
  children,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof detailItemTitleVariants>) {
  return (
    <p
      className={cn(detailItemTitleVariants({ typo, padding, className }))}
      {...props}
    >
      {children}
    </p>
  );
}

function CEntityDetailItemValue({
  typo,
  className,
  children,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof detailItemValueVariants>) {
  return (
    <p className={cn(detailItemValueVariants({ typo, className }))} {...props}>
      {children}
    </p>
  );
}

function CEntityDetailItem({
  displaySeparator = true,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  displaySeparator?: boolean;
}) {
  return (
    <>
      <div {...props}>{children}</div>
      {displaySeparator && <Separator />}
    </>
  );
}

export { CEntityDetailItem, CEntityDetailItemTitle, CEntityDetailItemValue };
