import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type React from "react";

const PageLoader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between items-center p-10 gap-10",
        className
      )}
      {...props}
    >
      <h2 className="text-lg font-bold text-primary">Chargement...</h2>

      <DotLottieReact
        src="https://lottie.host/85868a32-4bfd-4b54-91f2-23cbaacc6227/oYRH4Hp7tb.lottie"
        loop
        autoplay
        className="size-64"
      />
    </div>
  );
};

export default PageLoader;


