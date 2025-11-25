import { BadgePlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Item, ItemActions, ItemContent, ItemTitle } from "../item";
import CFieldHint from "./cfield-hint";
import CFieldLabel from "./cfield-label";
import { Textarea } from "../textarea";

interface CStringArrayFieldProps {
  label: string;
  htmlId: string;
  values?: string[];
  onChange: (vals: Set<string>) => void;
  hint?: string;
  hasErrors?: boolean;
  displayValues?: boolean;
  hasSentences?: boolean;
  required?: boolean;
}

const CStringArrayField = ({
  label,
  htmlId,
  values = [],
  onChange,
  hint,
  hasErrors = false,
  displayValues = true,
  hasSentences = false,
  required = false,
}: CStringArrayFieldProps) => {
  const valuesSet = new Set(values);
  const [newValue, setNewValue] = useState("");
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const addKeyword = () => {
    const value = newValue.trim();
    if (!value || valuesSet.has(value)) return;
    valuesSet.add(value);
    onChange(valuesSet);
    setNewValue("");
    setHasBeenTouched(false);
  };

  const removeValue = (kw: string) => {
    if (valuesSet.has(kw) && valuesSet.delete(kw)) {
      onChange(valuesSet);
    }
  };

  return (
    <div className="space-y-2">
      <CFieldLabel
        htmlFor={htmlId}
        aria-invalid={hasErrors}
        required={required}
      >
        {label}
      </CFieldLabel>

      {hint && <CFieldHint>{hint}</CFieldHint>}

      <div className="flex gap-2">
        {hasSentences ? (
          <Textarea
            id={htmlId}
            placeholder="Ajouter..."
            className="resize-none"
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value);
              setHasBeenTouched(!e.target.value.isEmpty());
            }}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addKeyword())
            }
            aria-invalid={hasErrors}
          />
        ) : (
          <Input
            id={htmlId}
            placeholder="Ajouter..."
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value);
              setHasBeenTouched(!e.target.value.isEmpty());
            }}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addKeyword())
            }
            aria-invalid={hasErrors}
          />
        )}

        <Button
          type="button"
          size={"icon-sm"}
          onClick={addKeyword}
          disabled={!hasBeenTouched}
        >
          <BadgePlusIcon />
        </Button>
      </div>

      {displayValues && values.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5">
          {values.map((kw) => (
            <Item
              key={kw}
              variant="muted"
              size="2xs"
              className={hasSentences ? "w-full" : ""}
            >
              <ItemContent>
                <ItemTitle className="text-xs">{kw}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <XIcon
                  className="size-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeValue(kw)}
                />
              </ItemActions>
            </Item>
          ))}
        </div>
      )}
    </div>
  );
};

export default CStringArrayField;
