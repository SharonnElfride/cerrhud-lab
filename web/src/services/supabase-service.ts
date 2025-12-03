import { supabase } from "@/lib/supabase/client";
import { STORAGE_BUCKET_ID } from "@/shared/constants";
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

export async function getUserLastConnectionById() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;

  return cFormatDate(data.user.last_sign_in_at ?? "");
}

export async function deleteStorageImage(
  storagePath: string,
  imageName: string
) {
  const { data: existing, error: listError } = await supabase.storage
    .from(STORAGE_BUCKET_ID)
    .list(`${storagePath}`);

  if (listError) console.error("Error listing files:", listError);

  const oldAvatar = existing?.find((f) => f.name.startsWith(imageName));
  if (oldAvatar) {
    await supabase.storage
      .from(STORAGE_BUCKET_ID)
      .remove([`${storagePath}/${oldAvatar.name}`]);
  } else {
    console.error(`There isn't any image with the name: ${imageName}`);
    return false;
  }

  return true;
}
