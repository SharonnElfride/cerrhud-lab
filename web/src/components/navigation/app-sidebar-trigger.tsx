import {
  MenuSquareIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

const AppSidebarTrigger = ({
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { toggleSidebar, state, isMobile } = useSidebar();

  return (
    <Button
      variant={isMobile ? "default" : "secondary"}
      size={"sm"}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {isMobile ? (
        <>
          <MenuSquareIcon /> Menu
        </>
      ) : (
        <>
          {state === "collapsed" ? (
            <>
              <PanelLeftOpenIcon /> Ouvrir
            </>
          ) : (
            <>
              <PanelLeftCloseIcon /> Fermer
            </>
          )}{" "}
          le menu latéral
        </>
      )}
    </Button>
  );
};

export default AppSidebarTrigger;
