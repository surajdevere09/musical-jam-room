/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "./supabase";

export async function uploadAudio(file: File, userId: string) {
  const filePath = `${userId}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("audio-files")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;

  const { publicUrl } = supabase.storage
    .from("audio-files")
    .getPublicUrl(filePath).data;

  return publicUrl;
}
