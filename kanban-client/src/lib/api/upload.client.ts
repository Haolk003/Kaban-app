export async function uploadAvatar(
  file: File
): Promise<{ url: string; public_id: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "avatar");

  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Upload failed");
  }

  const data = await res.json();
  return { url: data.url, public_id: data.public_id }; // Giả sử API trả về { url: "https://..." }
}
