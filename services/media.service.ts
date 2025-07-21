import { UPLOAD_MEDIA } from "@/constants/endpoints";
import APIService from "./api.service";

class MediaService extends APIService {
  /**
   * Uploads an image to the server.
   * @param formData - The form data containing the image file.
   * @returns A promise that resolves to the uploaded image data.
   */
  uploadFile(formData: FormData) {
    return this.upload(UPLOAD_MEDIA, formData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default MediaService;
