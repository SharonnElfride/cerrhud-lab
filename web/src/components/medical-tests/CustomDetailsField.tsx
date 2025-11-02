import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import CFieldHint from "@/components/ui/custom/cfield-hint";
import CFieldLabel from "@/components/ui/custom/cfield-label";
import { Input } from "@/components/ui/input";
import { Plus, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

export interface CustomDetail {
  title: string;
  values: string[];
}

interface CustomDetailsFieldProps {
  label: string;
  htmlId: string;
  values: CustomDetail[];
  onChange: (vals: CustomDetail[]) => void;
  hint?: string;
  hasErrors?: boolean;
  required?: boolean;
}

const CustomDetailsField = ({
  label,
  htmlId,
  values,
  onChange,
  hint,
  hasErrors,
  required,
}: CustomDetailsFieldProps) => {
  const [details, setDetails] = useState<CustomDetail[]>(values);

  const handleAddDetail = () => {
    const updated = [...details, { title: "", values: [""] }];
    setDetails(updated);
    onChange(updated);
  };

  const handleRemoveDetail = (index: number) => {
    const updated = details.filter((_, i) => i !== index);
    setDetails(updated);
    onChange(updated);
  };

  const handleTitleChange = (index: number, title: string) => {
    const updated = [...details];
    updated[index].title = title;
    setDetails(updated);
    onChange(updated);
  };

  const handleValueChange = (
    detailIndex: number,
    valueIndex: number,
    value: string
  ) => {
    const updated = [...details];
    updated[detailIndex].values[valueIndex] = value;
    setDetails(updated);
    onChange(updated);
  };

  const handleAddValue = (detailIndex: number) => {
    const updated = [...details];
    updated[detailIndex].values.push("");
    setDetails(updated);
    onChange(updated);
  };

  const handleRemoveValue = (detailIndex: number, valueIndex: number) => {
    const updated = [...details];
    updated[detailIndex].values.splice(valueIndex, 1);
    setDetails(updated);
    onChange(updated);
  };

  return (
    <div id={htmlId} className="space-y-3">
      <CFieldLabel
        htmlFor={htmlId}
        required={required}
        aria-invalid={hasErrors}
      >
        {label}
      </CFieldLabel>

      {hint && (
        <CFieldHint>
          {hint} <br />
          Exemple : <br />
          <b>Titre :</b> Préparation avant le test <br />
          <b>Valeurs :</b> Être à jeun pendant 8h, Éviter le café
        </CFieldHint>
      )}

      <Accordion type="multiple" className="w-full">
        {details.map((detail, detailIndex) => (
          <AccordionItem key={detailIndex} value={`detail-${detailIndex}`}>
            <AccordionTrigger>
              {detail.title || `Détail ${detailIndex + 1}`}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 p-2 border-l border-accent">
                <Input
                  value={detail.title}
                  placeholder="Titre du détail (ex: Préparation avant le test)"
                  onChange={(e) =>
                    handleTitleChange(detailIndex, e.target.value)
                  }
                  aria-invalid={hasErrors}
                />

                {detail.values.map((v, valueIndex) => (
                  <div
                    key={valueIndex}
                    className="flex items-center gap-2 w-full"
                  >
                    <Input
                      value={v}
                      placeholder={`Valeur ${valueIndex + 1}`}
                      onChange={(e) =>
                        handleValueChange(
                          detailIndex,
                          valueIndex,
                          e.target.value
                        )
                      }
                      aria-invalid={hasErrors}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveValue(detailIndex, valueIndex)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}

                <div className="flex gap-2 items-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="text-xs mt-2"
                    onClick={() => handleAddValue(detailIndex)}
                  >
                    <PlusCircle size={14} className="mr-1" /> Ajouter une valeur
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="text-xs mt-2"
                    onClick={() => handleRemoveDetail(detailIndex)}
                  >
                    <Trash2 size={14} className="mr-1" /> Supprimer ce détail
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        type="button"
        variant="outline"
        className="text-xs"
        onClick={handleAddDetail}
      >
        <Plus size={14} className="mr-1" /> Ajouter un détail personnalisé
      </Button>
    </div>
  );
};

export default CustomDetailsField;
