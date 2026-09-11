export interface CloudinaryUploadResult {
  success: boolean;
  url: string;
  secure_url: string;
  public_id?: string;
  resource_type?: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  error?: string;
}

const CLOUD_NAME = "dzqgvqzw3";
const UPLOAD_PRESET = "jcsam-gallery";

export async function uploadToCloudinary(
  file: File
): Promise<CloudinaryUploadResult> {
  if (!file) {
    throw new Error("No image file selected.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Image exceeds the 10MB limit.");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "jcsam/gallery");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    throw new Error("Cloudinary returned an invalid response.");
  }

  if (!response.ok || !data?.secure_url) {
    throw new Error(
      data?.error?.message ||
        data?.error ||
        "Cloudinary image upload failed."
    );
  }

  return {
    success: true,
    url: data.secure_url,
    secure_url: data.secure_url,
    public_id: data.public_id,
    resource_type: data.resource_type,
    format: data.format,
    bytes: data.bytes,
    width: data.width,
    height: data.height,
  };
}

export default uploadToCloudinary;
