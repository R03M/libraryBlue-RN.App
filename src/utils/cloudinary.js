import { FOLDER_NAME, ID_CLOUDINARY } from "@env";

export const uploadImage = async (uri) => {
  try {
    const data = new FormData();
    data.append("file", {
      uri: uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });
    data.append("upload_preset", FOLDER_NAME);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${ID_CLOUDINARY}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const file = await response.json();
    return file.secure_url;
  } catch (error) {
    return "";
  }
};
