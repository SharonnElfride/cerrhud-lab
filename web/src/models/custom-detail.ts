import type { Json } from "@/lib/supabase/supabase";

interface CustomDetail {
  title: string;
  values: string[];
}

function fromCustomDetailObject(details: CustomDetail[]): Json {
  return details.map((d) => ({
    title: d.title,
    values: d.values,
  }));
}

function toCustomDetailObject(details: any): CustomDetail[] {
  if (!details || !Array.isArray(details)) return [];
  return details.map((detail) => ({
    title: String(detail?.title ?? ""),
    values: Array.isArray(detail?.values)
      ? detail.values.map(String)
      : [],
  }));
}

export { fromCustomDetailObject, toCustomDetailObject, type CustomDetail };
