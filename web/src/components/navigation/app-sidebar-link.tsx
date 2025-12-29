import type { CerrhudLink } from "@/shared/cerrhud-data";
import { CopyIcon, ExternalLinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";

const AppSidebarLink = ({ linkItem }: { linkItem: CerrhudLink }) => {
  async function copyUrl() {
    toast.promise(
      async () => {
        await navigator.clipboard.writeText(linkItem.url);
        return { name: linkItem.title };
      },
      {
        loading: "Copie du lien...",
        success: (data) =>
          `Le lien de '${data.name}' a été copié dans le presse-papiers !`,
        error: "Échec de la copie.",
      }
    );
  }

  return (
    <Item variant="outline" size="xs">
      <ItemContent>
        <ItemTitle className="text-sm">{linkItem.title}</ItemTitle>
        <ItemDescription className="text-xs whitespace-pre-line line-clamp-none overflow-visible">
          {linkItem.description}
        </ItemDescription>
      </ItemContent>

      <ItemActions className="flex flex-col">
        {linkItem.canCopy && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-md hover:bg-accent/30 hover:text-black"
            onClick={copyUrl}
          >
            <CopyIcon />
          </Button>
        )}

        <a
          href={linkItem.url}
          target="_blank"
          className="hover:bg-accent/30 hover:text-black p-2 rounded-md"
        >
          <ExternalLinkIcon className="size-4" />
        </a>
      </ItemActions>
    </Item>
  );
};

export default AppSidebarLink;
