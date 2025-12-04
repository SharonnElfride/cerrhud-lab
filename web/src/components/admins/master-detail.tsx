import type { Tables } from "@/lib/supabase/supabase";
import { ImagePlaceholder } from "@/shared/constants";
import { MedicalTestFormFieldsInfo } from "@/shared/form-fields-info";
import { BadgeInfoIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "../ui/item";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function AdminsMasterDetail(row: Tables<"profiles">) {
  const AdminAvatar = ({ fullScreen = false }: { fullScreen?: boolean }) => (
    <img
      src={row.avatar ?? ImagePlaceholder(row.first_name)}
      loading="lazy"
      alt={row.first_name}
      className={`rounded-sm ${
        fullScreen
          ? "max-w-full max-h-full object-contain"
          : "h-28 aspect-auto object-cover"
      }`}
    />
  );

  return (
    <div className="px-4 py-2 text-sm text-muted-foreground">
      <ItemGroup className="w-full flex-col md:flex-row items-stretch gap-2">
        <Item key={row.id} variant="outline" className="w-full md:w-1/3">
          <ItemHeader>
            {row.avatar ? (
              <Dialog>
                <DialogTrigger>
                  <AdminAvatar />
                </DialogTrigger>

                <DialogContent className="md:!max-w-5xl md:h-[70vh] overflow-hidden flex flex-col">
                  <DialogHeader className="shrink-0">
                    <DialogTitle>{row.first_name}</DialogTitle>
                    <DialogDescription>
                      {/* {MedicalTestFormFieldsInfo.image.shortHint} */}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex-1 overflow-auto flex justify-center items-center p-2">
                    <AdminAvatar fullScreen />
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <AdminAvatar />
            )}
          </ItemHeader>
          <ItemContent>
            <ItemTitle>
              <p className="text-black underline underline-offset-4 decoration-accent">
                {/* {row.title} */}
                row.title
              </p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <BadgeInfoIcon className="size-3.5 text-muted-foreground hover:text-black" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{MedicalTestFormFieldsInfo.image.shortHint}</p>
                </TooltipContent>
              </Tooltip>
            </ItemTitle>
            {/* <ItemDescription>Acronyme : {row.acronym ?? "--"}</ItemDescription> */}
            <ItemDescription>Acronyme : -- </ItemDescription>
          </ItemContent>
        </Item>

        {/* <div className="flex flex-col gap-2 w-full md:w-2/3 flex-1">
          <Item variant="outline" className="flex-1">
            <ItemContent>
              <ItemTitle>
                <p className="text-black underline underline-offset-4 decoration-accent">
                  {/* {MedicalTestFormFieldsInfo.mobile_id.label} /}
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <BadgeInfoIcon className="size-3.5 text-muted-foreground hover:text-black" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{MedicalTestFormFieldsInfo.mobile_id.shortHint}</p>
                  </TooltipContent>
                </Tooltip>
              </ItemTitle>
              <ItemDescription>{row.mobile_id}</ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="outline" className="flex-1">
            <ItemContent>
              <ItemTitle className="text-black underline underline-offset-4 decoration-accent">
                {MedicalTestFormFieldsInfo.description.label}
              </ItemTitle>
              <ItemDescription className="text-justify line-clamp-3 overflow-ellipsis">
                {row.description}
              </ItemDescription>
            </ItemContent>
          </Item>
        </div> */}
      </ItemGroup>
    </div>
  );
}

export default AdminsMasterDetail;
