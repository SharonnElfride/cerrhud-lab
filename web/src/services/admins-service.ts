import { supabase } from "@/lib/supabase/client";
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/lib/supabase/supabase";
import { ADMINS_TABLENAME, PROFILES_STORAGE_PATH } from "@/shared/constants";
import { deleteStorageImage } from "./supabase-service";

function fromDatabase(data: any): Tables<"profiles"> {
  return {
    id: data.id,
    avatar: data.avatar,
    created_at: data.created_at,
    created_by: data.created_by,
    email: data.email,
    first_name: data.first_name,
    surname: data.surname,
    hidden: data.hidden,
    permissions: data.permissions,
    profile_color: data.profile_color,
    role: data.role,
  };
}

export async function getAdmins() {
  let { data: admins, error } = await supabase
    .from(ADMINS_TABLENAME)
    .select("*");

  if (error) throw error;

  return admins?.map((admin) => fromDatabase(admin));
}

export async function getAdminById(adminId: string) {
  let { data: admin, error } = await supabase
    .from(ADMINS_TABLENAME)
    .select("*")
    .eq("id", adminId)
    .single();

  if (error) throw error;

  return fromDatabase(admin);
}

export async function addAdmin(adminData: TablesInsert<"profiles">) {
  let { data: admin, error } = await supabase
    .from(ADMINS_TABLENAME)
    .insert(adminData)
    .select()
    .eq("id", adminData.id)
    .maybeSingle();

  if (error) throw error;

  return fromDatabase(admin);
}

export async function updateAdminById(
  adminId: string,
  adminData: TablesUpdate<"profiles">
) {
  let { data: admin, error } = await supabase
    .from(ADMINS_TABLENAME)
    .update(adminData)
    .eq("id", adminId)
    .select()
    .maybeSingle();

  if (error) throw error;

  return fromDatabase(admin);
}

export async function deleteAdminsById(adminIds: string[]) {
  let { data: adminWithAvatarIds } = await supabase
    .from(ADMINS_TABLENAME)
    .select("id")
    .in("id", adminIds)
    .not("avatar", "is", null)
    .neq("avatar", "");

  const { error } = await supabase
    .from(ADMINS_TABLENAME)
    .delete()
    .in("id", adminIds);

  if (error) throw error;

  if (adminWithAvatarIds) {
    for (const test of adminWithAvatarIds) {
      await deleteStorageImage(PROFILES_STORAGE_PATH, test.id);
    }
  }

  return true;
}
