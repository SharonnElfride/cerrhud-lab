import { cn } from "@/lib/utils";

function CTitle({ className, children, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-3xl font-extrabold tracking-widest text-balance text-primary",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export default CTitle;
