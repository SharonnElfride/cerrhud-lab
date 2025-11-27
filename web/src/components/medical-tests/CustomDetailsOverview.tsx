import type { CustomDetail } from "@/models/CustomDetail";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const CustomDetailsOverview = ({
  customDetails,
}: {
  customDetails: CustomDetail[];
}) => {
  return (
    <Accordion type="multiple" className="w-full border border-primary rounded-md">
      {customDetails.map((cd) => (
        <AccordionItem key={cd.title.toKeyCase()} value={cd.title.toKeyCase()} className="px-2">
          <AccordionTrigger className="text-xs">{cd.title}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1 list-disc list-inside">
              {cd.values.map((val) => (
                <li
                  key={val.toKeyCase()}
                  className="text-xs text-muted-foreground"
                >
                  {val}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CustomDetailsOverview;
