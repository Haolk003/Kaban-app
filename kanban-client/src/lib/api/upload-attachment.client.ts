export async function uploadAttachment(files: File[]) {
  // Xử lý từng file riêng lẻ
  const uploadPromises = files.map(async (file) => {
    try {
      // Bước 1: Lấy signature từ server
      const signatureResponse = await fetch(
          `${process.env.NEXT_PUBLIC_TASK_API_URL}/api/tasks/signature`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              folder: "task_attachments",
              transformations: ["q_auto:best", "f_auto"],
            }),
          }
      );

      if (!signatureResponse.ok) {
        throw new Error("Failed to get upload signature");
      }

      const signatureData = await signatureResponse.json();

      // Bước 2: Tạo form data cho Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData.api_key);
      formData.append("signature", signatureData.signature);
      formData.append("timestamp", signatureData.timestamp);
      formData.append("folder", signatureData.folder);
      // formData.append("transformation", signatureData.transformation);

      // Bước 3: Upload trực tiếp lên Cloudinary
      const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/auto/upload`,
          {
            method: "POST",
            body: formData,
          }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const cloudinaryData:{original_filename:string,url:string,bytes:string,format:string,public_id:string} = await cloudinaryResponse.json();

      return {fileName:cloudinaryData.original_filename,filePath:cloudinaryData.url,fileSize:cloudinaryData.bytes,fileType:cloudinaryData.format,file_public_id:cloudinaryData.public_id}
    } catch (error) {
      console.error("Upload failed for file:", file.name, error);
      throw error;
    }
  });

  return Promise.all(uploadPromises);
}