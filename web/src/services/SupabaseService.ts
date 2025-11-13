import { supabase } from "@/lib/supabase/client";
import { cFormatDate } from "@/utils/formatting";

export interface SupabaseAuthUser {
  email?: string;
  password?: string;
}

export async function updateSupabaseAuthUser(userData: SupabaseAuthUser) {
  const { error } = await supabase.auth.updateUser(userData);

  if (error) throw error;

  return true;
}

export async function getUserLastConnectionById(userId: string) {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;

  return cFormatDate(data.user.last_sign_in_at ?? "");
}
