import { supabase } from "@/lib/supabase/client";
import { cFormatDate } from "@/utils/formatting";

export interface SupabaseAuthUser {
  email?: string;
  password?: string;
}

export async function getUserLastConnectionById() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;

  return cFormatDate(data.user.last_sign_in_at ?? "");
}

export async function inviteAuthUserByEmail(email: string) {
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);

  if (error) throw error;

  return data.user;
}

export async function updateAuthUserById(userId: string, newEmail: string) {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    email: newEmail,
  });

  if (error) throw error;

  return data.user;
}

export async function updateCurrentAuthUser(userData: SupabaseAuthUser) {
  const { error } = await supabase.auth.updateUser(userData);

  if (error) throw error;

  return true;
}

export async function deleteAuthUserById(userId: string) {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) throw error;

  return true;
}
