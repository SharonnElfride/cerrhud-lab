import { supabase } from "@/lib/supabase/client";
import type { TablesInsert, TablesUpdate } from "@/lib/supabase/supabase";
import {
  PROFILES_STORAGE_PATH,
  PROFILES_TABLENAME,
  STORAGE_BUCKET_ID,
} from "@/shared/constants";

export async function getProfiles() {
  let { data: profiles, error } = await supabase
    .from(PROFILES_TABLENAME)
    .select("*");

  if (error) throw error;

  return profiles;
}

export async function getProfileById(userId: string) {
  let { data: profile, error } = await supabase
    .from(PROFILES_TABLENAME)
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return profile;
}

export async function addSingleProfile(profileData: TablesInsert<"profiles">) {
  let { data: profiles, error } = await supabase
    .from(PROFILES_TABLENAME)
    // .insert([profileData])
    .insert(profileData)
    .select()
    .eq("id", profileData.id)
    .single();

  if (error) throw error;

  return profiles;
}

export async function updateSingleProfile(
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

export async function deleteProfiles(profileIds: string[]) {
  const { error } = await supabase
    .from(PROFILES_TABLENAME)
    .delete()
    .in("id", profileIds);

  if (error) throw error;

  return true;
}

export async function uploadAvatar(userId: string, file: File) {
  const baseFileName = "avatar";
  const ext = file.name.split(".").pop();
  const filePath = `${PROFILES_STORAGE_PATH}/${userId}/${baseFileName}.${ext}`;

  const { data: existing, error: listError } = await supabase.storage
    .from(STORAGE_BUCKET_ID)
    .list(`${PROFILES_STORAGE_PATH}/${userId}`);

  if (listError) console.error("Error listing files:", listError);

  const oldAvatar = existing?.find((f) => f.name.startsWith(baseFileName));
  if (oldAvatar) {
    await supabase.storage
      .from(STORAGE_BUCKET_ID)
      .remove([`${PROFILES_STORAGE_PATH}/${userId}/${oldAvatar.name}`]);
  }

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
