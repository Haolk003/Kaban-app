import { uploadAvatar } from "@/lib/api/upload.client";

export const uploadUserAvatar = async (file: File) => {
  return await uploadAvatar(file);
};
