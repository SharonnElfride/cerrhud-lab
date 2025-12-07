import { supabase } from "@/lib/supabase/client";
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/lib/supabase/supabase";
import { ADMINS_TABLENAME, PROFILES_STORAGE_PATH } from "@/shared/constants";
import { deleteAuthUserById } from "./supabase-auth-service";
import { deleteStorageFolder } from "./supabase-storage-service";

function fromDatabase(data: any): Tables<"profiles"> {
  if (!data) return data;

  return {
    id: data.id,
    avatar: data.avatar,
    created_at: data.created_at,
    created_by: data.created_by,
    email: data.email,
    firstname: data.firstname,
    surname: data.surname,
    hidden: data.hidden,
    permissions: data.permissions,
    profile_color: data.profile_color,
    role: data.role,
    confirmed_at: data.confirmed_at,
    email_change_pending: data.email_change_pending,
    invited_at: data.invited_at,
    updated_at: data.updated_at,
    updated_by: data.updated_by,
  };
}

export async function getAdmins() {
  let { data: admins, error } = await supabase
    .from(ADMINS_TABLENAME)
    .select("*")
    .eq("hidden", false);

  if (error) throw error;

  return admins?.map((admin) => fromDatabase(admin));
}

export async function getAdminById(adminId: string) {
  let { data: admin, error } = await supabase
    .from(ADMINS_TABLENAME)
    .select("*")
    .eq("hidden", false)
    .eq("id", adminId)
    .maybeSingle();

  if (error) throw error;

  return fromDatabase(admin);
}

export async function addAdmin(adminData: TablesInsert<"profiles">) {
  let { data: admin, error } = await supabase
    .from(ADMINS_TABLENAME)
    .insert(adminData)
    .select()
    // .eq("id", adminData.id)
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
    .eq("hidden", false)
    .in("id", adminIds);

  if (error) throw error;

  if (adminWithAvatarIds) {
    for (const admin of adminWithAvatarIds) {
      await deleteStorageFolder(PROFILES_STORAGE_PATH, admin.id);
    }
  }

  let allDeleted = true;
  for (const adminId of adminIds) {
    const del = await deleteAuthUserById(adminId);
    allDeleted = allDeleted && del;
  }

  return allDeleted;
}
