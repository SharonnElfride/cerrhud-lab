import { supabase } from "@/lib/supabase/client";
import type { TablesUpdate } from "@/lib/supabase/supabase";
import {
  PROFILES_STORAGE_PATH,
  PROFILES_TABLENAME,
  STORAGE_BUCKET_ID,
} from "@/shared/constants";
import { deleteStorageImage } from "./supabase-storage-service";

export async function updateProfileById(
  userId: string,
  profileData: TablesUpdate<"profiles">
) {
  let { data: profile, error } = await supabase
    .from(PROFILES_TABLENAME)
    .update(profileData)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return profile;
}

export async function uploadProfileAvatar(userId: string, file: File) {
  const baseFileName = "avatar";
  const ext = file.name.split(".").pop();
  const filePath = `${PROFILES_STORAGE_PATH}/${userId}/${baseFileName}.${ext}`;

  await deleteStorageImage(`${PROFILES_STORAGE_PATH}/${userId}`, baseFileName);

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET_ID)
    .upload(filePath, file, {
      cacheControl: "0",
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from(STORAGE_BUCKET_ID)
    .getPublicUrl(filePath);
  return data.publicUrl;
}
