import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

/**
 * Upload image file to server
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<Object>} - Response data from server
 */
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile); // Add image to form data

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file upload
        },
      }
    );

    return response.data; // Return server response
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw error; // Rethrow for caller to handle
  }
};

//export default uploadImage;
export { uploadImage };