export async function uploadAttachment(
  files: File[]
) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  })



  const res = await fetch(`${process.env.NEXT_PUBLIC_TASK_API_URL}/api/tasks/attachments`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Upload failed");
  }

  const data = await res.json();
  return data; // Giả sử API trả về { url: "https://..." }
}
