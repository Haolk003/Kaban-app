"use client";

import React, { useState } from "react";
import { uploadUserAvatar } from "@/services/upload.service";

const UploadAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    try {
      setLoading(true);
      const url = await uploadUserAvatar(file);
      setAvatarUrl(url);
      console.log("Upload hinh anh than cong", url);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return <div>UploadAvatar</div>;
};

export default UploadAvatar;
