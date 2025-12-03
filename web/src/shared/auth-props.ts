import type { Tables } from "@/lib/supabase/supabase";

export interface AuthProps {
  user: Tables<"profiles"> | null;
  loading?: boolean;
}
