import { supabase } from "@/lib/supabase/client";
import { STORAGE_BUCKET_ID } from "@/shared/constants";

export async function deleteStorageFolder(
  storagePath: string,
  folderName: string
) {
  const { data: existing, error: listError } = await supabase.storage
    .from(STORAGE_BUCKET_ID)
    .list(`${storagePath}/${folderName}`);

  if (listError) console.error("Error listing files:", listError);

  if (existing) {
    await supabase.storage
      .from(STORAGE_BUCKET_ID)
      .remove([`${storagePath}/${folderName}`]);
  } else {
    console.error(`There isn't any folder with the name: ${folderName}`);
    return false;
  }

  return true;
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
